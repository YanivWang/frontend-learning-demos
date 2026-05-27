#!/usr/bin/env node
/**
 * 返回 VitePress 站点首页 URL（与 .vitepress/config.mts 的 base 保持一致）。
 * 注入 demo 页脚「目录」链接时使用；部署 GitHub Pages 时设置 VITEPRESS_BASE。
 */
export function docsHomeHref() {
  const base = process.env.VITEPRESS_BASE || "/";
  if (base === "/") return "/";
  return base.endsWith("/") ? base : `${base}/`;
}
