#!/usr/bin/env node
/**
 * 为所有 demo HTML 注入/更新：
 *   - 缺失的 viewport / lang="zh-CN"
 *   - 统一页脚导航（目录 / 上一篇 / 下一篇），基于 manifest.json 顺序
 *
 * 运行：node scripts/inject-demo-nav.mjs
 * 由 npm run build:index 链式调用。
 */

import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { docsHomeHref } from "./docs-home.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const NAV_START = "<!-- DEMO_NAV_START -->";
const NAV_END = "<!-- DEMO_NAV_END -->";

const SECTIONS = [
  join("learn", "javascript"),
  join("learn", "css"),
  join("learn", "vue2"),
  join("learn", "vue3"),
  join("learn", "react"),
  join("learn", "demos"),
  join("learn", "typescript"),
];
const SKIP_DIRS = new Set(["libs", "lib", "node_modules", ".git", "scripts"]);

function toPosix(p) {
  return p.split(sep).join("/");
}

function relHref(fromAbs, toAbs) {
  let rel = relative(dirname(fromAbs), toAbs);
  rel = toPosix(rel);
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel.split("/").map(encodeURIComponent).join("/");
}

function decodeHref(href) {
  return decodeURIComponent(href);
}

function ensureHeadMeta(content) {
  let next = content;
  if (!/<html[^>]*\blang\s*=/i.test(next)) {
    next = next.replace(/<html(\s[^>]*)?>/i, '<html lang="zh-CN"$1>');
  } else if (!/<html[^>]*\blang\s*=\s*["']zh-CN["']/i.test(next)) {
    next = next.replace(/(<html[^>]*\blang\s*=\s*["'])[^"']*(["'])/i, '$1zh-CN$2');
  }
  if (!/<meta[^>]*name\s*=\s*["']viewport["']/i.test(next)) {
    if (/<meta\s+charset/i.test(next)) {
      next = next.replace(
        /(<meta\s+charset[^>]*\/?>)/i,
        '$1\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />'
      );
    } else if (/<head[^>]*>/i.test(next)) {
      next = next.replace(
        /(<head[^>]*>)/i,
        '$1\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />'
      );
    }
  }
  return next;
}

function buildNavHtml(fromAbs, prev, nextItem) {
  const parts = [`<a href="${docsHomeHref()}">目录</a>`];
  if (prev) {
    parts.push(`<a href="${relHref(fromAbs, join(ROOT, decodeHref(prev.href)))}">← ${escapeHtml(prev.title)}</a>`);
  }
  if (nextItem) {
    parts.push(`<a href="${relHref(fromAbs, join(ROOT, decodeHref(nextItem.href)))}">${escapeHtml(nextItem.title)} →</a>`);
  }
  return `${NAV_START}
<footer class="demo-nav" aria-label="Demo 导航">
  <style>
    .demo-nav { margin: 2.5rem 0 1rem; padding-top: 1rem; border-top: 1px solid #e3e3e3; font-size: 0.875rem; display: flex; flex-wrap: wrap; gap: 0.75rem 1.25rem; }
    .demo-nav a { color: #0969da; text-decoration: none; }
    .demo-nav a:hover { text-decoration: underline; }
    .demo-output { margin-top: 1rem; padding: 0.75rem 1rem; background: #f6f8fa; border-radius: 8px; font-family: ui-monospace, monospace; font-size: 0.8125rem; white-space: pre-wrap; max-height: 240px; overflow: auto; }
    .demo-output:empty { display: none; }
  </style>
  ${parts.join("\n  ")}
</footer>
${NAV_END}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectNav(content, navBlock) {
  const re = new RegExp(`${NAV_START}[\\s\\S]*?${NAV_END}`, "m");
  if (re.test(content)) return content.replace(re, navBlock);
  if (/<\/body>/i.test(content)) {
    return content.replace(/<\/body>/i, `${navBlock}\n</body>`);
  }
  return content.trimEnd() + `\n${navBlock}\n</body>\n</html>\n`;
}

async function collectHtml(dirAbs, list) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      await collectHtml(abs, list);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".html")) {
      list.push(abs);
    }
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));
  const flat = [];
  for (const sec of manifest.sections) {
    for (const gr of sec.groups) {
      for (const it of gr.items) {
        flat.push({ ...it, section: sec.title, group: gr.path });
      }
    }
  }

  const hrefToIndex = new Map(flat.map((it, i) => [decodeHref(it.href), i]));
  let updated = 0;

  const files = [];
  for (const sec of SECTIONS) {
    try {
      await stat(join(ROOT, sec));
      await collectHtml(join(ROOT, sec), files);
    } catch {
      /* optional */
    }
  }

  for (const abs of files) {
    const rel = toPosix(relative(ROOT, abs));
    const idx = hrefToIndex.get(rel);
    if (idx === undefined) continue;

    const prev = idx > 0 ? flat[idx - 1] : null;
    const nextItem = idx < flat.length - 1 ? flat[idx + 1] : null;
    const navBlock = buildNavHtml(abs, prev, nextItem);

    let content = await readFile(abs, "utf8");
    const before = content;
    content = ensureHeadMeta(content);
    content = injectNav(content, navBlock);
    if (content !== before) {
      await writeFile(abs, content, "utf8");
      updated++;
    }
  }

  console.log(`[inject-demo-nav] 已处理 ${files.length} 个 HTML，更新 ${updated} 个（viewport / lang / 页脚导航）`);
}

main().catch((err) => {
  console.error("[inject-demo-nav] 失败：", err);
  process.exitCode = 1;
});
