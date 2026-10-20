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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  var storedTheme;
  try { storedTheme = localStorage.getItem('mokidown-home-theme'); } catch (_) {}
  if (storedTheme === 'dark' || storedTheme === 'light') root.dataset.theme = storedTheme;

  var themeRequest = 0;
  var pendingTheme = null;
  var messageThemeBridge = false;
  var appThemeObserver;
  function postTheme(next) {
    try {
      if (frame && frame.contentWindow) {
        pendingTheme = next;
        frame.contentWindow.postMessage({ type: 'moki:theme', theme: next, requestId: ++themeRequest }, '*');
      }
    } catch (_) {
      /* iframe not ready */
    }
  }

  function syncAppToPageTheme() {
    postTheme(root.dataset.theme || 'light');
    // Set a target theme. Clicking the iframe toggle also starts an asynchronous
    // View Transition, which can invert a theme already applied by postMessage.
  }

  window.addEventListener('message', function (event) {
    if (!frame || event.source !== frame.contentWindow) return;
    var data = event.data;
    if (data?.type === 'moki:theme-ready') {
      messageThemeBridge = true;
      appThemeObserver?.disconnect();
      syncAppToPageTheme();
    } else if (data?.type === 'moki:theme-changed' && (data.theme === 'dark' || data.theme === 'light')) {
      if (data.requestId !== undefined && data.requestId !== themeRequest) return;
      if (pendingTheme && data.theme !== pendingTheme) return;
      pendingTheme = null;
      root.dataset.theme = data.theme;
      try { localStorage.setItem('mokidown-home-theme', data.theme); } catch (_) {}
    }
  });

  document.getElementById('theme-toggle')?.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('mokidown-home-theme', next); } catch (_) {}
    syncAppToPageTheme();
  });

  function watchAppTheme() {
    try {
      var doc = frame && frame.contentDocument;
      if (!doc || messageThemeBridge) return;
      appThemeObserver?.disconnect();
      if (doc.documentElement.dataset.theme === root.dataset.theme) pendingTheme = null;
      appThemeObserver = new MutationObserver(function () {
        var theme = doc.documentElement.dataset.theme;
        if (pendingTheme && theme !== pendingTheme) return;
        if (theme === pendingTheme) pendingTheme = null;
        if ((theme === 'dark' || theme === 'light') && theme !== root.dataset.theme) {
          root.dataset.theme = theme;
          try { localStorage.setItem('mokidown-home-theme', theme); } catch (_) {}
        }
      });
      appThemeObserver.observe(doc.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
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

  // Let the first user scroll proceed without delayed boot/load resets.
  root.classList.remove('is-booting');

  applyLocaleButton();
  translate(locale);
  // React renders the carousel after this script; re-apply to the static page
  // once more so a saved English locale is honoured on first load.
  window.setTimeout(function () {
    translate(locale);
  }, 700);
})();
