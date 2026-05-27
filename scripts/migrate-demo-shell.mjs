#!/usr/bin/env node
/**
 * 全库 demo 迁移：对标 apps/javascript/01-基础/字符串方法.html
 *   - demo-shell.css + body.demo-page
 *   - section.demo-block--notes（h1 + hint + div.demo-notes）
 *   - SCRIPT 区块标记（无 RUN / demo-log）
 *   - footer.demo-block--nav（无内联样式）
 *
 * 运行：node scripts/migrate-demo-shell.mjs [--dry-run]
 */

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDemoMetaFromContent } from "./lib/parse-demo-meta.mjs";
import {
  relFromFile,
  hasConsoleDemo,
  isFrameworkDemo,
  isVisualCssDemo,
} from "./lib/demo-notes-helpers.mjs";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const DEMO_NOTES_CSS = join(ROOT, "packages/shared/demo-notes.css");
const DEMO_SHELL_CSS = join(ROOT, "packages/shared/demo-shell.css");
const DEMO_LOG = join(ROOT, "packages/shared/demo-log.js");
const SKIP_DIRS = new Set(["libs", "lib", "node_modules", ".git", "scripts"]);
const SKIP_REL = new Set(["apps/index.html"]);
const dryRun = process.argv.includes("--dry-run");

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

const NAV_RE =
  /<!--\s*(?:DEMO_)?NAV_START\s*-->[\s\S]*?<!--\s*(?:DEMO_)?NAV_END\s*-->/i;

const HINT_CONSOLE = "请打开 DevTools Console 查看输出。";
const HINT_VISUAL =
  "在浏览器中打开本页，结合下方演示区观察效果；要点与面试答法见上方复习区。";
const HINT_FRAMEWORK =
  "在浏览器中操作下方交互演示；复习要点与面试答法见上方区块。";

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

