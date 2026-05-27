import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import test from "node:test";

const ROOT = new URL("../..", import.meta.url).pathname;
const NODE = process.execPath;

function readGeneratedFiles() {
  return {
    index: readFileSync(join(ROOT, "index.html"), "utf8"),
    manifest: readFileSync(join(ROOT, "manifest.json"), "utf8"),
  };
}

function restoreGeneratedFiles(snapshot) {
  writeFileSync(join(ROOT, "index.html"), snapshot.index);
  writeFileSync(join(ROOT, "manifest.json"), snapshot.manifest);
}

function runScript(args) {
  return spawnSync(NODE, args, {
    cwd: ROOT,
    encoding: "utf8",
  });
}

test("build-index --check validates generated files without rewriting them", () => {
  const before = readGeneratedFiles();
  try {
    const result = runScript(["scripts/build-index.mjs", "--check"]);
    const after = readGeneratedFiles();

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.deepEqual(after, before);
  } finally {
    restoreGeneratedFiles(before);
  }
});

test("validate-demos validates manifest consistency without rewriting generated files", () => {
  const before = readGeneratedFiles();
  try {
    const result = runScript(["scripts/validate-demos.mjs"]);
    const after = readGeneratedFiles();

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.deepEqual(after, before);
  } finally {
    restoreGeneratedFiles(before);
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
  assert.match(result.stdout, /通过：323 个 HTML/);
});

test("package.json exposes one-command maintenance scripts", () => {
  const packagePath = join(ROOT, "package.json");
  assert.equal(existsSync(packagePath), true, "package.json should exist");

  const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
  assert.deepEqual(pkg.scripts, {
    "build:index": "node scripts/build-index.mjs",
    "check:index": "node scripts/build-index.mjs --check",
    "sync:readmes": "node scripts/sync-readmes.mjs",
    "validate:demos": "node scripts/validate-demos.mjs",
    "validate:typescript": "node scripts/validate-typescript-coverage.mjs",
    "validate:smoke": "node scripts/validate-browser-smoke.mjs",
    validate:
      "node scripts/validate-demos.mjs && node scripts/sync-readmes.mjs --check && node scripts/validate-typescript-coverage.mjs && node scripts/validate-browser-smoke.mjs",
    test: "node --test scripts/tests/*.test.mjs",
  });
});
