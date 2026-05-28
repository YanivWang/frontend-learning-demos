#!/usr/bin/env node
/**
 * 根据各 demo HTML 头注释同步模块 README 中的「完整 demo 清单」表格。
 * 运行：node scripts/sync-readmes.mjs
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const args = new Set(process.argv.slice(2));
const isCheckMode = args.has('--check');

for (const arg of args) {
  if (arg !== '--check') {
    console.error('用法: node scripts/sync-readmes.mjs [--check]');
    process.exit(1);
  }
}

const SKIP = new Set(['libs', 'lib', 'node_modules', '.git']);

const MARKER_START = '<!-- DEMO_TABLE_START -->';
const MARKER_END = '<!-- DEMO_TABLE_END -->';

async function collect(scanRoot) {
  const rows = [];
  async function walk(dirAbs) {
    const entries = await readdir(dirAbs, { withFileTypes: true });
    for (const ent of entries) {
      const abs = join(dirAbs, ent.name);
      if (ent.isDirectory()) {
        if (SKIP.has(ent.name)) continue;
        await walk(abs);
      } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.html')) {
        const content = await readFile(abs, 'utf8');
        const m = content.match(/<!--\s*([\s\S]*?)\s*-->/);
        const theme = (m?.[1].match(/主题:\s*(.+)/) || [])[1]?.trim().replace(/\|/g, '\\|') || '—';
        const rel = relative(join(ROOT, scanRoot), abs).split('\\').join('/');
        rows.push({ rel, theme });
      }
    }
  }
  await walk(join(ROOT, scanRoot));
  rows.sort((a, b) => a.rel.localeCompare(b.rel, 'zh-Hans-CN'));
  return rows;
}

function buildTable(rows) {
  const lines = [
    MARKER_START,
    '',
    `共 **${rows.length}** 个 demo（由 \`node scripts/sync-readmes.mjs\` 根据头注释自动生成，请勿手改表格正文）。`,
    '',
    '| 文件 | 主题 |',
    '|---|---|',
    ...rows.map((r) => `| \`${r.rel}\` | ${r.theme} |`),
    '',
    MARKER_END,
  ];
  return lines.join('\n');
}

function patchIntroCount(content, count) {
  return content.replace(
    /共 \*\*\d+\*\* 个(?:(?: ?`\.html` 文件)+| demo)/u,
    `共 **${count}** 个 \`.html\` 文件`,
  );
}

async function patchReadme(readmePath, scanRoot) {
  const rows = await collect(scanRoot);
  const table = buildTable(rows);
  let content = await readFile(join(ROOT, readmePath), 'utf8');
  content = patchIntroCount(content, rows.length);
  const re = new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`, 'm');
  if (!re.test(content)) {
    throw new Error(`${readmePath} 缺少 ${MARKER_START} / ${MARKER_END} 标记`);
  }
  const nextContent = content.replace(re, table);
  if (isCheckMode) {
    if (nextContent !== content) {
      throw new Error(`${readmePath} 与 demo 头注释不同步，请运行 node scripts/sync-readmes.mjs`);
    }
    console.log(`[sync-readmes] ${readmePath} 已同步（${rows.length} demos）`);
    return;
  }

  await writeFile(join(ROOT, readmePath), nextContent, 'utf8');
  console.log(`[sync-readmes] ${readmePath} ← ${rows.length} demos`);
}

const tasks = [
  ['apps/javascript/README.md', join('apps', 'javascript')],
  ['apps/css/README.md', join('apps', 'css')],
  ['apps/vue2/README.md', join('apps', 'vue2', 'src')],
  ['apps/vue3/README.md', join('apps', 'vue3', 'src')],
  ['apps/react18/README.md', join('apps', 'react18', 'src')],
  ['apps/react19/README.md', join('apps', 'react19', 'src')],
  ['apps/typescript/README.md', join('apps', 'typescript')],
  ['apps/demos/README.md', join('apps', 'demos')],
];

for (const [readme, scan] of tasks) {
  await patchReadme(readme, scan);
}

console.log(isCheckMode ? '[sync-readmes] 通过：README demo 清单均已同步' : '[sync-readmes] 完成');
