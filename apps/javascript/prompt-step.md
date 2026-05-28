# apps/javascript 批量升级 — 续跑步骤

配合 `@apps/javascript/prompt.md` 与 `@CONVENTIONS.md` 使用。每次新对话粘贴下方对应模板即可。

---

## 当前进度（手动更新）

| 项               | 值                             |
| ---------------- | ------------------------------ |
| 总文件数         | 129                            |
| 已完成（含标杆） | **129**                        |
| 剩余             | **0**                          |
| 上一批最后完成   | `09-Canvas/动画/firework.html` |
| **下一批起点**   | —（全部完成）                  |

标杆（跳过或仅一致性检查）：`01-基础/变量.html`、`01-基础/数组方法.html`

每批结束后，把上表「上一批最后完成 / 下一批起点 / 已完成 / 剩余」改掉。

---

## 一、每批 20 个（推荐）

```
@apps/javascript/prompt.md
@CONVENTIONS.md
@apps/javascript/01-基础/变量.html
@apps/javascript/01-基础/数组方法.html

继续批量升级 apps/javascript/，从 `[下一批起点]` 开始。
（上一批最后完成：`[上一批最后文件]`）

标准不变：MDN 权威、§零 工作流、四区块对齐、SCRIPT 用 // ============ N. 分段+中文注释、面试题必须可验证。
本批再处理 20 个文件，直接改文件，不要只分析。
完成后给 §四 汇总表并注明剩余数量。不要 git commit。
```

---

## 二、一次改完剩余全部

```
@apps/javascript/prompt.md
@CONVENTIONS.md
@apps/javascript/01-基础/变量.html
@apps/javascript/01-基础/数组方法.html

继续批量升级 apps/javascript/ 下剩余全部 demo。
从 `[起点]` 开始（上一批最后完成：`[上一批最后文件]`）。

标准不变：
- 严格按 prompt.md §零 工作流
- MDN 权威、NOTES / PAGE_DOM / SCRIPT / NAV 四区块对齐
- SCRIPT 用 // ============ N. 分段 + 中文注释
- 面试考点必须在 SCRIPT 或 PAGE_DOM 可验证
- 最小改动，不要 git commit

按 prompt.md §十二 清单顺序逐个直接改文件，不要只分析。
全部完成后运行 npm run build:index && npm run validate，给 §四 汇总表，注明剩余 0 个及需人工浏览器验证的文件。
```

---

## 三、续跑时只改两行

1. **`从 \`...\` 开始`** → 改成「上一批最后一个文件的**下一个**」
2. **`（上一批最后完成：\`...\`）`** → 改成上一批实际最后一个路径

**§十二 顺序速查（剩余段）：**

```
（全部 129 个已完成）
```

完整清单见 `prompt.md` §十二。

---

## 四、每批结束 AI 应交付

- §四 格式的**汇总表**（路径 / 主要修复 / 新增演示 / MDN）
- **本批已改数 / 剩余数**
- **下一批起点**（写进本文件「当前进度」表）
- **需人工浏览器验证**的文件（网络、HTTPS、Notification、Service Worker 等）
- 全部完成后：`npm run build:index && npm run validate`

---

## 五、避免 AI 只分析不改文件

每轮务必包含：

- `直接改文件，不要只写分析报告`
- `不要 git commit`（除非你明确要求提交）
- 具体起点路径，不要用「继续改剩下的」这种模糊说法

---

## 六、首批（从头开始时用）

```
@apps/javascript/prompt.md
@CONVENTIONS.md
@apps/javascript/01-基础/变量.html
@apps/javascript/01-基础/数组方法.html

按 prompt.md 批量升级 apps/javascript/ 下全部 demo。
从 01-基础/ 开始，跳过已完成的 变量.html、数组方法.html。
本批先处理 20 个文件：遵循 §零 工作流，直接改文件，不要只分析。
完成后给汇总表（§四 格式）并注明剩余数量。不要 git commit。
```
