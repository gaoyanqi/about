(function() {
    'use strict';

    var STORAGE_KEY = 'resume-theme';
    var root = document.documentElement;

    function isValidTheme(theme) {
        return theme === 'light' || theme === 'dark';
    }

    function getStoredTheme() {
        try {
            var theme = window.localStorage.getItem(STORAGE_KEY);
            return isValidTheme(theme) ? theme : null;
        } catch(error) {
            return null;
        }
    }

    function getSystemTheme() {
        if(!window.matchMedia) {
            return 'light';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function getTheme() {
        return isValidTheme(root.dataset.theme) ? root.dataset.theme : getSystemTheme();
    }

    function updateButtons() {
        var isDark = getTheme() === 'dark';
        var isChinese = document.documentElement.lang.toLowerCase().indexOf('zh') === 0;
        var label = isDark
            ? (isChinese ? '切换到亮色主题' : 'Switch to light theme')
            : (isChinese ? '切换到暗色主题' : 'Switch to dark theme');
        var buttons = document.querySelectorAll('.theme-toggle');

        for(var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('aria-label', label);
            buttons[i].setAttribute('title', label);
        }
    }

    function applyTheme(theme) {
        if(!isValidTheme(theme)) {
            return;
        }

        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        root.style.backgroundColor = theme === 'dark' ? '#0d1b2a' : '#f5f7fb';

        var themeColor = document.querySelector('meta[name="theme-color"]');
        if(themeColor) {
            themeColor.setAttribute('content', theme === 'dark' ? '#0d1b2a' : '#f5f7fb');
        }

        updateButtons();
    }

    function setTheme(theme) {
        if(!isValidTheme(theme)) {
            return;
        }

        applyTheme(theme);
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch(error) {
            // The selected theme still works when storage is unavailable.
        }
    }

    function toggleTheme() {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    }

    function init() {
        applyTheme(getTheme());

        var buttons = document.querySelectorAll('.theme-toggle');
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', toggleTheme);
        }

        if(window.matchMedia) {
            var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
            var handleSystemTheme = function(event) {
                if(!getStoredTheme()) {
                    applyTheme(event.matches ? 'dark' : 'light');
                }
            };

            if(systemTheme.addEventListener) {
                systemTheme.addEventListener('change', handleSystemTheme);
            } else if(systemTheme.addListener) {
                systemTheme.addListener(handleSystemTheme);
            }
        }

        window.addEventListener('storage', function(event) {
            if(event.key === STORAGE_KEY) {
                applyTheme(isValidTheme(event.newValue) ? event.newValue : getSystemTheme());
            }
        });
    }

    window.ResumeTheme = {
        getTheme: getTheme,
        setTheme: setTheme,
        toggleTheme: toggleTheme
    };

    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
