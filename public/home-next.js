// Home-page behaviour that used to live in home.js: locale switching, page
// theme, reveal animation, and theme synchronisation with the embedded app.
(function () {
  // Always start on the first pager screen; browsers otherwise restore the
  // last scroll position (which used to land on TRY IT NOW).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var root = document.documentElement;

  // Nav uses JS scrolling so the URL never gains a #demo hash (a stale hash
  // made the browser open on the last pager screen before snapping back).
  document.querySelectorAll('[data-scroll]').forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var target = document.querySelector(element.getAttribute('data-scroll'));
      if (!target) return;
      // Smooth scrolling fights scroll-snap-type: y proximity and visibly
      // jumps between snap points; suspend snapping for the duration.
      var root = document.documentElement;
      var previous = root.style.scrollSnapType;
      root.style.scrollSnapType = 'none';
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var timer = setTimeout(restore, 900);
      function restore() {
        clearTimeout(timer);
        root.style.scrollSnapType = previous;
        if ('onscrollend' in window) window.removeEventListener('scrollend', restore);
      }
      if ('onscrollend' in window) window.addEventListener('scrollend', restore, { once: true });
    });
  });
  var frame = document.querySelector('.demo-app-frame');

  var EN = {
    '所见即所得的 Markdown 编辑器': 'The WYSIWYG Markdown editor',
    '这是 MokiDown 的轻量预览；桌面端提供完整的工作区与编辑体验。':
      'A lightweight preview of MokiDown. The desktop app provides the full workspace and editing experience.',
    '获取桌面版': 'Get the desktop app',
    '继续了解 MokiDown': 'Explore MokiDown',
    '五个部分，都是 MokiDown 的真实能力。': 'Five parts, all real MokiDown capabilities.',
    '查看源代码': 'View source',
    '本地优先、所见即所得的 Markdown 写作工作台。':
      'A local-first, WYSIWYG Markdown writing workspace.',
    桌面端: 'Desktop',
    服务端: 'Server',
    '写下这一刻，': 'Write this moment,',
    '即刻成为好文章。': 'and it becomes a good piece.',
    '输入 Markdown，文字自然成形。标题、强调与引用，就在笔下呈现。':
      'Type Markdown and the text takes shape: headings, emphasis and quotes appear as you write.',
    '落笔即所见，': 'What you write is what you see,',
    '专注每个想法。': 'focused on every idea.',
    'Markdown 源码与实时预览并肩呈现，从第一行文字到完整的创作。':
      'Markdown source and live preview side by side, from the first line to a complete piece.',
    '写作的细节，': 'The details of writing,',
    '也有贴心的帮手。': 'also have a helpful assistant.',
    'Markdown 语言服务辅助链接补全与检查，让文档之间的连接更顺畅。':
      'Markdown language services help complete and check links, keeping documents connected.',
    '白昼或深夜，': 'By day or late at night,',
    '都恰好合心意。': 'it always suits you.',
    '浅深主题、背景与编辑布局，让写作空间成为你喜欢的模样。':
      'Light and dark themes, backgrounds and editor layout make the writing space your own.',
    '让零散灵感，': 'Let scattered ideas',
    '慢慢连成体系。': 'become a system over time.',
    '用文档树与知识树整理笔记，让每个想法都有迹可循。':
      'Organise notes with the document tree and knowledge tree, so every idea can be traced.',
    '切换语言': 'Switch language',
    '切换主题': 'Toggle theme',
    'MokiDown 首页': 'MokiDown home',
    主导航: 'Main navigation',
  };
  var ZH = {};
  Object.keys(EN).forEach(function (key) {
    ZH[EN[key]] = key;
  });

  var locale = localStorage.getItem('mokidown-home-locale') || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en');

  function translate(localeName) {
    var dict = localeName === 'en' ? EN : ZH;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var text = node.nodeValue.trim();
      if (!text || !dict[text]) continue;
      // Keep the demo scenes Chinese; translate the copy column beside them.
      if (node.parentElement && node.parentElement.closest('.feature-block__stage, .feature-scene')) continue;
      node.nodeValue = node.nodeValue.replace(text, dict[text]);
    }
    document.querySelectorAll('[title], [aria-label], [placeholder]').forEach(function (element) {
      ['title', 'aria-label', 'placeholder'].forEach(function (attribute) {
        var value = element.getAttribute(attribute);
        if (value && dict[value]) element.setAttribute(attribute, dict[value]);
      });
    });
    root.lang = localeName === 'en' ? 'en' : 'zh-CN';
  }

  function setLocale(next) {
    locale = next;
    localStorage.setItem('mokidown-home-locale', next);
  

  applyLocaleButton();
    translate(next);
    postLocale(next);
    window.dispatchEvent(new CustomEvent('moki:locale', { detail: next }));
  }

  function postLocale(next) {
    try {
      frame && frame.contentWindow
        ? frame.contentWindow.postMessage({ type: 'moki:locale', locale: next }, '*')
        : null;
    } catch (_) {
      /* iframe not ready */
    }
  }

  var languageButton = document.getElementById('language-toggle');
  function applyLocaleButton() {
    if (!languageButton) return;
    languageButton.dataset.locale = locale;
    var label = locale === 'en' ? 'Switch language' : '切换语言';
    languageButton.setAttribute('aria-label', label);
    languageButton.title = label;
  }

  languageButton?.addEventListener('click', function () {
    languageButton.classList.remove('is-switching');
    void languageButton.offsetWidth;
    languageButton.classList.add('is-switching');
    setLocale(locale === 'zh' ? 'en' : 'zh');
    window.setTimeout(function () {
      languageButton.classList.remove('is-switching');
    }, 520);
  });

  // ---- page theme + embedded app theme ------------------------------------
  var storedTheme = localStorage.getItem('mokidown-home-theme');
  if (storedTheme === 'dark' || storedTheme === 'light') root.dataset.theme = storedTheme;

  function appThemeButton() {
    try {
      return frame && frame.contentDocument
        ? frame.contentDocument.querySelector('.sidebar__footer-btn')
        : null;
    } catch (_) {
      return null;
    }
  }

  function postTheme(next) {
    try {
      if (frame && frame.contentWindow) {
        frame.contentWindow.postMessage({ type: 'moki:theme', theme: next }, '*');
      }
    } catch (_) {
      /* iframe not ready */
    }
  }

  function syncAppToPageTheme() {
    var theme = root.dataset.theme || 'light';
    // Cross-origin iframe (GitHub Pages / OSS): postMessage is the only channel.
    postTheme(theme);
    try {
      var doc = frame && frame.contentDocument;
      if (doc && doc.documentElement.dataset.theme !== theme) appThemeButton()?.click();
    } catch (_) {
      /* cross-origin */
    }
  }

  document.getElementById('theme-toggle')?.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('mokidown-home-theme', next);
    syncAppToPageTheme();
  });

  function watchAppTheme() {
    try {
      var doc = frame && frame.contentDocument;
      if (!doc) return;
      var observer = new MutationObserver(function () {
        var theme = doc.documentElement.dataset.theme;
        if ((theme === 'dark' || theme === 'light') && theme !== root.dataset.theme) {
          root.dataset.theme = theme;
          localStorage.setItem('mokidown-home-theme', theme);
        }
      });
      observer.observe(doc.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    } catch (_) {
      /* cross-origin: the in-app toggle cannot notify the page */
    }
  }

  if (frame) {
    frame.addEventListener('load', function () {
      syncAppToPageTheme();
      watchAppTheme();
      postLocale(locale);
    });
  }

  // ---- reveal animation ---------------------------------------------------
  var observer = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i += 1) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          observer.unobserve(entries[i].target);
        }
      }
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('[data-reveal]').forEach(function (block) {
    observer.observe(block);
  });

  // Hold the viewport at the top until React has rendered all pager screens,
  // then jump straight to the first screen and release the lock.
  var bootLock = window.setInterval(function () {
    if (window.scrollY !== 0) window.scrollTo(0, 0);
  }, 30);
  var bootDone = false;
  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    window.clearInterval(bootLock);
    var first = document.querySelector('.feature-block-host');
    var top = first ? first.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({ top: top, left: 0, behavior: 'instant' });
    window.setTimeout(function () {
      document.documentElement.classList.remove('is-booting');
    }, 60);
  }
  var bootCheck = window.setInterval(function () {
    if (document.querySelectorAll('.feature-block-host').length >= 5) {
      window.clearInterval(bootCheck);
      finishBoot();
    }
  }, 50);
  window.setTimeout(function () {
    window.clearInterval(bootCheck);
    finishBoot();
  }, 8000);

  applyLocaleButton();
  translate(locale);
  // React renders the carousel after this script; re-apply to the static page
  // once more so a saved English locale is honoured on first load.
  window.setTimeout(function () {
    translate(locale);
  }, 700);
})();
