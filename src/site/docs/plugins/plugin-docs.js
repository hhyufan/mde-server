(function () {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const langButton = document.getElementById('lang-toggle');

  // ── Theme ────────────────────────────────────────────────────────────────
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  setTheme(root.dataset.theme);
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('mokidown-home-theme', theme); } catch {}
  });

  // ── Language ────────────────────────────────────────────────────────────
  const applyLang = (lang) => {
    root.lang = lang;
    document.querySelectorAll('[data-zh]').forEach((el) => {
      const value = lang === 'zh-CN' ? el.dataset.zh : el.dataset.en;
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-ph-zh]').forEach((el) => {
      el.placeholder = lang === 'zh-CN' ? el.dataset.phZh : el.dataset.phEn;
    });
    langButton.dataset.locale = lang === 'zh-CN' ? 'zh' : 'en';
    langButton.setAttribute('aria-label', lang === 'zh-CN' ? 'Switch to English' : '切换到中文');
  };
  applyLang(root.lang === 'en-US' ? 'en-US' : 'zh-CN');
  langButton.addEventListener('click', () => {
    const next = root.lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    applyLang(next);
    try { localStorage.setItem('mokidown-docs-lang', next); } catch {}
  });

  // ── Mobile menu ─────────────────────────────────────────────────────────
  const sidebar = document.querySelector('.docs-sidebar');
  const menu = document.getElementById('menu-toggle');
  menu.addEventListener('click', () => {
    const open = sidebar.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });

  const links = [...document.querySelectorAll('.docs-sidebar nav a')];
  for (const link of links) {
    link.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
    });
  }

  // ── Scroll spy ──────────────────────────────────────────────────────────
  const sections = [...document.querySelectorAll('[data-section]')];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    for (const link of links) {
      const active = link.hash === '#' + visible.target.id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-100px 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));

  // ── Search ──────────────────────────────────────────────────────────────
  const search = document.getElementById('docs-search');
  const results = document.getElementById('search-results');
  search.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    results.replaceChildren();
    results.hidden = !query;
    if (!query) return;
    const matches = sections.filter((section) => section.textContent.toLowerCase().includes(query));
    const count = document.createElement('p');
    count.textContent = root.lang === 'zh-CN' ? `找到 ${matches.length} 个相关章节` : `${matches.length} matching section(s)`;
    results.append(count);
    for (const section of matches) {
      const link = document.createElement('a');
      link.href = '#' + section.id;
      link.textContent = section.querySelector('h1,h2').textContent;
      link.addEventListener('click', () => {
        sidebar.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
      });
      results.append(link);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName)) {
      event.preventDefault();
      sidebar.classList.add('is-open');
      menu.setAttribute('aria-expanded', 'true');
      search.focus();
    }
    if (event.key === 'Escape') {
      sidebar.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      search.blur();
    }
  });

  // ── API filter ──────────────────────────────────────────────────────────
  const apiFilter = document.getElementById('api-filter');
  apiFilter.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    let count = 0;
    for (const card of document.querySelectorAll('.api-card')) {
      card.hidden = !card.textContent.toLowerCase().includes(query);
      if (!card.hidden) count += 1;
    }
    document.getElementById('api-empty').hidden = count !== 0;
  });

  // ── Copy buttons ────────────────────────────────────────────────────────
  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-block').querySelector('code');
      const label = root.lang === 'zh-CN' ? '复制' : 'Copy';
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = root.lang === 'zh-CN' ? '已复制' : 'Copied';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        button.textContent = root.lang === 'zh-CN' ? '已选中代码' : 'Selected';
      }
      setTimeout(() => { button.textContent = label; }, 1600);
    });
  }

  // ── Syntax highlighting (static examples only) ───────────────────────────
  for (const code of document.querySelectorAll('pre code')) {
    const text = code.textContent;
    const parts = text.split(/(\/\/[^\n]*|'[^'\n]*'|"[^"\n]*"|\b(?:import|from|const|let|await|async|return|if|new|true|false)\b)/g);
    code.replaceChildren(...parts.map((part) => {
      if (!part) return document.createTextNode('');
      const span = document.createElement('span');
      span.textContent = part;
      if (part.startsWith('//')) span.className = 'token-comment';
      else if (/^['"]/.test(part)) span.className = 'token-string';
      else if (/^(import|from|const|let|await|async|return|if|new|true|false)$/.test(part)) span.className = 'token-keyword';
      return span;
    }));
  }
})();
