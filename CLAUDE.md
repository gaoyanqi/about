# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal resume website for Chunsheng Zhang (张春生), a full-stack software engineer. Built with HTML5, CSS3, Bootstrap, and jQuery. Hosted on GitHub Pages.

**Site**: https://about.luomor.com  
**Technology Stack**: HTML5, CSS3, Bootstrap 3, jQuery, Bootflat UI

## Project Structure

```
about/
├── aboutMe.html        # Chinese resume (main page)
├── aboutMeEn.html      # English resume
├── index.md            # GitHub Pages index
├── _config.yml         # Jekyll configuration
├── css/                # Stylesheets (Bootstrap, Bootflat, custom)
├── js/                 # JavaScript (i18n, timeline, animations)
│   ├── i18n/           # Internationalization files
│   └── lib/            # Third-party libraries (jQuery, Backbone, Underscore)
├── demo/               # Demo projects and UI components
├── dist/               # Distribution builds
├── docs/               # Resume PDFs and documents
├── fonts/              # Web fonts
├── images/             # Assets and images
└── stylesheets/        # Additional styles
```

## Key Files

- `aboutMe.html` - Main Chinese resume page with navigation (介绍/技能/工作/声明)
- `aboutMeEn.html` - English version of resume
- `js/about.js` - Main application logic, loads work experience via JSONP
- `js/lifeExperience.js` - Life timeline data and rendering
- `css/about.css` / `css/about_en.css` - Custom resume styles
- `css/mobile.css` / `css/tablet.css` - Responsive breakpoints

## Development Commands

This is a static website with no build step. Development workflow:

```bash
# Serve locally (any static server)
python3 -m http.server 8000
# or
npx http-server -p 8000
```

Open `http://localhost:8000/aboutMe.html` or `aboutMeEn.html` in browser.

## Architecture Notes

- **Internationalization**: Uses `jquery.i18n.properties` for CN/EN language support
- **Data Loading**: Work experience loaded dynamically via JSONP from `https://about.luomor.com/about/workExperience`
- **Responsive Design**: Media queries for mobile (≤600px) and tablet (601-880px)
- **UI Framework**: Bootflat 2.0.4 (flat design based on Bootstrap 3.3.0)
- **Browser Support**: Includes HTML5 Shiv and Respond.js for IE6-8

## Demo Projects

The `demo/` folder contains experimental UI components:
- `vue-timeline/` - Vue 2 timeline component (npm package)
- `bootflat.github.io-master/` - Bootflat UI template source
- `wheel-menu/` - Circular navigation menu
- `css3-circle-menu-app/` - CSS3 animated menu
- `html5-css3-3d-menu/` - 3D menu effects

## Deployment

Site deploys automatically to GitHub Pages when pushing to `gh-pages` branch:

```bash
git checkout gh-pages
git push origin gh-pages
```

## Version History

See `changelog.txt` for commit history dating back to 2014. Uses Chinese conventional commit format:
- 新功能 (New feature)
- Bug (Bug fix)
- 需求变更 (Requirement change)
- 重构 (Refactor)
- merge (Merge)
