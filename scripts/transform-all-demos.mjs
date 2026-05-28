#!/usr/bin/env node
/**
 * 全库 demo 改造：对标 apps/javascript/01-基础/变量进阶.html
 *   - 头注释补齐 面试:
 *   - demo-notes.css + section.demo-notes（展开版知识点 + 面试答法）
 *   - console 类 demo 补齐 h1 / hint / SCRIPT 标记
 *   - 迁移 Vue/React 内「面试回答」到 .demo-notes
 *
 * 运行：node scripts/transform-all-demos.mjs [--dry-run]
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDemoMetaFromContent } from './lib/parse-demo-meta.mjs';
import {
  relFromFile,
  buildDemoNotesSection,
  deriveInterviewBullets,
  injectHeaderInterview,
  extractLegacyInterviewSection,
  hasConsoleDemo,
  isFrameworkDemo,
  isVisualCssDemo,
} from './lib/demo-notes-helpers.mjs';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const DEMO_NOTES_CSS = join(ROOT, 'packages/shared/demo-notes.css');
const DEMO_LOG = join(ROOT, 'packages/shared/demo-log.js');
const SKIP_DIRS = new Set(['libs', 'lib', 'node_modules', '.git', 'scripts']);
const SKIP_REL = new Set(['apps/index.html']);
const DONE_PREFIX = 'apps/javascript/01-基础/';
const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');

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

const HINT_CONSOLE = '  <p class="hint">请打开 DevTools Console 查看输出。</p>';
const HINT_VISUAL =
  '  <p class="hint">在浏览器中打开本页，结合下方演示区观察效果；要点与面试答法见上方复习区。</p>';
const HINT_FRAMEWORK =
  '  <p class="hint">在浏览器中操作下方交互演示；复习要点与面试答法见上方区块。</p>';

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

function hasH1(content) {
  return /<h1[\s>]/i.test(content);
}

function hasVisibleOutput(content) {
  return (
    /id\s*=\s*["']demo-output["']/i.test(content) ||
    /class\s*=\s*["'][^"']*\bdemo-output\b/i.test(content)
  );
}

function hasDemoLog(content) {
  return /demo-log\.js/i.test(content);
}

function injectCssLink(content, cssHref) {
  if (/demo-notes\.css/i.test(content)) return content;
  const link = `    <link rel="stylesheet" href="${cssHref}" />`;
  if (/<\/head>/i.test(content)) {
    return content.replace(/<\/head>/i, `${link}\n  </head>`);
  }
  return content.replace(/(<body[^>]*>)/i, `$1\n  ${link}`);
}

function injectHintStyle(content) {
  if (/<style[^>]*>[\s\S]*\.hint/i.test(content)) return content;
  if (!content.includes('class="hint"')) return content;
  const style =
    '    <style>.hint { color: #666; font-size: 0.9rem; margin: 0.5rem 0 1rem; }</style>';
  if (/<\/head>/i.test(content)) {
    return content.replace(/<\/head>/i, `${style}\n  </head>`);
  }
  return content;
}

function injectShell(content, abs, theme, rel) {
  let next = content;
  const blocks = [];

  if (!hasH1(next)) {
    blocks.push(`  <h1>${theme}</h1>`);
    if (hasConsoleDemo(next) && !isFrameworkDemo(rel)) {
      blocks.push(HINT_CONSOLE);
    } else if (isVisualCssDemo(rel)) {
      blocks.push(HINT_VISUAL);
    } else if (isFrameworkDemo(rel)) {
      blocks.push(HINT_FRAMEWORK);
    } else if (hasConsoleDemo(next)) {
      blocks.push(HINT_CONSOLE);
    } else {
      blocks.push(HINT_VISUAL);
    }
  }

  if (blocks.length) {
    const mountRe = /(<body[^>]*>)\s*(<div[^>]+id\s*=\s*["'](?:app|root)["'])/i;
    if (mountRe.test(next)) {
      next = next.replace(mountRe, `$1\n${blocks.join('\n')}\n  $2`);
    } else {
      next = next.replace(/<body([^>]*)>/i, `<body$1>\n${blocks.join('\n')}`);
    }
  }

  return next;
}

function injectNotes(content, notesHtml, rel) {
  if (/<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(content)) {
    return content;
  }
  const mountMatch = content.match(/(<body[^>]*>)\s*(<div[^>]+id\s*=\s*["'](?:app|root)["'])/i);
  if (mountMatch && isFrameworkDemo(rel)) {
    return content.replace(mountMatch[0], `$1\n${notesHtml}\n  $2`);
  }
  const hintMatch = content.match(/<p class="hint"[^>]*>[\s\S]*?<\/p>/i);
  if (hintMatch) {
    return content.replace(hintMatch[0], `${hintMatch[0]}\n${notesHtml}`);
  }
  const h1Match = content.match(/<body[\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>/i);
  if (h1Match && !/{{/.test(h1Match[0])) {
    const h1Only = h1Match[0].match(/<h1[^>]*>[\s\S]*?<\/h1>/i);
    if (h1Only) {
      return content.replace(h1Only[0], `${h1Only[0]}\n${notesHtml}`);
    }
  }
  if (mountMatch) {
    return content.replace(mountMatch[0], `$1\n${notesHtml}\n  $2`);
  }
  return content.replace(/(<body[^>]*>)/i, `$1\n${notesHtml}`);
}

function transformOne(content, abs, rel) {
  if (rel.startsWith(DONE_PREFIX)) {
    return { content, changed: false, skip: '01-基础已完成' };
  }
  if (SKIP_REL.has(rel)) return { content, changed: false, skip: 'skip' };

  let next = content;
  if (force && /<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(next)) {
    next = next.replace(
      /<section[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b[\s\S]*?<\/section>/i,
      '',
    );
    if (!force) {
      /* stripped for rebuild */
    }
  } else if (/class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(content)) {
    return { content, changed: false, skip: '已有 demo-notes' };
  }
  const meta = parseDemoMetaFromContent(next);
  const theme = meta.theme || 'Demo';

  const legacy = extractLegacyInterviewSection(next);
  next = legacy.html;

  const interviewHeader = deriveInterviewBullets(meta.points, theme, meta.interviewPoints);
  next = injectHeaderInterview(next, interviewHeader);

  const cssHref = relFromFile(dirname(abs), DEMO_NOTES_CSS);
  next = injectCssLink(next, cssHref);
  next = injectShell(next, abs, theme, rel);
  next = injectHintStyle(next);

  const notesHtml = buildDemoNotesSection(
    { ...meta, interviewPoints: interviewHeader },
    legacy.bullets,
  );
  next = injectNotes(next, notesHtml, rel);

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

  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join('/');
    const before = await readFile(abs, 'utf8');
    const { content, changed, skip } = transformOne(before, abs, rel);
    if (skip === '01-基础已完成' || skip === 'skip' || skip === '已有 demo-notes') {
      skipped++;
      continue;
    }
    if (changed) {
      if (!dryRun) await writeFile(abs, content, 'utf8');
      updated++;
      console.log(`[transform-all-demos] ${dryRun ? '[dry] ' : ''}${rel}`);
    }
  }

  console.log(
    `[transform-all-demos] 完成：更新 ${updated}，跳过 ${skipped}，共扫描 ${files.length}`,
  );
}

main().catch((err) => {
  console.error('[transform-all-demos] 失败：', err);
  process.exitCode = 1;
});
