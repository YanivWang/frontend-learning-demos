import { createReadStream, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import type { Plugin } from "vite";
import sidebar from "./sidebar.generated.mts";

const configDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(configDir, "../..");
const learnRoot = join(repoRoot, "learn");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

function safeLearnPath(urlPath: string) {
  const rel = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const abs = join(learnRoot, rel);
  if (!abs.startsWith(learnRoot)) {
    return null;
  }
  return abs;
}

function serveStaticFile(filePath: string, res: import("http").ServerResponse) {
  const st = statSync(filePath);
  if (!st.isFile()) {
    return false;
  }
  const ext = extname(filePath).toLowerCase();
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  createReadStream(filePath).pipe(res);
  return true;
}

function serveLearnDemos(): Plugin {
  function attach(server: { middlewares: import("connect").Connect.Server }) {
    server.middlewares.use("/learn", (req, res, next) => {
      if (!req.url) {
        return next();
      }
      const filePath = safeLearnPath(req.url);
      if (!filePath) {
        return next();
      }
      try {
        if (serveStaticFile(filePath, res)) {
          return;
        }
      } catch {
        // fall through
      }
      next();
    });
  }

  return {
    name: "serve-learn-demos",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

export default defineConfig({
  title: "frontend-learning-demos",
  description: "前端语法与框架复习 Demo 库",
  lang: "zh-CN",
  // GitHub Pages 部署时设置：VITEPRESS_BASE=/js-css-vue-react-learn/
  base: process.env.VITEPRESS_BASE || "/",
  cleanUrls: false,
  ignoreDeadLinks: [/^\/learn\//],
  vite: {
    plugins: [serveLearnDemos()],
  },
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "Demo 索引", link: "/demos/" },
      {
        text: "GitHub",
        link: "https://github.com/jsAppSpace/js-css-vue-react-learn",
      },
    ],
    sidebar,
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新",
    },
  },
});
