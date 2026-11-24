# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作提供指导。

## 项目概述

张春生的个人简历网站，全栈软件工程师。使用 Vue 3 + Vite + TailwindCSS 构建，通过 GitHub Actions 自动部署到 GitHub Pages。

**网站**: https://resume.luomor.com
**技术栈**: Vue 3, Vue Router 4, Vite 6, TailwindCSS 3

## 项目结构

```
about/
├── src/
│   ├── main.js                       # Vue 应用入口
│   ├── App.vue                       # 根组件
│   ├── router/
│   │   └── index.js                  # Vue Router: /zh, /en
│   ├── composables/
│   │   ├── useLocale.js              # 语言切换
│   │   ├── useWorkExperience.js      # 工作经历数据（fetch）
│   │   └── useScroll.js              # 滚动动画/回到顶部
│   ├── components/
│   │   ├── ResumePage.vue            # 页面容器
│   │   ├── TheNavbar.vue             # 导航栏（语言切换）
│   │   ├── IntroductionSection.vue   # 个人介绍（Canvas 地球/心跳）
│   │   ├── SkillDiagram.vue          # 技能图
│   │   ├── TechnologySection.vue     # 技术栈
│   │   ├── WorkSection.vue           # 工作经历时间线
│   │   ├── TimelineItem.vue          # 公司经历卡片
│   │   ├── ProjectItem.vue           # 项目卡片（可折叠）
│   │   ├── QrCodeSection.vue         # 二维码
│   │   └── StatementSection.vue      # 声明/参考
│   ├── locales/
│   │   ├── zh.js                     # 中文
│   │   └── en.js                     # 英文
│   ├── canvas/
│   │   ├── useEarth.js               # 地球旋转动画
│   │   └── useHeart.js               # 心跳曲线动画
│   └── styles/
│       └── custom.css                # CSS 变量/动画/时间线样式
├── public/
│   ├── images/                       # 图片资源
│   └── .nojekyll                     # 跳过 Jekyll 处理
├── .github/workflows/
│   └── deploy.yml                    # CI/CD 自动部署
├── docs/                             # PDF 简历
└── demo/                             # 历史演示项目
```

## 开发命令

```bash
# 开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 架构说明

- **国际化**: 使用 Vue Router 的 `/zh` 和 `/en` 路由，`useLocale.js` 提供响应式 locale
- **数据加载**: 工作经历通过 fetch 从 `https://about.luomor.com/about/workExperience` 获取
- **排序**: `work_experiences` 数组从后往前遍历，最后一个元素为最新经历
- **响应式**: TailwindCSS 工具类 + 自定义媒体查询
- **Canvas 动画**: `useEarth.js`（球体投影）和 `useHeart.js`（参数方程心形曲线）使用 ref 绑定 canvas
- **滚动动画**: IntersectionObserver 实现淡入效果
- **CSS 变量**: `src/styles/custom.css` 定义主题色、字体、动画

## CI/CD

`.github/workflows/deploy.yml` 推送到 master 自动构建部署：
1. `npm ci` 安装依赖
2. `npm run build` 输出到 `dist/`
3. 上传 artifacts 并通过 `actions/deploy-pages` 部署

首次使用需在仓库 Settings → Pages → Source 选择 `GitHub Actions`。

## 演示项目

`demo/` 文件夹包含历史实验性 UI 组件（vue-timeline、bootflat 模板等），不影响主站构建。
