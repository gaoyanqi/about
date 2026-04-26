# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作提供指导。

## 项目概述

张春生的个人简历网站，全栈软件工程师。使用 HTML5、CSS3、Bootstrap 和 jQuery 构建，托管于 GitHub Pages。

**网站**: https://about.luomor.com  
**技术栈**: HTML5, CSS3, Bootstrap 3, jQuery, Bootflat UI

## 项目结构

```
about/
├── aboutMe.html        # 中文简历（主页）
├── aboutMeEn.html      # 英文简历
├── index.md            # GitHub Pages 索引
├── _config.yml         # Jekyll 配置
├── css/                # 样式表（Bootstrap、Bootflat、自定义）
├── js/                 # JavaScript（i18n、时间线、动画）
│   ├── i18n/           # 国际化文件
│   └── lib/            # 第三方库（jQuery、Backbone、Underscore）
├── demo/               # 演示项目和 UI 组件
├── dist/               # 分发生成文件
├── docs/               # 简历 PDF 文档
├── fonts/              # Web 字体
├── images/             # 资源和图片
└── stylesheets/        # 附加样式
```

## 关键文件

- `aboutMe.html` - 中文简历主页，包含导航（介绍/技能/工作/声明）
- `aboutMeEn.html` - 英文版简历
- `js/about.js` - 主应用逻辑，通过 JSONP 加载工作经历
- `js/lifeExperience.js` - 人生时间线数据和渲染
- `css/about.css` / `css/about_en.css` - 自定义简历样式
- `css/mobile.css` / `css/tablet.css` - 响应式断点

## 开发命令

这是一个静态网站，无需构建步骤。开发工作流：

```bash
# 本地服务（任意静态服务器）
python3 -m http.server 8000
# 或
npx http-server -p 8000
```

在浏览器中打开 `http://localhost:8000/aboutMe.html` 或 `aboutMeEn.html`。

## 架构说明

- **国际化**: 使用 `jquery.i18n.properties` 支持中英文切换
- **数据加载**: 工作经历通过 JSONP 动态加载，地址为 `https://about.luomor.com/about/workExperience`
- **响应式设计**: 媒体查询支持手机（≤600px）和平板（601-880px）
- **UI 框架**: Bootflat 2.0.4（基于 Bootstrap 3.3.0 的扁平化设计）
- **浏览器支持**: 包含 HTML5 Shiv 和 Respond.js 以支持 IE6-8

## 演示项目

`demo/` 文件夹包含实验性 UI 组件：
- `vue-timeline/` - Vue 2 时间线组件（npm 包）
- `bootflat.github.io-master/` - Bootflat UI 模板源码
- `wheel-menu/` - 圆形导航菜单
- `css3-circle-menu-app/` - CSS3 动画菜单
- `html5-css3-3d-menu/` - 3D 菜单效果

## 部署

推送到 `gh-pages` 分支后自动部署到 GitHub Pages：

```bash
git checkout gh-pages
git push origin gh-pages
```

## 版本历史

见 `changelog.txt`，提交历史可追溯至 2014 年。使用中文传统提交格式：
- 新功能（New feature）
- Bug（Bug fix）
- 需求变更（Requirement change）
- 重构（Refactor）
- merge（Merge）
