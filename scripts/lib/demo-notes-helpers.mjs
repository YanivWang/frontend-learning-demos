#!/usr/bin/env node
/**
 * 全库 demo-notes 注入与内容展开 — 供 transform-all-demos / enhance 脚本共用
 */

import { relative, sep } from "node:path";

const CODE_TERMS = [
  "var",
  "let",
  "const",
  "Promise",
  "async",
  "await",
  "generator",
  "Proxy",
  "Reflect",
  "Symbol",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "Object",
  "Array",
  "Function",
  "createApp",
  "mount",
  "ref",
  "reactive",
  "computed",
  "watch",
  "useState",
  "useEffect",
  "createRoot",
  "createElement",
  "JSX",
  "this",
  "call",
  "apply",
  "bind",
  "arguments",
  "console.log",
  "typeof",
  "instanceof",
  "null",
  "undefined",
  "box-sizing",
  "content-box",
  "border-box",
  "flex",
  "grid",
  "BFC",
  "fetch",
  "localStorage",
  "sessionStorage",
  "IntersectionObserver",
  "MutationObserver",
  "requestAnimationFrame",
  "WebSocket",
  "ServiceWorker",
  "import",
  "export",
  "module",
  "then",
  "catch",
  "finally",
  "queueMicrotask",
  "setTimeout",
  "setInterval",
  "addEventListener",
  "preventDefault",
  "stopPropagation",
  "v-model",
  "v-if",
  "v-for",
  "v-html",
  "provide",
  "inject",
  "defineProps",
  "defineEmits",
  "defineModel",
  "script setup",
  "setup()",
  "createApp",
  "render",
  "diff",
  "key",
  "Fiber",
  "Suspense",
  "Transition",
  "interface",
  "type",
  "generic",
  "infer",
  "extends",
  "implements",
  "enum",
  "union",
  "intersection",
];

export function toPosix(p) {
  return p.split(sep).join("/");
}

export function relFromFile(fromDir, targetAbs) {
  let rel = relative(fromDir, targetAbs);
  rel = toPosix(rel);
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel.split("/").map(encodeURIComponent).join("/");
}

export function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function wrapCodeTerms(text) {
  let out = escapeHtml(text);
  const sorted = [...CODE_TERMS].sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    const re = new RegExp(`(?<![\\w./])(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![\\w])`, "g");
    out = out.replace(re, (m) => {
      if (out.includes(`<code>${m}</code>`)) return m;
      return `<code>${m}</code>`;
    });
  }
  return out;
}

export function ensureQuestion(text) {
  const t = text.trim();
  if (t.endsWith("？") || t.endsWith("?")) return t;
  if (/^(什么是|如何|怎么|为什么|区别|差异|原理|手写|实现)/.test(t)) return `${t}？`;
  return `${t}？`;
}

/** 从要点生成 3～5 条面试问句（头注释用） */
export function deriveInterviewBullets(points, theme, existing = []) {
  if (existing.length >= 3) return existing.slice(0, 5);
  const derived = [];
  const pool = [
    `${theme}的核心概念是什么？`,
    `${theme}在实际项目里怎么用？`,
    `${theme}有哪些常见坑或易错点？`,
    `${theme}和相近 API 如何区分选型？`,
    `面试中如何简洁讲清 ${theme}？`,
  ];
  for (const q of pool) {
    if (derived.length >= 5) break;
    derived.push(q);
  }
  return [...existing, ...derived].slice(0, 5);
}

/** 展开单条要点为正文知识点（4～6 条之一） */
export function expandKnowledgeLi(point) {
  const body = wrapCodeTerms(point.endsWith("。") ? point : `${point}。`);
  return `      <li>${body}</li>`;
}

/** 为面试问句生成 2～4 句答法 */
export function expandInterviewLi(question, points, theme, extraBullets = []) {
  const q = ensureQuestion(question);
  const parts = [];
  if (extraBullets.length) {
    parts.push(wrapCodeTerms(extraBullets.join(" ")));
  } else if (points.length) {
    const related = points
      .filter((p) => {
        const kw = q.replace(/[？?]/g, "").slice(0, 6);
        return p.includes(kw.slice(0, 3)) || kw.length < 4;
      })
      .slice(0, 2);
    const use = related.length ? related : points.slice(0, 2);
    parts.push(wrapCodeTerms(use.join("；")));
  } else {
    parts.push(
      wrapCodeTerms(
        `${theme}需先说定义与使用场景，再补充边界条件与项目中的取舍，必要时画流程或对比表。`
      )
    );
  }
  return `      <li><strong>${escapeHtml(q)}</strong> ${parts.join(" ")}</li>`;
}

