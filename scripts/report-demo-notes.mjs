#!/usr/bin/env node
/**
 * 报告全库 demo 复习区块覆盖率。
 *
 * 运行：node scripts/report-demo-notes.mjs [--strict]
 * --strict: 缺项时 exit 1（供 validate 集成）
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDemoMetaFromContent } from './lib/parse-demo-meta.mjs';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
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
const SKIP_DIRS = new Set(['libs', 'lib', 'node_modules']);
const isStrict = process.argv.includes('--strict');
const TEMPLATE_INTERVIEW_RE =
  /核心概念是什么|在实际项目里怎么用|相近 API 如何区分选型|面试中如何简洁讲清/;

const issues = [];

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

function countSectionBullets(html, heading) {
  const re = new RegExp(`<h2[^>]*>\\s*${heading}\\s*<\\/h2>\\s*<ul>([\\s\\S]*?)<\\/ul>`, 'i');
  const m = html.match(re);
  if (!m) return 0;
  return (m[1].match(/<li[\s>]/gi) || []).length;
}

function hasNotesShell(html) {
  return /demo-block--notes/.test(html);
}

function hasDemoNotes(html) {
  return /<div[^>]*class\s*=\s*["'][^"']*\bdemo-notes\b/i.test(html);
}

function requiresInterview(rel) {
  return /^apps\/(javascript|css|vue2|vue3|react18|react19|demos|typescript)\//.test(rel);
}

async function main() {
  const files = [];
  for (const sec of SECTIONS) {
    const dirAbs = join(ROOT, sec);
    try {
      await stat(dirAbs);
      await collectHtml(dirAbs, files);
    } catch {
      /* skip */
    }
  }

  for (const abs of files) {
    const rel = relative(ROOT, abs).split(sep).join('/');
    if (rel === 'apps/index.html') continue;
    const content = await readFile(abs, 'utf8');
    const meta = parseDemoMetaFromContent(content);
    const fileIssues = [];

    if (requiresInterview(rel)) {
      if (!content.includes('面试:')) {
        fileIssues.push('缺少头注释「面试:」');
      } else if (meta.interviewPoints.length < 3) {
        fileIssues.push(`头注释「面试:」仅 ${meta.interviewPoints.length} 条（建议 ≥3）`);
      } else if (TEMPLATE_INTERVIEW_RE.test(meta.interviewPoints.join('\n'))) {
        fileIssues.push('头注释「面试:」疑似仍是模板化问句');
      }
    }

    if (!hasNotesShell(content)) {
      fileIssues.push('缺少 demo-block--notes 复习区');
    } else if (!hasDemoNotes(content)) {
      fileIssues.push('缺少 div.demo-notes');
    } else {
      if (!/知识点要点/.test(content)) fileIssues.push('demo-notes 缺少「知识点要点」');
      if (!/面试考点/.test(content)) fileIssues.push('demo-notes 缺少「面试考点」');
      if (!/参考资料/.test(content)) fileIssues.push('demo-notes 缺少「参考资料」');
      const kp = countSectionBullets(content, '知识点要点');
      const iv = countSectionBullets(content, '面试考点');
      const refs = countSectionBullets(content, '参考资料');
      if (kp < 3) fileIssues.push(`正文「知识点要点」仅 ${kp} 条（建议 ≥3）`);
      if (iv < 3) fileIssues.push(`正文「面试考点」仅 ${iv} 条（建议 ≥3）`);
      if (refs < 1)
        fileIssues.push(`正文「参考资料」仅 ${refs} 条（至少 1 条权威来源；综合主题建议 2～5 条）`);
      if (TEMPLATE_INTERVIEW_RE.test(content)) {
        fileIssues.push('demo-notes 疑似仍含模板化面试问句');
      }
      if (/待补充答法|<!-- 待补充 -->/.test(content)) {
        fileIssues.push('demo-notes 仍含占位待补充');
      }
    }

    if (fileIssues.length) {
      issues.push({ rel, fileIssues });
    }
  }

  const total = files.filter((f) => relative(ROOT, f) !== 'apps/index.html').length;
  const ok = total - issues.length;

  console.log(`[report-demo-notes] 全库: ${ok}/${total} 达标`);
  if (issues.length) {
    for (const { rel, fileIssues } of issues) {
      console.log(`  • ${rel}`);
      fileIssues.forEach((i) => console.log(`      - ${i}`));
    }
  }

  if (isStrict && issues.length) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('[report-demo-notes] 失败：', err);
  process.exitCode = 1;
});
