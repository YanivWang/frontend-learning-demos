/**
 * 批量升级 Vue3 demo：标准化 createApp / mount 分离 + 根 onMounted 日志
 * 跳过已完成标杆 01-应用实例与模板语法.html
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'apps', 'vue3', 'src');
const SKIP = '01-应用实例与模板语法.html';

const MOUNT_TAIL = `
      // mount 须在 app.use / app.component / app.config 等配置之后调用
      // 每个 app 实例 mount() 只能调用一次；返回值是根组件实例，不是 app 实例
      const rootInstance = app.mount("#app");
      console.log("[mount] 根组件实例", rootInstance);`;

const ON_MOUNTED = `
          // 根组件挂载完成：mount() 已把模板编译并渲染到 #app
          onMounted(() => {
            console.log("[mounted] createApp 已接管 #app，DOM 已渲染");
          });
`;

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function ensureOnMountedInDestructuring(script) {
  const m = script.match(/const \{([^}]+)\} = Vue;/);
  if (!m) return script;
  if (m[1].includes('onMounted')) return script;
  const apis = m[1].trim().replace(/,\s*$/, '');
  return script.replace(m[0], `const { ${apis}, onMounted } = Vue;`);
}

function insertOnMountedBeforeReturn(setupBody) {
  if (setupBody.includes('[mounted] createApp 已接管 #app')) return setupBody;
  // 在最后一个 return { 之前插入（根 setup 通常只有一个 return）
  const idx = setupBody.lastIndexOf('return {');
  if (idx === -1) return setupBody + ON_MOUNTED;
  return setupBody.slice(0, idx) + ON_MOUNTED + '\n' + setupBody.slice(idx);
}

function upgradeScriptBlock(script) {
  if (script.includes('const rootInstance = app.mount')) return null;

  let s = script;
  s = s.replace(/\n\s*\/\/ --- 挂载应用 ---\s*\n/g, '\n');
  s = ensureOnMountedInDestructuring(s);

  // app.use(...).mount — 拆成两行 mount
  s = s.replace(
    /const app = createApp\([\s\S]*?\);\s*\n\s*app\.use\(([^)]+(?:\([^)]*\)[^)]*)*)\)\.mount\("#app"\);/,
    (full, useArg) => {
      const appPart = full.replace(/app\.use\([^)]+\)\.mount\("#app"\);/, '').trimEnd();
      return `${appPart}\n      app.use(${useArg});\n${MOUNT_TAIL}`;
    },
  );

  // 链式 .mount("#app")
  if (s.includes('}).mount("#app")')) {
    if (!s.includes('const app = createApp')) {
      s = s.replace(/createApp\(/, 'const app = createApp(');
    }
    s = s.replace(/\}\)\.mount\("#app"\);/, '});' + MOUNT_TAIL);

    // 根 createApp 的 setup：在最后一个 setup() { ... return 前加 onMounted
    const appIdx = s.indexOf('const app = createApp');
    if (appIdx !== -1) {
      const afterApp = s.slice(appIdx);
      const setupMatch = afterApp.match(/setup\(\)\s*\{/);
      if (setupMatch) {
        const setupStart = appIdx + setupMatch.index + setupMatch[0].length;
        // 找与此 setup 配对的闭合：简单找最后一个 return { 到 }, 前的 setup 体
        const rest = s.slice(setupStart);
        const returnIdx = rest.lastIndexOf('return {');
        if (returnIdx !== -1 && !rest.includes('[mounted] createApp 已接管 #app')) {
          const before = s.slice(0, setupStart + returnIdx);
          const after = s.slice(setupStart + returnIdx);
          s = before + ON_MOUNTED + '\n' + after;
        }
      }
    }
  }

  // createApp({ components }).mount 单行
  if (
    s.includes('createApp({ components:') &&
    s.includes('.mount("#app")') &&
    !s.includes('const rootInstance')
  ) {
    s = s.replace(
      /createApp\(\{ components: ([^}]+) \}\)\.mount\("#app"\);/,
      `const app = createApp({ components: $1 });\n${MOUNT_TAIL}`,
    );
    s = ensureOnMountedInDestructuring(s);
  }

  return s === script ? null : s;
}

function upgradeFile(filePath) {
  if (path.basename(filePath) === SKIP) return { file: filePath, status: 'skipped' };

  let html = fs.readFileSync(filePath, 'utf8');
  const start = html.indexOf('<!-- SCRIPT_START -->');
  const end = html.indexOf('<!-- SCRIPT_END -->');
  if (start === -1 || end === -1) return { file: filePath, status: 'no_script' };

  const before = html.slice(0, start);
  const scriptSection = html.slice(start, end);
  const after = html.slice(end);

  const scriptMatch = scriptSection.match(/<script>([\s\S]*)<\/script>/);
  if (!scriptMatch) return { file: filePath, status: 'no_script_tag' };

  const upgraded = upgradeScriptBlock(scriptMatch[1]);
  if (!upgraded) return { file: filePath, status: 'unchanged' };

  const newSection = scriptSection.replace(scriptMatch[1], upgraded);
  fs.writeFileSync(filePath, before + newSection + after, 'utf8');
  return { file: filePath, status: 'upgraded' };
}

const files = walk(root).sort();
const results = files.map(upgradeFile);
const upgraded = results.filter((r) => r.status === 'upgraded');
const unchanged = results.filter((r) => r.status === 'unchanged');

console.log(`Upgraded: ${upgraded.length}`);
upgraded.forEach((r) => console.log('  ', path.relative(root, r.file)));
console.log(`Unchanged: ${unchanged.length}`);
unchanged.forEach((r) => console.log('  ', path.relative(root, r.file)));
