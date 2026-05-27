#!/usr/bin/env node
/**
 * TypeScript 专题覆盖度校验：
 *   - 确保 learn/typescript 下存在面试高频主题 demo
 *   - 每个 demo 必须能被 validate-demos 的头注释规则识别
 *
 * 运行：node scripts/validate-typescript-coverage.mjs
 */

import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");

const REQUIRED_DEMOS = [
  {
    file: "learn/typescript/01-基础/01-类型注解与推断.html",
    keywords: ["类型注解", "unknown", "any"],
  },
  {
    file: "learn/typescript/01-基础/02-interface与type.html",
    keywords: ["interface", "type", "ApiResult"],
  },
  {
    file: "learn/typescript/01-基础/03-泛型基础.html",
    keywords: ["泛型", "keyof", "extends"],
  },
  {
    file: "learn/typescript/01-基础/04-函数类型与重载.html",
    keywords: ["函数重载", "可选参数", "剩余参数"],
  },
  {
    file: "learn/typescript/01-基础/05-数组元组与字面量.html",
    keywords: ["元组", "readonly", "as const", "satisfies"],
  },
  {
    file: "learn/typescript/01-基础/06-class与implements.html",
    keywords: ["implements", "abstract", "private"],
  },
  {
    file: "learn/typescript/01-基础/07-enum与对象枚举.html",
    keywords: ["enum", "const enum", "对象枚举"],
  },
  {
    file: "learn/typescript/02-进阶/01-类型收窄.html",
    keywords: ["类型收窄", "discriminated union", "类型守卫"],
  },
  {
    file: "learn/typescript/02-进阶/02-Utility-Types.html",
    keywords: ["Partial", "Pick", "Omit", "Record"],
  },
  {
    file: "learn/typescript/02-进阶/03-条件类型与infer.html",
    keywords: ["条件类型", "infer", "ReturnType"],
  },
  {
    file: "learn/typescript/02-进阶/04-映射类型与模板字面量.html",
    keywords: ["映射类型", "模板字面量类型", "索引访问"],
  },
  {
    file: "learn/typescript/02-进阶/05-never与穷尽检查.html",
    keywords: ["never", "穷尽检查", "assertNever"],
  },
  {
    file: "learn/typescript/03-工程与框架/01-tsconfig-strict配置.html",
    keywords: ["tsconfig", "strict", "noImplicitAny"],
  },
  {
    file: "learn/typescript/03-工程与框架/02-类型声明与模块.html",
    keywords: [".d.ts", "declare module", "类型声明"],
  },
  {
    file: "learn/typescript/03-工程与框架/03-Vue3与React组件类型.html",
    keywords: ["defineProps", "React.FC", "组件 Props"],
  },
];

const errors = [];

function validateHeader(content, file) {
  const beforeDoctype = content.split(/<!DOCTYPE/i)[0];
  const comment = beforeDoctype.match(/<!--\s*([\s\S]*?)\s*-->/);
  if (!comment) {
    errors.push(`${file}: 缺少 <!DOCTYPE 前的头注释块`);
    return;
  }

  for (const key of ["分类", "主题", "要点"]) {
    if (!comment[1].includes(`${key}:`)) {
      errors.push(`${file}: 头注释缺少「${key}:」`);
    }
  }
}

async function main() {
  for (const demo of REQUIRED_DEMOS) {
    const abs = join(ROOT, demo.file);
    try {
      await stat(abs);
    } catch {
      errors.push(`${demo.file}: 缺少必备 TypeScript demo`);
      continue;
    }

    const content = await readFile(abs, "utf8");
    validateHeader(content, demo.file);

    for (const keyword of demo.keywords) {
      if (!content.includes(keyword)) {
        errors.push(`${demo.file}: 缺少关键词「${keyword}」`);
      }
    }
  }

  if (errors.length) {
    console.error(`[validate-typescript-coverage] 失败，共 ${errors.length} 项：\n`);
    errors.forEach((err) => console.error("  -", err));
    process.exitCode = 1;
    return;
  }

  console.log(`[validate-typescript-coverage] 通过：${REQUIRED_DEMOS.length} 个 TypeScript 高频主题已覆盖`);
}

main().catch((err) => {
  console.error("[validate-typescript-coverage] 异常：", err);
  process.exitCode = 1;
});
