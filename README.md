# 个人简历网站

张春生的个人简历网站 - Vue 3 + Vite + TailwindCSS 构建的响应式个人主页

## 在线访问

[https://resume.luomor.com](https://resume.luomor.com)

## 技术栈

- Vue 3 (Composition API)
- Vue Router 4
- Vite 6
- TailwindCSS 3
- Canvas API（地球/心跳动画）

## 项目结构

```
about/
├── src/
│   ├── components/         # Vue 组件
│   ├── composables/        # 组合式函数（数据/滚动/语言）
│   ├── locales/            # 国际化文件
│   ├── styles/             # 自定义 CSS（动画/变量）
│   ├── canvas/             # Canvas 动画（地球/心跳）
│   ├── App.vue             # 根组件
│   └── main.js             # 应用入口
├── public/                 # 静态资源
├── .github/workflows/      # CI/CD（GitHub Actions）
└── dist/                   # 构建产物
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（WSL2 环境下自动轮询）
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署

推送到 `master` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages：

```bash
git push origin master
```

## 浏览器支持

- Chrome / Firefox / Safari / Edge（最新）
- 移动端适配

## License

MIT
