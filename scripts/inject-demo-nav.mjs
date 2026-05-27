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
const NAV_START = "<!-- NAV_START -->";
const NAV_END = "<!-- NAV_END -->";

const SECTIONS = [
  join("apps", "javascript"),
  join("apps", "css"),
  join("apps", "vue2"),
  join("apps", "vue3"),
  join("apps", "react18"),
  join("apps", "react19"),
  join("apps", "demos"),
  join("apps", "typescript"),
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

function appsIndexRel(fromAbs) {
  let rel = relative(dirname(fromAbs), join(ROOT, "apps/index.html"));
  rel = toPosix(rel);
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel.split("/").map(encodeURIComponent).join("/");
}

function resolveRelatedHref(fromAbs, relatedTitle, flat) {
  const hit = flat.find(
    (it) =>
      it.title === relatedTitle ||
      it.href.endsWith(`/${encodeURIComponent(relatedTitle)}.html`) ||
      decodeHref(it.href).endsWith(`/${relatedTitle}.html`)
  );
  if (!hit) return null;
  return relHref(fromAbs, join(ROOT, decodeHref(hit.href)));
}

function buildNavHtml(fromAbs, prev, nextItem, current, flat) {
  const catalogServer = docsHomeHref();
  const catalogFile = appsIndexRel(fromAbs);
  const parts = [
    `<a href="${catalogServer}" data-demo-catalog data-file-catalog="${catalogFile}">目录</a>`,
  ];

  if (current?.related?.length) {
    for (const relTitle of current.related) {
      const href = resolveRelatedHref(fromAbs, relTitle, flat);
      if (href) {
        parts.push(`<a href="${href}">相关 · ${escapeHtml(relTitle)}</a>`);
      }
    }
  }

  if (prev) {
    parts.push(`<a href="${relHref(fromAbs, join(ROOT, decodeHref(prev.href)))}">← ${escapeHtml(prev.title)}</a>`);
  }
  if (nextItem) {
    parts.push(`<a href="${relHref(fromAbs, join(ROOT, decodeHref(nextItem.href)))}">${escapeHtml(nextItem.title)} →</a>`);
  }
  return `${NAV_START}
    <footer class="demo-block demo-block--nav" aria-label="Demo 导航">
      <h2 class="demo-block__label">页面导航</h2>
      <nav class="demo-nav" aria-label="相关链接">
  ${parts.join("\n        ")}
      </nav>
  <script>
    (function () {
      var a = document.querySelector("[data-demo-catalog]");
      if (a && location.protocol === "file:" && a.dataset.fileCatalog) {
        a.setAttribute("href", a.dataset.fileCatalog);
      }
    })();
  </script>
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
  const re = new RegExp(
    `(?:<!--\\s*(?:DEMO_)?NAV_START\\s*-->[\\s\\S]*?<!--\\s*(?:DEMO_)?NAV_END\\s*-->)`,
    "m"
  );
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
    const navBlock = buildNavHtml(abs, prev, nextItem, flat[idx], flat);

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
