#!/usr/bin/env node
/**
 * Playwright 浏览器冒烟：抽样打开 demo，检查无 pageerror / console.error。
 * 需先启动静态服务：npm run serve（默认 4173）
 *
 * 运行：npm run validate:playwright
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const BASE = process.env.DEMO_BASE_URL || "http://127.0.0.1:4173";
const SAMPLE_SIZE = Number(process.env.PLAYWRIGHT_SAMPLE || 24);

const PRIORITY_HREFS = [
  "learn/javascript/01-基础/严格模式.html",
  "learn/javascript/06-浏览器API/HTTP缓存.html",
  "learn/vue3/src/07-路由状态工程化/06-Router与Pinia可运行示例.html",
  "learn/react18/src/function-components/34-React19新特性概览.html",
  "learn/typescript/mini-project/index.html",
  "learn/demos/todo/01-todo-本地状态.html",
];

async function loadManifestPaths() {
  const manifest = JSON.parse(await readFile(join(ROOT, "manifest.json"), "utf8"));
  const all = [];
  for (const sec of manifest.sections) {
    for (const gr of sec.groups) {
      for (const it of gr.items) {
        all.push(decodeURIComponent(it.href));
      }
    }
  }
  return all;
}

function pickSample(all) {
  const set = new Set(PRIORITY_HREFS.filter((h) => all.includes(h)));
  for (const p of all) {
    if (set.size >= SAMPLE_SIZE) break;
    set.add(p);
  }
  return [...set].slice(0, SAMPLE_SIZE);
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.log("[validate-browser-playwright] 跳过：未安装 playwright（npm i -D playwright && npx playwright install chromium）");
    return;
  }

  const all = await loadManifestPaths();
  const sample = pickSample(all);
  const errors = [];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const path of sample) {
    const url = `${BASE}/${path.split("/").map(encodeURIComponent).join("/")}`;
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    try {
      const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      if (!res || !res.ok()) {
        errors.push(`${path}: HTTP ${res?.status() ?? "failed"}`);
      } else if (consoleErrors.length) {
        errors.push(`${path}: ${consoleErrors[0]}`);
      }
    } catch (e) {
      errors.push(`${path}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (errors.length) {
    console.error(`[validate-browser-playwright] 失败 ${errors.length} 项：\n`);
    errors.forEach((e) => console.error("  •", e));
    process.exitCode = 1;
    return;
  }
  console.log(`[validate-browser-playwright] 通过：抽样 ${sample.length} 个页面（BASE=${BASE}）`);
}

main().catch((err) => {
  console.error("[validate-browser-playwright] 异常：", err);
  process.exitCode = 1;
});
