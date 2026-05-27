#!/usr/bin/env node
/**
 * 静态浏览器冒烟检查：
 *   - manifest 中的每个 demo href 都能解析到真实 HTML 文件
 *   - HTML 直接引用的本地 script/link/img/iframe/embed/source 资源存在
 *   - CSS 中的本地 url(...) 资源存在
 *
 * 运行：node scripts/validate-browser-smoke.mjs
 */

import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const errors = [];
const checkedHtml = new Set();
const checkedAssets = new Set();

function toPosix(relPath) {
  return relPath.split(sep).join("/");
}

function isExternalRef(value) {
  return /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(value)
    || /^(?:data|blob|mailto|tel|javascript):/i.test(value)
    || value.startsWith("#")
    || value.startsWith("{{");
}

function stripHashAndQuery(value) {
  return value.split("#")[0].split("?")[0];
}

function decodePath(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveLocalRef(fromFile, rawValue) {
  const cleaned = stripHashAndQuery(rawValue.trim());
  if (!cleaned || isExternalRef(cleaned)) return null;

  const decoded = decodePath(cleaned);
  const abs = decoded.startsWith("/")
    ? join(ROOT, decoded)
    : resolve(dirname(fromFile), decoded);

  const normalized = normalize(abs);
  if (!normalized.startsWith(ROOT)) {
    return { error: `资源越过仓库根目录: ${rawValue}` };
  }
  return { abs: normalized };
}

async function exists(abs) {
  try {
    const st = await stat(abs);
    return st.isFile();
  } catch {
    return false;
  }
}

function extractHtmlResourceRefs(html) {
  const refs = [];
  const tagRe = /<\s*(script|link|img|iframe|embed|source|video|audio)\b([^>]*)>/gi;
  let tagMatch;

  while ((tagMatch = tagRe.exec(html)) !== null) {
    const tag = tagMatch[1].toLowerCase();
    const attrs = tagMatch[2];
    const attrRe = /\b(src|href|poster)\s*=\s*(["'])(.*?)\2/gi;
    let attrMatch;

    while ((attrMatch = attrRe.exec(attrs)) !== null) {
      const attr = attrMatch[1].toLowerCase();
      const value = attrMatch[3];
      if (tag === "link" && attr === "href" && !/\brel\s*=\s*(["'])(?:stylesheet|preload|icon|shortcut icon)\1/i.test(attrs)) {
        continue;
      }
      refs.push({ tag, attr, value });
    }
  }

  return refs;
}

function extractCssUrlRefs(css) {
  const refs = [];
  const re = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
  let match;
  while ((match = re.exec(css)) !== null) {
    refs.push(match[2]);
  }
  return refs;
}

function extractInlineCss(html) {
  const chunks = [];
  const styleBlockRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let blockMatch;
  while ((blockMatch = styleBlockRe.exec(html)) !== null) {
    chunks.push(blockMatch[1]);
  }

  const styleAttrRe = /\bstyle\s*=\s*(["'])(.*?)\1/gi;
  let attrMatch;
  while ((attrMatch = styleAttrRe.exec(html)) !== null) {
    chunks.push(attrMatch[2]);
  }

  return chunks;
}

async function checkAsset(fromFile, rawValue, label) {
  const resolved = resolveLocalRef(fromFile, rawValue);
  if (!resolved) return;
  if (resolved.error) {
    errors.push(`${toPosix(relative(ROOT, fromFile))}: ${resolved.error}`);
    return;
  }

  const key = `${fromFile}::${resolved.abs}`;
  if (checkedAssets.has(key)) return;
  checkedAssets.add(key);

  if (!(await exists(resolved.abs))) {
    errors.push(
      `${toPosix(relative(ROOT, fromFile))}: ${label} 引用不存在: ${rawValue}`
    );
  }
}

async function checkCssFile(cssFile) {
  const css = await readFile(cssFile, "utf8");
  for (const ref of extractCssUrlRefs(css)) {
    await checkAsset(cssFile, ref, "CSS url()");
  }
}

async function checkHtmlFile(htmlFile) {
  if (checkedHtml.has(htmlFile)) return;
  checkedHtml.add(htmlFile);

  const html = await readFile(htmlFile, "utf8");
  for (const css of extractInlineCss(html)) {
    for (const ref of extractCssUrlRefs(css)) {
      await checkAsset(htmlFile, ref, "inline CSS url()");
    }
  }

  for (const ref of extractHtmlResourceRefs(html)) {
    await checkAsset(htmlFile, ref.value, `<${ref.tag}> ${ref.attr}`);

    const resolved = resolveLocalRef(htmlFile, ref.value);
    if (resolved?.abs && extname(resolved.abs).toLowerCase() === ".css" && await exists(resolved.abs)) {
      await checkCssFile(resolved.abs);
    }
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));

  for (const section of manifest.sections) {
    for (const group of section.groups) {
      for (const item of group.items) {
        const decodedHref = decodePath(stripHashAndQuery(item.href));
        const htmlFile = join(ROOT, decodedHref);
        if (!(await exists(htmlFile))) {
          errors.push(`manifest: demo 文件不存在: ${item.href}`);
          continue;
        }
        await checkHtmlFile(htmlFile);
      }
    }
  }

  if (errors.length) {
    console.error(`[validate-browser-smoke] 失败，共 ${errors.length} 项：\n`);
    errors.forEach((err) => console.error("  -", err));
    process.exitCode = 1;
    return;
  }

  console.log(
    `[validate-browser-smoke] 通过：${checkedHtml.size} 个 HTML，${checkedAssets.size} 个本地资源引用`
  );
}

main().catch((err) => {
  console.error("[validate-browser-smoke] 异常：", err);
  process.exitCode = 1;
});
