# react/libs

React 18 运行时（开发版，非压缩，含警告日志）。

| 文件 | 版本 | 用途 | 官方地址 |
|---|---|---|---|
| `react18.js` | React 18.x development | React 核心库（`React.Component` / `createElement`） | https://unpkg.com/react@18/umd/react.development.js |
| `react-dom18.js` | React 18.x development | DOM 渲染（`ReactDOM.render` / `createRoot`） | https://unpkg.com/react-dom@18/umd/react-dom.development.js |
| `babel.js` | @babel/standalone | 浏览器端 JSX → JS 转译（`<script type="text/babel">`） | https://unpkg.com/@babel/standalone/babel.min.js |

## 升级方式

直接下载新版本覆盖即可，文件名保持不变；如果改名记得同步更新 `react/src/*.html` 里的 `<script src>` 引用。