function isMigrated(content) {
  return (
    /class\s*=\s*["'][^"']*\bdemo-page\b/.test(content) &&
    /<!--\s*NOTES_START\s*-->/.test(content) &&
    /demo-block--notes/.test(content) &&
    /<!--\s*NAV_START\s*-->/.test(content) &&
    !/<footer class="demo-nav"/.test(content)
  );
}

function normalizeDoctype(content) {
  return content.replace(/<!DOCTYPE html>/i, "<!doctype html>");
}

function injectCssLinks(content, abs) {
  let next = content;
  const notesHref = relFromFile(dirname(abs), DEMO_NOTES_CSS);
  const shellHref = relFromFile(dirname(abs), DEMO_SHELL_CSS);

  if (!/demo-notes\.css/i.test(next)) {
    const link = `    <link rel="stylesheet" href="${notesHref}" />`;
    if (/<\/head>/i.test(next)) {
      next = next.replace(/<\/head>/i, `${link}\n  </head>`);
    }
  }

  if (!/demo-shell\.css/i.test(next)) {
    const link = `    <link rel="stylesheet" href="${shellHref}" />`;
    if (/demo-notes\.css/i.test(next)) {
      next = next.replace(
        /(<link[^>]*demo-notes\.css[^>]*\/?>)/i,
        `$1\n${link}`
      );
    } else if (/<\/head>/i.test(next)) {
      next = next.replace(/<\/head>/i, `${link}\n  </head>`);
    }
  }

  return next;
}

function addDemoPageClass(content) {
  if (/class\s*=\s*["'][^"']*\bdemo-page\b/.test(content)) return content;
  return content.replace(/<body(\s[^>]*)?>/i, (full, attrs = "") => {
    if (/class\s*=/.test(attrs)) {
      return full.replace(
        /class\s*=\s*["']([^"']*)["']/i,
        'class="$1 demo-page"'
      );
    }
    return `<body class="demo-page"${attrs}>`;
  });
}

function removeInlineHintStyle(content) {
  return content.replace(/\s*<style>\.hint\s*\{[^}]*\}<\/style>\s*/gi, "\n");
}

function extractNavBlock(content) {
  const m = content.match(NAV_RE);
  if (!m) return { content, nav: null };
  return {
    content: content.replace(NAV_RE, "<!--__NAV_PLACEHOLDER__-->"),
    nav: m[0],
  };
}

function migrateNavBlock(navRaw) {
  let inner = navRaw
    .replace(/<!--\s*(?:DEMO_)?NAV_START\s*-->/i, "")
    .replace(/<!--\s*(?:DEMO_)?NAV_END\s*-->/i, "")
    .trim();

  inner = inner.replace(/<style>[\s\S]*?<\/style>\s*/i, "");

  const links = [...inner.matchAll(/<a\s[\s\S]*?<\/a>/gi)].map((m) =>
    m[0].trim()
  );
  const scriptMatch = inner.match(/<script>[\s\S]*?<\/script>/i);
  const script = scriptMatch ? scriptMatch[0] : "";

  return `    <!-- NAV_START -->
    <footer class="demo-block demo-block--nav" aria-label="Demo 导航">
      <h2 class="demo-block__label">页面导航</h2>
      <nav class="demo-nav" aria-label="相关链接">
        ${links.join("\n        ")}
      </nav>
      ${script}
    </footer>
    <!-- NAV_END -->`;
}

function defaultHint(rel, content) {
  if (isFrameworkDemo(rel)) return HINT_FRAMEWORK;
  if (isVisualCssDemo(rel)) return HINT_VISUAL;
  if (hasConsoleDemo(content)) return HINT_CONSOLE;
  return HINT_VISUAL;
}

function buildNotesBlock(h1, hint, notesInner, theme, rel, content) {
  const h1Html = h1 || `<h1>${theme}</h1>`;
  const hintText =
    hint?.replace(/<\/?p[^>]*>/gi, "").trim() ||
    defaultHint(rel, content);
  const hintHtml =
    hint && hint.startsWith("<p")
      ? hint
      : `<p class="hint">${hintText}</p>`;

  return `    <!-- NOTES_START -->
    <section class="demo-block demo-block--notes" aria-label="复习与面试要点">
      ${h1Html}
      ${hintHtml}
      <div class="demo-notes">
${notesInner}
      </div>
    </section>
    <!-- NOTES_END -->`;
}

function extractNotesParts(content) {
  const blockRe =
    /<section[^>]*class\s*=\s*["'][^"']*\bdemo-block--notes\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i;
  const blockMatch = content.match(blockRe);
  if (blockMatch) {
    const inner = blockMatch[1];
    const h1 = inner.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0]?.trim() || null;
    const hint = inner.match(/<p class="hint"[^>]*>[\s\S]*?<\/p>/i)?.[0]?.trim() || null;
    const notesInner =
      inner.match(/<div[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]?.trim() ||
      inner.match(/<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i)?.[1]?.trim() ||
      null;
    if (notesInner) {
      return {
        content: content.replace(blockRe, "<!--__NOTES_PLACEHOLDER__-->"),
        h1,
        hint,
        notesInner,
      };
    }
  }

  const sectionRe =
    /<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i;
  const sectionMatch = content.match(sectionRe);
  if (sectionMatch) {
    const notesInner = sectionMatch[1].trim();
    const before = content.slice(0, sectionMatch.index);
    const h1 = before.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0]?.trim() || null;
    const hint = before.match(/<p class="hint"[^>]*>[\s\S]*?<\/p>/i)?.[0]?.trim() || null;
    let cleaned = content.replace(sectionRe, "<!--__NOTES_PLACEHOLDER__-->");
    if (h1) cleaned = cleaned.replace(h1, "");
    if (hint) cleaned = cleaned.replace(hint, "");
    return { content: cleaned, h1, hint, notesInner };
  }

  return { content, h1: null, hint: null, notesInner: null };
}

function stripStructuralBlocks(content) {
  return content
    .replace(/<!--\s*(?:NOTES|SCRIPT|RUN|DEMO)_(?:START|END)\s*-->/gi, "")
    .replace(
      /<section[^>]*class\s*=\s*["'][^"']*\bdemo-block--run\b[^"']*["'][^>]*>[\s\S]*?<\/section>/gi,
      ""
    )
    .replace(/<script[^>]*demo-log\.js[^>]*><\/script>\s*/gi, "");
}

function extractMiddleContent(content) {
  const bodyMatch = content.match(
    /<body[^>]*>([\s\S]*?)<!--__NAV_PLACEHOLDER__-->/i
  );
  if (!bodyMatch) return "";
  let middle = bodyMatch[1];
  middle = middle.replace(/<!--__NOTES_PLACEHOLDER__-->/g, "");
  middle = stripStructuralBlocks(middle);
  middle = middle.replace(/<pre[^>]*id\s*=\s*["']demo-output["'][^>]*>[\s\S]*?<\/pre>/gi, "");
  return middle.trim();
}

function buildRunBlock(hasOutput) {
  if (!hasOutput) return "";
  return `    <!-- RUN_START -->
    <section class="demo-block demo-block--run" aria-label="运行输出">
      <h2 class="demo-block__label">运行输出</h2>
      <pre id="demo-output" class="demo-output" aria-live="polite"></pre>
      <p class="demo-run-empty">（暂无同步输出，请打开 DevTools Console。）</p>
    </section>
    <!-- RUN_END -->`;
}

function wrapInlineScripts(middle) {
  if (!middle) return "";
  if (/<!--\s*SCRIPT_START\s*-->/.test(middle)) return middle;

  const commentMask = middle.replace(/<!--[\s\S]*?-->/g, (m) =>
    " ".repeat(m.length)
  );

  const scriptRe =
    /(<script(?![^>]*\bsrc\s*=)(?![^>]*\btype\s*=\s*["']text\/babel["'])[^>]*>[\s\S]*?<\/script>)/gi;
  let result = middle;
  let offset = 0;
  let match;

  while ((match = scriptRe.exec(commentMask)) !== null) {
    if (/demo-log\.js/i.test(match[0])) continue;
    const start = match.index + offset;
    const end = start + match[0].length;
    const original = result.slice(start, end);
    const wrapped = `    <!-- SCRIPT_START -->
    ${original.trim()}
    <!-- SCRIPT_END -->`;
    result = result.slice(0, start) + wrapped + result.slice(end);
    offset += wrapped.length - match[0].length;
    commentMask.replace(match[0], " ".repeat(wrapped.length));
    scriptRe.lastIndex = end + offset;
  }

  return result;
}

function rebuildBody(content, parts) {
  const { notesBlock, runBlock, demoLogTag, middle, navBlock } = parts;
  const bodyOpenMatch = content.match(/<body[^>]*>/i);
  const bodyOpen = bodyOpenMatch ? bodyOpenMatch[0] : '<body class="demo-page">';

  const blocks = [notesBlock];
  if (runBlock) blocks.push(runBlock);
  if (demoLogTag) blocks.push(demoLogTag);
  if (middle) blocks.push(wrapInlineScripts(middle));
  blocks.push(navBlock);

  return content.replace(
    /<body[^>]*>[\s\S]*?<!--__NAV_PLACEHOLDER__-->/i,
    `${bodyOpen}\n${blocks.join("\n\n")}\n  `
  );
}

function migrateOne(content, abs, rel) {
  if (SKIP_REL.has(rel)) return { content, changed: false, skip: "skip" };
  if (isMigrated(content)) return { content, changed: false, skip: "done" };

  const meta = parseDemoMetaFromContent(content);
  const theme = meta.theme || "Demo";

  let next = normalizeDoctype(content);
  next = injectCssLinks(next, abs);
  next = addDemoPageClass(next);
  next = removeInlineHintStyle(next);

  const hadDemoOutput = /id\s*=\s*["']demo-output["']/i.test(next);
  const { content: withoutNav, nav } = extractNavBlock(next);
  next = withoutNav;
  if (!nav) {
    return { content, changed: false, skip: "no-nav" };
  }

  const { content: afterNotes, h1, hint, notesInner } = extractNotesParts(next);
  next = afterNotes;
  if (!notesInner) {
    return { content, changed: false, skip: "no-notes" };
  }

  const notesBlock = buildNotesBlock(h1, hint, notesInner, theme, rel, content);
  const middle = extractMiddleContent(next);
  const runBlock = "";
  const demoLogTag = "";
  const navBlock = migrateNavBlock(nav);

  next = rebuildBody(next, {
    notesBlock,
    runBlock,
    demoLogTag,
    middle,
    navBlock,
  });

  return { content: next, changed: next !== content, skip: null };
}

async function main() {
  const files = [];
  for (const sec of SECTIONS) {
    const abs = join(ROOT, sec);
    try {
      await stat(abs);
      await collectHtml(abs, files);
    } catch {
      /* optional */
    }
  }

  let updated = 0;
  let skipped = 0;
  const issues = [];

  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join("/");
    const before = await readFile(abs, "utf8");
    const { content, changed, skip } = migrateOne(before, abs, rel);

    if (skip === "skip" || skip === "done") {
      skipped++;
      continue;
    }
    if (skip === "no-nav" || skip === "no-notes") {
      issues.push(`${rel}: ${skip}`);
      skipped++;
      continue;
    }

    if (changed) {
      if (!dryRun) await writeFile(abs, content, "utf8");
      updated++;
      console.log(`[migrate-demo-shell] ${dryRun ? "[dry] " : ""}${rel}`);
    }
  }

  console.log(
    `[migrate-demo-shell] 完成：更新 ${updated}，跳过 ${skipped}，共 ${files.length}`
  );
  if (issues.length) {
    console.warn(
      "[migrate-demo-shell] 未迁移：\n" + issues.map((i) => `  • ${i}`).join("\n")
    );
  }
}

main().catch((err) => {
  console.error("[migrate-demo-shell] 失败：", err);
  process.exitCode = 1;
});
