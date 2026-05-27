#!/usr/bin/env node
/**
 * 各模块面试高频主题覆盖度校验（除 TS 外由 validate-typescript-coverage 负责）。
 * 运行：node scripts/validate-topic-coverage.mjs
 */

import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const errors = [];

const REQUIRED = [
  // JavaScript
  { file: "learn/javascript/06-浏览器API/HTTP缓存.html", keywords: ["Cache-Control", "ETag", "强缓存"] },
  { file: "learn/javascript/07-进阶/安全/XSS与CSRF.html", keywords: ["XSS", "CSRF", "Content-Security-Policy"] },
  { file: "learn/javascript/08-面试题/手写/07-LRU缓存.html", keywords: ["LRU", "Map", "get"] },
  { file: "learn/javascript/06-浏览器API/事件模型/03-Node与浏览器事件循环对比.html", keywords: ["Node.js", "process.nextTick", "微任务"] },
  // CSS
  { file: "learn/css/07-现代特性/04-is-where选择器/index.html", keywords: [":is(", ":where(", "特异性"] },
  { file: "learn/css/07-现代特性/05-view-transitions/index.html", keywords: ["view-transition", "过渡"] },
  { file: "learn/css/07-现代特性/06-subgrid/index.html", keywords: ["subgrid", "grid"] },
  // Vue3
  { file: "learn/vue3/src/07-路由状态工程化/06-Router与Pinia可运行示例.html", keywords: ["createRouter", "defineStore", "vue-router"] },
  { file: "learn/vue3/src/07-路由状态工程化/07-Vitest单元测试面试点.html", keywords: ["Vitest", "单元测试", "mock"] },
  // React
  { file: "learn/react/src/function-components/34-React19新特性概览.html", keywords: ["React 19", "use", "Action"] },
  { file: "learn/react19/src/01-基础语法/03-Actions与useActionState.html", keywords: ["useActionState", "action", "isPending"] },
  { file: "learn/react19/src/01-基础语法/05-use读取Promise与Context.html", keywords: ["use(", "Suspense", "Context"] },
  // TypeScript 扩展
  { file: "learn/typescript/02-进阶/06-手写Utility-Types练习.html", keywords: ["Partial", "Pick", "Omit"] },
  { file: "learn/typescript/03-工程与框架/04-React表单与Vue-emits类型.html", keywords: ["ChangeEvent", "defineEmits", "表单"] },
  // Demos
  { file: "learn/demos/todo/01-todo-本地状态.html", keywords: ["todo", "localStorage"] },
];

async function main() {
  for (const item of REQUIRED) {
    const abs = join(ROOT, item.file);
    try {
      await stat(abs);
    } catch {
      errors.push(`${item.file}: 缺少必备 demo`);
      continue;
    }
    const content = await readFile(abs, "utf8");
    for (const kw of item.keywords) {
      if (!content.includes(kw)) {
        errors.push(`${item.file}: 缺少关键词「${kw}」`);
      }
    }
  }

  const miniTs = join(ROOT, "learn/typescript/mini-project/tsconfig.json");
  try {
    await stat(miniTs);
  } catch {
    errors.push("learn/typescript/mini-project/tsconfig.json: 缺少 TS mini-project");
  }

  if (errors.length) {
    console.error(`[validate-topic-coverage] 失败，共 ${errors.length} 项：\n`);
    errors.forEach((e) => console.error("  •", e));
    process.exitCode = 1;
    return;
  }
  console.log(`[validate-topic-coverage] 通过：${REQUIRED.length} 个扩展主题 + TS mini-project 已覆盖`);
}

main().catch((err) => {
  console.error("[validate-topic-coverage] 异常：", err);
  process.exitCode = 1;
});
