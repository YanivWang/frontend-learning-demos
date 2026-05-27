import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
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

test("sync-readmes --check validates README tables without rewriting them", () => {
  const readmeFiles = [
    "learn/javascript/README.md",
    "learn/css/README.md",
    "learn/vue2/README.md",
    "learn/vue3/README.md",
    "learn/react/README.md",
    "learn/typescript/README.md",
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
      join(ROOT, "docs-site/.vitepress/sidebar.generated.mts"),
      "utf8"
    ),
    demosIndex: readFileSync(join(ROOT, "docs-site/demos/index.md"), "utf8"),
  };
  try {
    const result = runScript(["scripts/gen-vitepress-sidebar.mjs", "--check"]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(
      readFileSync(join(ROOT, "docs-site/.vitepress/sidebar.generated.mts"), "utf8"),
      generatedFiles.sidebar
    );
    assert.equal(
      readFileSync(join(ROOT, "docs-site/demos/index.md"), "utf8"),
      generatedFiles.demosIndex
    );
  } finally {
    writeFileSync(
      join(ROOT, "docs-site/.vitepress/sidebar.generated.mts"),
      generatedFiles.sidebar
    );
    writeFileSync(join(ROOT, "docs-site/demos/index.md"), generatedFiles.demosIndex);
  }
});
