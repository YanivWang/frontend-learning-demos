import assert from "node:assert/strict";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { join, relative } from "node:path";
import test from "node:test";

const ROOT = new URL("../..", import.meta.url).pathname;
const NODE = process.execPath;

function readManifest() {
  return readFileSync(join(ROOT, "manifest.json"), "utf8");
}

function restoreManifest(snapshot) {
  writeFileSync(join(ROOT, "manifest.json"), snapshot);
}

function runScript(args) {
  return spawnSync(NODE, args, {
    cwd: ROOT,
    encoding: "utf8",
  });
}

function listHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const stat = statSync(abs);
    if (stat.isDirectory()) {
      if (["libs", "lib", "node_modules"].includes(entry)) continue;
      files.push(...listHtmlFiles(abs));
    } else if (entry.toLowerCase().endsWith(".html")) {
      files.push(abs);
    }
  }
  return files;
}

test("build-index --check validates generated files without rewriting them", () => {
  const before = readManifest();
  try {
    const result = runScript(["scripts/build-index.mjs", "--check"]);
    const after = readManifest();

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(after, before);
  } finally {
    restoreManifest(before);
  }
});

test("validate-demos validates manifest consistency without rewriting generated files", () => {
  const before = readManifest();
  try {
    const result = runScript(["scripts/validate-demos.mjs"]);
    const after = readManifest();

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(after, before);
  } finally {
    restoreManifest(before);
  }
});

test("framework mount DOM is wrapped by PAGE_DOM markers", () => {
  const frameworkDirs = ["apps/vue2", "apps/vue3", "apps/react18", "apps/react19"];
  const failures = [];

  for (const dir of frameworkDirs) {
    const files = listHtmlFiles(join(ROOT, dir));
    for (const file of files) {
      const html = readFileSync(file, "utf8");
      if (!/<div[^>]+id\s*=\s*["'](?:app|root)["']/i.test(html)) continue;
      if (
        !/<!--\s*PAGE_DOM_START\s*-->[\s\S]*?<div[^>]+id\s*=\s*["'](?:app|root)["'][\s\S]*?<!--\s*PAGE_DOM_END\s*-->/i.test(
          html
        )
      ) {
        failures.push(relative(ROOT, file));
      }
    }
  }

  assert.deepEqual(failures, []);
});

test("sync-readmes --check validates README tables without rewriting them", () => {
  const readmeFiles = [
    "apps/javascript/README.md",
    "apps/css/README.md",
    "apps/vue2/README.md",
    "apps/vue3/README.md",
    "apps/react18/README.md",
    "apps/react19/README.md",
    "apps/typescript/README.md",
    "apps/demos/README.md",
  ];
  const before = Object.fromEntries(
    readmeFiles.map((file) => [file, readFileSync(join(ROOT, file), "utf8")])
  );

  const result = runScript(["scripts/sync-readmes.mjs", "--check"]);
  const after = Object.fromEntries(
    readmeFiles.map((file) => [file, readFileSync(join(ROOT, file), "utf8")])
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.deepEqual(after, before);
});

test("browser smoke validation confirms manifest pages and local assets exist", () => {
  const result = runScript(["scripts/validate-browser-smoke.mjs"]);
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /通过：\d+ 个 HTML/);
});

test("package.json exposes one-command maintenance scripts", () => {
  const packagePath = join(ROOT, "package.json");
  assert.equal(existsSync(packagePath), true, "package.json should exist");

  const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
  const required = [
    "build:index",
    "check:index",
    "sync:readmes",
    "serve",
    "docs:dev",
    "docs:build",
    "validate",
    "validate:topics",
    "validate:tsc",
    "test",
  ];
  for (const key of required) {
    assert.equal(typeof pkg.scripts[key], "string", `missing script: ${key}`);
  }
  assert.match(pkg.scripts["build:index"], /inject-demo-nav/);
  assert.match(pkg.scripts["build:index"], /gen-vitepress-sidebar/);
});

test("gen-vitepress-sidebar --check validates generated docs nav without rewriting", () => {
  const generatedFiles = {
    sidebar: readFileSync(
      join(ROOT, "docs/.vitepress/sidebar.generated.mts"),
      "utf8"
    ),
    demosIndex: readFileSync(join(ROOT, "docs/demos/index.md"), "utf8"),
  };
  try {
    const result = runScript(["scripts/gen-vitepress-sidebar.mjs", "--check"]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(
      readFileSync(join(ROOT, "docs/.vitepress/sidebar.generated.mts"), "utf8"),
      generatedFiles.sidebar
    );
    assert.equal(
      readFileSync(join(ROOT, "docs/demos/index.md"), "utf8"),
      generatedFiles.demosIndex
    );
  } finally {
    writeFileSync(
      join(ROOT, "docs/.vitepress/sidebar.generated.mts"),
      generatedFiles.sidebar
    );
    writeFileSync(join(ROOT, "docs/demos/index.md"), generatedFiles.demosIndex);
  }
});
