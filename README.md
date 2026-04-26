# 个人简历网站

张春生的个人简历网站 - HTML5/CSS3 构建的响应式个人主页

## 在线访问

[https://about.luomor.com/aboutMe/aboutMe.html](https://about.luomor.com/aboutMe/aboutMe.html)

## 技术栈

- HTML5 / CSS3
- Bootstrap 3
- jQuery
- Bootflat UI
- jquery.i18n.properties（国际化）

## 项目结构

```
about/
├── aboutMe.html        # 中文简历
├── aboutMeEn.html      # 英文简历
├── css/                # 样式表
├── js/                 # JavaScript
│   ├── i18n/           # 国际化文件
│   └── lib/            # 第三方库
├── demo/               # 演示项目
├── docs/               # 文档（PDF 简历）
├── images/             # 图片资源
└── fonts/              # 字体
```

## 本地开发

```bash
# 使用 Python 启动本地服务
python3 -m http.server 8000

# 或使用 npx
npx http-server -p 8000
```

然后访问 http://localhost:8000/aboutMe.html

## 部署

推送到 `gh-pages` 分支自动部署到 GitHub Pages：

```bash
git checkout gh-pages
git push origin gh-pages
```

## 浏览器支持

- Chrome / Firefox / Safari
- IE6+（使用 HTML5 Shiv 和 Respond.js 兼容）

## 响应式断点

- 手机：≤600px
- 平板：601-880px
- 桌面：>880px

## License

MIT