export function extractLegacyInterviewSection(html) {
  const re =
    /<h2[^>]*>\s*面试回答\s*<\/h2>\s*<ul>([\s\S]*?)<\/ul>/i;
  const m = html.match(re);
  if (!m) return { html, bullets: [] };
  const bullets = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((x) =>
    x[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
  const cleaned = html.replace(re, "");
  return { html: cleaned, bullets };
}

export function hasConsoleDemo(html) {
  return /console\.(log|info|warn|error|dir)\s*\(/i.test(html);
}

export function isFrameworkDemo(rel) {
  return /^apps\/(vue2|vue3|react18|react19)\//.test(rel);
}

export function isVisualCssDemo(rel) {
  return /^apps\/css\//.test(rel);
}

export function buildDemoNotesSection(meta, legacyInterview = []) {
  const points = meta.points.length ? meta.points : [meta.theme || "见下方演示"];
  const interviewSrc =
    meta.interviewPoints.length >= 3
      ? meta.interviewPoints
      : deriveInterviewBullets(points, meta.theme, meta.interviewPoints);

  const kpLines = points.slice(0, 6).map((p) => expandKnowledgeLi(p));
  let pad = 0;
  while (kpLines.length < 4) {
    const extra =
      points[pad % Math.max(points.length, 1)] ||
      `${meta.theme || "本 demo"} 的延伸场景与注意点`;
    kpLines.push(
      expandKnowledgeLi(
        pad < points.length ? extra : `${extra}（第 ${kpLines.length + 1} 点）`
      )
    );
    pad++;
    if (pad > 8) break;
  }

  const ivLines = interviewSrc.slice(0, 5).map((q, i) =>
    expandInterviewLi(q, points, meta.theme, legacyInterview[i] ? [legacyInterview[i]] : [])
  );

  return `<section class="demo-notes" aria-label="复习与面试要点">
    <h2>知识点要点</h2>
    <ul>
${kpLines.join("\n")}
    </ul>
    <h2>面试考点</h2>
    <ul>
${ivLines.join("\n")}
    </ul>
  </section>`;
}

export function upsertHeaderInterview(content, bullets) {
  if (content.includes("面试:")) return content;
  const block = parseHeaderForReplace(content);
  if (!block) return content;
  const lines = bullets.map((b) => `    - ${b.replace(/[？?]$/, "").trim()}`).join("\n");
  const insert = `  面试:\n${lines}\n`;
  const newBlock = block.replace(/(\s*要点:[\s\S]*?)(\n\s*(?:难度|前置|相关|分类|主题):|\n-->)/m, (m, pointsSec, tail) => {
    return `${pointsSec}\n${insert}${tail.trimStart()}`;
  });
  return content.replace(block, newBlock);
}

function parseHeaderForReplace(content) {
  const before = content.split(/<!DOCTYPE/i)[0];
  const m = before.match(/<!--\s*([\s\S]*?)\s*-->/);
  return m ? m[0] : null;
}

export function injectHeaderInterview(content, interviewBullets) {
  if (content.includes("面试:")) return content;
  const commentMatch = content.match(/<!--\s*([\s\S]*?)\s*-->/);
  if (!commentMatch) return content;
  const old = commentMatch[0];
  const inner = commentMatch[1];
  const lines = interviewBullets
    .slice(0, 5)
    .map((b) => `    - ${b.replace(/[？?]$/, "").trim()}`)
    .join("\n");
  const addition = `\n  面试:\n${lines}`;
  let newInner = inner;
  if (inner.includes("要点:")) {
    newInner = inner.replace(
      /(要点:[\s\S]*?)(?=\n\s*(?:难度|前置|相关|面试|分类|主题):|\s*$)/,
      `$1${addition}`
    );
  } else {
    newInner = inner + addition;
  }
  const normalized = newInner
    .split("\n")
    .map((line) => {
      if (/^(分类|主题|难度|前置|相关|要点|面试):/.test(line.trim())) {
        return line.trimStart().startsWith("  ") ? line : `  ${line.trimStart()}`;
      }
      if (/^\s*-\s/.test(line)) return line.startsWith("    ") ? line : `    ${line.trimStart()}`;
      return line;
    })
    .join("\n");
  return content.replace(old, `<!--\n${normalized}\n-->`);
}
