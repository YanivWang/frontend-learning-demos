#!/usr/bin/env node
/**
 * 全库 demo 结构迁移（非 Prettier 格式化）：对标 apps/javascript/01-基础/字符串方法.html
 *   - 移除 demo-log.js 与 RUN 输出区
 *   - 头注释与 <!doctype html> 之间空一行
 *   - 统一 hint（console demo 引导 DevTools）与页脚导航骨架
 *
 * 日常代码风格请用：npm run format（Prettier）
 * 运行：node scripts/format-all-demos.mjs [--dry-run]
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDemoMetaFromContent } from './lib/parse-demo-meta.mjs';
import { hasConsoleDemo, isFrameworkDemo, isVisualCssDemo } from './lib/demo-notes-helpers.mjs';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const SKIP_DIRS = new Set(['libs', 'lib', 'node_modules', '.git', 'scripts']);
const SKIP_REL = new Set(['apps/index.html']);
const dryRun = process.argv.includes('--dry-run');

const SECTIONS = [
  join('apps', 'javascript'),
  join('apps', 'css'),
  join('apps', 'vue2'),
  join('apps', 'vue3'),
  join('apps', 'react18'),
  join('apps', 'react19'),
  join('apps', 'demos'),
  join('apps', 'typescript'),
];

const NAV_RE = /<!--\s*(?:DEMO_)?NAV_START\s*-->[\s\S]*?<!--\s*(?:DEMO_)?NAV_END\s*-->/i;

const HINT_CONSOLE = '请打开 DevTools Console 查看输出。';
const HINT_VISUAL = '在浏览器中打开本页，结合下方演示区观察效果；要点与面试答法见上方复习区。';
const HINT_FRAMEWORK = '在浏览器中操作下方交互演示；复习要点与面试答法见上方区块。';

const SYNC_HINT_RE =
  /下方为\s*<code>console\.log<\/code>\s*同步输出[^<]*(?:DevTools Console[^<]*)?/i;

async function collectHtml(dirAbs, list) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      await collectHtml(abs, list);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) {
      list.push(abs);
    }
  }
}

function stripDemoLogAndRun(content) {
  return content
    .replace(/<!--\s*RUN_START\s*-->[\s\S]*?<!--\s*RUN_END\s*-->\s*/gi, '')
    .replace(
      /<section[^>]*class\s*=\s*["'][^"']*\bdemo-block--run\b[^"']*["'][^>]*>[\s\S]*?<\/section>\s*/gi,
      '',
    )
    .replace(/<script[^>]*demo-log\.js[^>]*>\s*<\/script>\s*/gi, '')
    .replace(/<pre[^>]*id\s*=\s*["']demo-output["'][^>]*>[\s\S]*?<\/pre>\s*/gi, '')
    .replace(
      /<p[^>]*class\s*=\s*["'][^"']*\bdemo-run-empty\b[^"']*["'][^>]*>[\s\S]*?<\/p>\s*/gi,
      '',
    );
}

function ensureHeaderBlankLine(content) {
  return content.replace(/(-->\s*)\n(\s*<!doctype html>)/i, '-->\n\n$2');
}

function trimHeaderClosingBlankLine(content) {
  return content.replace(
    /(<!--[\s\S]*?)(\n[ \t]*\n)([ \t]*-->)(\s*\n\s*<!doctype html>)/i,
    '$1\n$3$4',
  );
}

function normalizeDoctype(content) {
  return content.replace(/<!DOCTYPE html>/i, '<!doctype html>');
}

function fixImportMapsMetadata(content, rel) {
  if (!rel.endsWith('ImportMaps.html')) return content;

  let next = content.replace(
    /<!--\s*([\s\S]*?)\s*-->/,
    `<!--
  分类: javascript / 06-浏览器API
  主题: Import Maps 浏览器原生模块映射
  难度: 进阶
  要点:
    - <script type="importmap"> 将 bare specifier 映射到 URL
    - 配合 <script type="module"> 在零构建环境使用 npm 风格 import
    - 生产环境仍推荐 bundler；Import Maps 适合 demo / 渐进迁移
  面试:
    - Import Maps 是什么？解决什么问题？
    - importmap 与 type="module" 如何配合？
    - 生产环境为什么仍推荐 bundler？
  相关: HTTP缓存, IntersectionObserver
-->`,
  );

  next = next.replace(
    /<div class="demo-notes">[\s\S]*?<\/div>/i,
    `<div class="demo-notes">
        <h2>知识点要点</h2>
        <ul>
          <li><code>&lt;script type="importmap"&gt;</code> 将 bare specifier 映射到 URL。</li>
          <li>配合 <code>&lt;script type="module"&gt;</code> 在零构建环境使用 npm 风格 <code>import</code>。</li>
          <li>生产环境仍推荐 bundler；Import Maps 适合 demo / 渐进迁移。</li>
        </ul>
        <h2>面试考点</h2>
        <ul>
          <li><strong>Import Maps 是什么？</strong> 浏览器原生模块映射，把 <code>import "pkg"</code> 解析到具体 URL，无需打包即可在 demo 中试用 npm 风格路径。</li>
          <li><strong>与 type="module" 如何配合？</strong> 先声明 importmap，再加载 module 脚本；映射须在模块执行前解析完成。</li>
          <li><strong>生产为何仍用 bundler？</strong> 兼容性、Tree-shaking、版本锁定与 CDN 策略；Import Maps 更适合渐进迁移或教学 demo。</li>
        </ul>
      </div>`,
  );

  return next;
}

function cleanDemoLogPollution(text) {
  return text
    .replace(/<script[^>]*demo-log\.js[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/&lt;script src=&quot;[^&]*demo-log\.js[^&]*&quot;&gt;&lt;\/script&gt;[。.]?\s*/gi, '')
    .replace(/\s*demo-log\.js\s*/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function defaultHint(rel, content) {
  if (isFrameworkDemo(rel)) return HINT_FRAMEWORK;
  if (isVisualCssDemo(rel)) return HINT_VISUAL;
  if (hasConsoleDemo(content)) return HINT_CONSOLE;
  return HINT_VISUAL;
}

function normalizeHint(hintRaw, rel, content) {
  const fallback = defaultHint(rel, content);
  if (!hintRaw) {
    return `      <p class="hint">${fallback}</p>`;
  }

  let text = hintRaw
    .replace(/<\/?p[^>]*>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (hasConsoleDemo(content) && !isFrameworkDemo(rel) && !isVisualCssDemo(rel)) {
    if (SYNC_HINT_RE.test(text) || !/DevTools Console/.test(text)) {
      text = HINT_CONSOLE;
    }
  }

  return `      <p class="hint">${text}</p>`;
}

function formatDemoNotesInner(inner) {
  const cleaned = cleanDemoLogPollution(inner);
  const blocks = [];
  const re = /(<h2[^>]*>[\s\S]*?<\/h2>)\s*(<ul[^>]*>[\s\S]*?<\/ul>)/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const h2 = m[1].replace(/\s+/g, ' ').trim();
    const lis = [...m[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((x) => {
      const li = x[1].trim().replace(/\s+/g, ' ');
      return `          <li>${li}</li>`;
    });
    if (lis.length) {
      blocks.push(`        ${h2}\n        <ul>\n${lis.join('\n')}\n        </ul>`);
    }
  }
  if (blocks.length) return blocks.join('\n');
  return cleaned
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `        ${line}`)
    .join('\n');
}

function extractNavBlock(content) {
  const m = content.match(NAV_RE);
  if (!m) return { content, nav: null };
  return {
    content: content.replace(NAV_RE, '<!--__NAV_PLACEHOLDER__-->'),
    nav: m[0],
  };
}

function formatNavBlock(navRaw) {
  let inner = navRaw
    .replace(/<!--\s*(?:DEMO_)?NAV_START\s*-->/i, '')
    .replace(/<!--\s*(?:DEMO_)?NAV_END\s*-->/i, '')
    .trim();
  inner = inner.replace(/<style>[\s\S]*?<\/style>\s*/i, '');

  const links = [...inner.matchAll(/<a\s[\s\S]*?<\/a>/gi)].map((x) =>
    x[0].trim().replace(/\s+/g, ' ').replace(/>\s+</g, '><'),
  );
  const scriptMatch = inner.match(/<script>[\s\S]*?<\/script>/i);
  let script = '';
  if (scriptMatch) {
    const body = scriptMatch[0]
      .replace(/^<script>\s*/i, '')
      .replace(/\s*<\/script>$/i, '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .join('\n          ');
    script = `      <script>\n        (function () {\n          ${body.replace(/^\(function \(\) \{\s*/i, '').replace(/\s*\}\)\(\);\s*$/i, '')}\n        })();\n      </script>`;
    // Normalize catalog script to fixed shape
    script = `      <script>
        (function () {
          var a = document.querySelector("[data-demo-catalog]");
          if (a && location.protocol === "file:" && a.dataset.fileCatalog) {
            a.setAttribute("href", a.dataset.fileCatalog);
          }
        })();
      </script>`;
  }

  return `    <!-- NAV_START -->
    <footer class="demo-block demo-block--nav" aria-label="Demo 导航">
      <h2 class="demo-block__label">页面导航</h2>
      <nav class="demo-nav" aria-label="相关链接">
        ${links.join('\n        ')}
      </nav>
${script}
    </footer>
    <!-- NAV_END -->`;
}

function extractNotesParts(content) {
  const blockRe =
    /<section[^>]*class\s*=\s*["'][^"']*\bdemo-block--notes\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/i;
  const blockMatch = content.match(blockRe);
  if (!blockMatch) return { content, h1: null, hint: null, notesInner: null };

  const inner = blockMatch[1];
  const h1 =
    inner
      .match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0]
      ?.trim()
      .replace(/\s+/g, ' ') || null;
  const hint = inner.match(/<p class="hint"[^>]*>[\s\S]*?<\/p>/i)?.[0]?.trim() || null;
  const notesInner =
    inner
      .match(/<div[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]
      ?.trim() || null;

  if (!notesInner) return { content, h1: null, hint: null, notesInner: null };

  return {
    content: content.replace(blockRe, '<!--__NOTES_PLACEHOLDER__-->'),
    h1: h1 ? h1.replace(/^<h1/, '      <h1') : null,
    hint,
    notesInner,
  };
}

function buildNotesBlock(h1, hint, notesInner, theme, rel, content) {
  const h1Html = h1 || `      <h1>${theme}</h1>`;
  const hintHtml = normalizeHint(hint, rel, content);
  const notesFormatted = formatDemoNotesInner(notesInner);

  return `    <!-- NOTES_START -->
    <section class="demo-block demo-block--notes" aria-label="复习与面试要点">
${h1Html}
${hintHtml}
      <div class="demo-notes">
${notesFormatted}
      </div>
    </section>
    <!-- NOTES_END -->`;
}

function stripStructuralMarkers(content) {
  return content.replace(/<!--\s*(?:NOTES|SCRIPT|RUN|DEMO|PAGE_DOM)_(?:START|END)\s*-->/gi, '');
}

function extractMiddleContent(content) {
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<!--__NAV_PLACEHOLDER__-->/i);
  if (!bodyMatch) return '';
  let middle = bodyMatch[1];
  middle = middle.replace(/<!--__NOTES_PLACEHOLDER__-->/g, '');
  middle = stripStructuralMarkers(middle);
  middle = stripDemoLogAndRun(middle);
  return middle.trim();
}

function indentMiddleBlock(block) {
  if (!block.trim()) return '';
  return formatMixedMiddle(block);
}

function isHtmlOpenTag(line) {
  if (!/^<[A-Za-z][\w:-]*(\s|>|$)/.test(line)) return false;
  if (/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i.test(line)) {
    return false;
  }
  if (/\/>\s*$/.test(line)) return false;
  const tag = line.match(/^<([A-Za-z][\w:-]*)\b/)?.[1];
  if (!tag) return false;
  return !new RegExp(`</${tag}>\\s*$`, 'i').test(line);
}

function formatHtmlChunk(chunk) {
  const lines = chunk
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  let depth = 0;
  const out = [];

  for (const line of lines) {
    if (/^<\/[A-Za-z]/.test(line) || /^<!--\s*DEMO_END\s*-->$/i.test(line)) {
      depth = Math.max(0, depth - 1);
    }

    out.push(`${' '.repeat(4 + depth * 2)}${line}`);

    if (isHtmlOpenTag(line) || /^<!--\s*DEMO_START\s*-->$/i.test(line)) {
      depth++;
    }
  }

  return out.join('\n');
}

function countStructuralChars(line, open, close) {
  let count = 0;
  let quote = null;
  let escaped = false;
  for (const ch of line) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === open) count++;
    if (ch === close) count--;
  }
  return count;
}

function formatScriptInner(inner) {
  const rawLines = inner.replace(/^\n+|\n+$/g, '').split('\n');
  const out = [];
  let depth = 0;
  /** 多行函数调用的未闭合 `(` 层数（不影响 block 深度） */
  let callDepth = 0;
  const BASE = 6;

  for (const raw of rawLines) {
    const line = raw.trim();
    if (!line) {
      if (out.at(-1) !== '') out.push('');
      continue;
    }

    if (/^\)/.test(line)) callDepth = Math.max(0, callDepth - 1);
    if (/^(}|\]|\)|<\/)/.test(line)) depth = Math.max(0, depth - 1);

    out.push(`${' '.repeat(BASE + (depth + callDepth) * 2)}${line}`);

    const net = countStructuralChars(line, '{', '}') + countStructuralChars(line, '[', ']');
    if (net > 0) depth += net;
    if (net <= 0 && /\{\s*$/.test(line)) depth++;

    if (/\(\s*$/.test(line) && !/\{\s*$/.test(line)) callDepth++;

    if (isHtmlOpenTag(line)) depth++;
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

function formatScriptBlock(script) {
  const m = script.match(/^(<script\b[^>]*>)([\s\S]*?)(<\/script>)$/i);
  if (!m) {
    return script
      .split('\n')
      .map((line) => `    ${line.trimStart()}`)
      .join('\n');
  }
  const [, open, inner, close] = m;
  const formattedInner = formatScriptInner(inner);
  if (!formattedInner) return `    ${open.trim()}${close}`;
  return `    ${open.trim()}\n${formattedInner}\n    ${close}`;
}

function wrapPageDomBlock(block) {
  if (!block.trim()) return '';
  return `    <!-- PAGE_DOM_START -->\n${block}\n    <!-- PAGE_DOM_END -->`;
}

function formatMixedMiddle(block) {
  const scriptRegionRe =
    /^[ \t]*<!--\s*SCRIPT_START\s*-->\s*(<script[\s\S]*?<\/script>)\s*^[ \t]*<!--\s*SCRIPT_END\s*-->/gim;
  const chunks = [];
  let last = 0;
  let match;

  while ((match = scriptRegionRe.exec(block)) !== null) {
    const html = block.slice(last, match.index);
    const htmlFormatted = formatHtmlChunk(html);
    if (htmlFormatted) chunks.push(wrapPageDomBlock(htmlFormatted));

    chunks.push(
      `    <!-- SCRIPT_START -->\n${formatScriptBlock(match[1])}\n    <!-- SCRIPT_END -->`,
    );
    last = match.index + match[0].length;
  }

  const tail = formatHtmlChunk(block.slice(last));
  if (tail) chunks.push(wrapPageDomBlock(tail));
  return chunks.join('\n\n').trimEnd();
}

function wrapInlineScripts(middle) {
  if (!middle) return '';
  if (/<!--\s*SCRIPT_START\s*-->/.test(middle)) return indentMiddleBlock(middle);

  const commentMask = middle.replace(/<!--[\s\S]*?-->/g, (m) => ' '.repeat(m.length));
  const scriptRe = /(<script(?![^>]*\bsrc\s*=)[^>]*>[\s\S]*?<\/script>)/gi;
  let result = middle;
  let offset = 0;
  let match;

  while ((match = scriptRe.exec(commentMask)) !== null) {
    if (/demo-log\.js/i.test(match[0])) continue;
    const start = match.index + offset;
    const end = start + match[0].length;
    const original = result.slice(start, end);
    const lines = original.split('\n');
    const formatted = [
      '    <!-- SCRIPT_START -->',
      ...lines.map((line, i) =>
        i === 0 ? `    ${line.trimStart()}` : `      ${line.trimStart()}`,
      ),
      '    <!-- SCRIPT_END -->',
    ].join('\n');
    result = result.slice(0, start) + formatted + result.slice(end);
    offset += formatted.length - match[0].length;
    scriptRe.lastIndex = end + offset;
  }

  return indentMiddleBlock(result);
}

function formatHead(content) {
  const htmlMatch = content.match(/(<!doctype html>\s*<html[^>]*>)([\s\S]*?)(<body[^>]*>)/i);
  if (!htmlMatch) return content;

  const [, htmlOpen, headBody, bodyOpen] = htmlMatch;
  const headMatch = headBody.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return content;

  const headLines = formatHeadInner(headMatch[1]);

  const formattedHead = `  <head>\n${headLines.join('\n')}\n  </head>`;
  const bodyTag = bodyOpen.includes('demo-page')
    ? bodyOpen.trim().replace(/\s+/g, ' ').replace(/<body/i, '  <body')
    : bodyOpen.trim().replace(/<body/i, '  <body class="demo-page"');

  return content.replace(htmlMatch[0], `${htmlOpen}\n${formattedHead}\n${bodyTag}`);
}

function formatCssInner(inner) {
  const lines = inner
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  let depth = 0;
  let continuation = false;

  return lines
    .map((line) => {
      if (/^}/.test(line)) {
        depth = Math.max(0, depth - 1);
        continuation = false;
      }

      const formatted = `${' '.repeat(6 + (depth + (continuation ? 1 : 0)) * 2)}${line}`;

      if (/\{\s*$/.test(line)) depth++;
      if (/:\s*$/.test(line)) continuation = true;
      if (/;\s*$/.test(line)) continuation = false;

      return formatted;
    })
    .join('\n');
}

function formatStyleTag(raw) {
  const m = raw.match(/^<style\b([^>]*)>([\s\S]*?)<\/style>$/i);
  if (!m) return `    ${raw.trim()}`;
  const attrs = m[1] || '';
  return `    <style${attrs}>\n${formatCssInner(m[2])}\n    </style>`;
}

function formatHeadLine(line) {
  let next = line.trim();
  if (next.startsWith('<meta') && !next.endsWith('/>')) {
    next = next.replace(/\s*>$/, ' />');
  }
  if (next.startsWith('<link') && !next.endsWith('/>')) {
    next = next.replace(/\s*\/?>$/, ' />');
  }
  return `    ${next}`;
}

function formatHeadInner(headInner) {
  const lines = headInner.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (/^<style\b/i.test(line)) {
      const styleLines = [line];
      while (!/<\/style>/i.test(styleLines.at(-1) || '') && i < lines.length - 1) {
        i++;
        styleLines.push(lines[i]);
      }
      out.push(formatStyleTag(styleLines.join('\n')));
      continue;
    }

    out.push(formatHeadLine(line));
  }
  return out;
}

function rebuildBody(content, parts) {
  const { notesBlock, middle, navBlock } = parts;
  const bodyOpenMatch = content.match(/<body[^>]*>/i);
  const bodyOpen = bodyOpenMatch
    ? bodyOpenMatch[0].trim().replace(/<body/i, '  <body')
    : '  <body class="demo-page">';

  const blocks = [notesBlock];
  const middleFormatted = wrapInlineScripts(middle);
  if (middleFormatted) blocks.push(middleFormatted);
  blocks.push(navBlock);

  return content.replace(
    /[ \t]*<body[^>]*>[\s\S]*?<!--__NAV_PLACEHOLDER__-->/i,
    `${bodyOpen}\n${blocks.join('\n\n')}\n`,
  );
}

function formatShellPage(content, abs, rel) {
  const meta = parseDemoMetaFromContent(content);
  const theme = meta.theme || 'Demo';

  const { content: withoutNav, nav } = extractNavBlock(content);
  if (!nav) return null;

  let next = withoutNav;
  const { content: afterNotes, h1, hint, notesInner } = extractNotesParts(next);
  if (!notesInner) return null;

  next = afterNotes;
  const notesBlock = buildNotesBlock(h1, hint, notesInner, theme, rel, content);
  const middle = extractMiddleContent(next);
  const navBlock = formatNavBlock(nav);

  next = rebuildBody(next, { notesBlock, middle, navBlock });
  return next;
}

function removeInlineHintStyle(content) {
  return content.replace(/\s*<style>\.hint\s*\{[^}]*\}<\/style>\s*/gi, '\n');
}

function formatScriptRegions(content) {
  return content.replace(
    /^[ \t]*<!--\s*SCRIPT_START\s*-->\s*(<script[\s\S]*?<\/script>)\s*^[ \t]*<!--\s*SCRIPT_END\s*-->/gim,
    (_, script) => {
      return `    <!-- SCRIPT_START -->\n${formatScriptBlock(script)}\n    <!-- SCRIPT_END -->`;
    },
  );
}

function trimBodyEnd(content) {
  return content
    .replace(/(\n[ \t]*)+\n(\s*<\/body>)/g, '\n$2')
    .replace(/\n{2,}(\s*<\/html>)/g, '\n$1');
}

function finalizeFormatting(content) {
  let next = content;
  next = formatScriptRegions(next);
  next = trimBodyEnd(next);
  return next;
}

function formatOne(content, abs, rel) {
  if (SKIP_REL.has(rel)) return { content, changed: false };

  let next = content;
  next = normalizeDoctype(next);
  next = stripDemoLogAndRun(next);
  next = fixImportMapsMetadata(next, rel);
  next = removeInlineHintStyle(next);
  next = trimHeaderClosingBlankLine(next);
  next = ensureHeaderBlankLine(next);

  const shellFormatted = formatShellPage(next, abs, rel);
  if (shellFormatted) {
    next = shellFormatted;
  }

  next = formatHead(next);
  next = trimHeaderClosingBlankLine(next);
  next = ensureHeaderBlankLine(next);
  next = finalizeFormatting(next);

  if (!next.endsWith('\n')) next += '\n';

  return { content: next, changed: next !== content };
}

async function main() {
  const files = [];
  for (const sec of SECTIONS) {
    const abs = join(ROOT, sec);
    try {
      await stat(abs);
      await collectHtml(abs, files);
    } catch {
      /* optional section */
    }
  }

  let updated = 0;
  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join('/');
    const before = await readFile(abs, 'utf8');
    const { content, changed } = formatOne(before, abs, rel);
    if (changed) {
      if (!dryRun) await writeFile(abs, content, 'utf8');
      updated++;
      console.log(`[format-all-demos] ${dryRun ? '[dry] ' : ''}${rel}`);
    }
  }

  console.log(
    `[format-all-demos] 完成：${dryRun ? '将更新' : '已更新'} ${updated} / ${files.length}`,
  );
}

main().catch((err) => {
  console.error('[format-all-demos] 失败：', err);
  process.exitCode = 1;
});
