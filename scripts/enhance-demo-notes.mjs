#!/usr/bin/env node
/**
 * 为 apps/javascript/01-基础 demo 补齐复习区块骨架：
 *   - demo-notes.css 引用
 *   - section.demo-notes（知识点要点 + 面试考点）
 *
 * 从头注释 要点/面试 生成 ul 占位；不覆盖已有 .demo-notes。
 *
 * 运行：node scripts/enhance-demo-notes.mjs
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDemoMetaFromContent } from './lib/parse-demo-meta.mjs';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const TARGET_DIRS = [
  join('apps', 'javascript'),
  join('apps', 'css'),
  join('apps', 'vue2'),
  join('apps', 'vue3'),
  join('apps', 'react18'),
  join('apps', 'react19'),
  join('apps', 'demos'),
  join('apps', 'typescript'),
];
const SKIP_DIRS = new Set(['libs', 'lib', 'node_modules']);
const DEMO_NOTES_CSS = join(ROOT, 'packages/shared/demo-notes.css');

function toPosix(p) {
  return p.split(sep).join('/');
}

function relDemoNotesCss(fromAbs) {
  let rel = relative(dirname(fromAbs), DEMO_NOTES_CSS);
  rel = toPosix(rel);
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel.split('/').map(encodeURIComponent).join('/');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildNotesSection(points, interviewPoints) {
  const kp = points.length
    ? points.map((p) => `    <li>${escapeHtml(p)}</li>`).join('\n')
    : '    <li><!-- 待补充 --></li>';
  const iv = interviewPoints.length
    ? interviewPoints
        .map((p) => {
          const q = p.endsWith('？') || p.endsWith('?') ? p : `${p}？`;
          return `    <li><strong>${escapeHtml(q)}</strong> <!-- 待补充答法 --></li>`;
        })
        .join('\n')
    : '    <li><!-- 待补充 --></li>';
  return `<section class="demo-notes" aria-label="复习与面试要点">
  <h2>知识点要点</h2>
  <ul>
${kp}
  </ul>
  <h2>面试考点</h2>
  <ul>
${iv}
  </ul>
</section>`;
}

function injectNotes(content, cssHref, notesHtml) {
  let next = content;
  if (!/demo-notes\.css/i.test(next)) {
    const link = `<link rel="stylesheet" href="${cssHref}" />`;
    if (/<\/head>/i.test(next)) {
      next = next.replace(/<\/head>/i, `  ${link}\n</head>`);
    } else if (/<body[^>]*>/i.test(next)) {
      next = next.replace(/(<body[^>]*>)/i, `$1\n  ${link}`);
    }
  }
  if (/<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(next)) {
    return next;
  }
  const hintMatch = next.match(/<p class="hint"[^>]*>[\s\S]*?<\/p>/i);
  if (hintMatch) {
    return next.replace(hintMatch[0], `${hintMatch[0]}\n  ${notesHtml}`);
  }
  const h1Match = next.match(/<h1[^>]*>[\s\S]*?<\/h1>/i);
  if (h1Match) {
    return next.replace(h1Match[0], `${h1Match[0]}\n  ${notesHtml}`);
  }
  return next.replace(/(<body[^>]*>)/i, `$1\n  ${notesHtml}`);
}

async function collectHtml(dirAbs, list) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      await collectHtml(abs, list);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) {
      list.push(abs);
    }
  }
}

async function walk(dirAbs, files) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const ent of entries) {
    const abs = join(dirAbs, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      await walk(abs, files);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) {
      files.push(abs);
    }
  }
}

async function main() {
  const files = [];
  for (const rel of TARGET_DIRS) {
    const dirAbs = join(ROOT, rel);
    try {
      await stat(dirAbs);
      await walk(dirAbs, files);
    } catch {
      /* skip */
    }
  }
  let updated = 0;

  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join('/');
    const content = await readFile(abs, 'utf8');
    if (/class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(content)) continue;

    const meta = parseDemoMetaFromContent(content);
    const cssHref = relDemoNotesCss(abs);
    const notesHtml = buildNotesSection(meta.points, meta.interviewPoints);
    const next = injectNotes(content, cssHref, notesHtml);
    if (next !== content) {
      await writeFile(abs, next, 'utf8');
      updated++;
      console.log('[enhance-demo-notes] 已补齐:', rel);
    }
  }

  console.log(`[enhance-demo-notes] 完成，更新 ${updated} 个文件`);
}

main().catch((err) => {
  console.error('[enhance-demo-notes] 失败：', err);
  process.exitCode = 1;
});
