(() => {
  'use strict';

  const originals = {
    welcome: {
      name: '欢迎.md',
      content: [
        '# 欢迎使用 MDE',
        '',
        '> 这是一个可以真正编辑的迷你工作台。试着修改左侧内容，预览会立即更新。',
        '',
        '## 写作，从专注开始',
        '',
        'MDE 把 **可靠保存**、*实时预览* 和 `Markdown` 工具放进一个安静的工作区。',
        '',
        '- [x] 在本地安心写作',
        '- [x] 用分屏确认排版',
        '- [ ] 发布下一篇文章',
        '',
        '```javascript',
        "const idea = '保持简单，持续写作';",
        'console.log(idea);',
        '```',
        '',
        '你也可以切换上方的 **编辑 / 分屏 / 预览** 模式。',
      ].join('\n'),
    },
    features: {
      name: '功能速览.md',
      content: [
        '# 功能速览',
        '',
        'MDE 为日常 Markdown 工作流提供一套完整但克制的工具。',
        '',
        '| 能力 | 体验 |',
        '| --- | --- |',
        '| 工作区 | 文件树与多标签编辑 |',
        '| 预览 | GFM、代码块、表格与图表 |',
        '| 安全 | 原子保存与恢复快照 |',
        '| 同步 | 可选云同步与冲突处理 |',
        '',
        '## 设计原则',
        '',
        '1. 内容始终属于用户',
        '2. 复杂能力按需出现',
        '3. 每个状态都清晰可见',
        '',
        '==现在就修改这段文字，看看预览效果。==',
      ].join('\n'),
    },
    shortcuts: {
      name: '快捷键.md',
      content: [
        '# 常用快捷键',
        '',
        '| 操作 | Windows / Linux | macOS |',
        '| --- | --- | --- |',
        '| 粗体 | Ctrl + B | ⌘ + B |',
        '| 斜体 | Ctrl + I | ⌘ + I |',
        '| 保存 | Ctrl + S | ⌘ + S |',
        '| 搜索 | Ctrl + K | ⌘ + K |',
        '',
        '> 提示：这个演示编辑器已经支持粗体、斜体和模拟保存快捷键。',
        '',
        '## 今日计划',
        '',
        '- [x] 整理素材',
        '- [ ] 完成初稿',
        '- [ ] 校对并发布',
      ].join('\n'),
    },
  };

  const documents = JSON.parse(JSON.stringify(originals));
  const input = document.querySelector('#markdown-input');
  const preview = document.querySelector('#markdown-preview');
  const workspace = document.querySelector('#workspace');
  const frame = document.querySelector('#demo-frame');
  const dirtyDot = document.querySelector('#dirty-dot');
  const saveState = document.querySelector('#save-state');
  const tabName = document.querySelector('#tab-name');
  const footerFileName = document.querySelector('#footer-file-name');
  const cursorStatus = document.querySelector('#cursor-status');
  const wordStatus = document.querySelector('#word-status');
  const sourceHighlight = document.querySelector('#markdown-highlight');
  const lineNumbers = document.querySelector('#line-numbers');
  const activeLine = document.querySelector('#monaco-active-line');
  const formatToolbar = document.querySelector('#format-toolbar');
  const splitToggle = document.querySelector('#split-toggle');
  const modeToggle = document.querySelector('#mode-toggle');
  const demoFooter = document.querySelector('.demo-footer');
  const toast = document.querySelector('#toast');
  let currentDocument = 'welcome';
  let viewMode = 'split';
  let renderTimer = 0;
  let saveTimer = 0;
  let toastTimer = 0;

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const codeKeywords = new Set(['as', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return', 'static', 'switch', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']);
  const codeConstants = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity', 'this']);

  function highlightCode(source) {
    const matcher = /(["'`])(?:\\.|(?!\1).)*\1|\/\/.*|\/\*[\s\S]*?\*\/|\b[A-Za-z_$][\w$]*\b|\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b|(?:=>|===?|!==?|\+\+|--|&&|\|\||[+*/%<>?:~-])/gi;
    let html = '';
    let cursor = 0;
    for (const match of source.matchAll(matcher)) {
      html += escapeHtml(source.slice(cursor, match.index));
      const token = match[0];
      let kind = '';
      if (/^(?:\/\/|\/\*)/.test(token)) kind = 'comment';
      else if (/^["'`]/.test(token)) kind = 'string';
      else if (/^(?:0x[\da-f]+|\d)/i.test(token)) kind = 'number';
      else if (codeKeywords.has(token)) kind = 'keyword';
      else if (codeConstants.has(token)) kind = 'constant';
      else if (/^[A-Za-z_$]/.test(token)) {
        const tail = source.slice((match.index || 0) + token.length);
        kind = /^\s*\(/.test(tail) ? 'function' : 'name';
      } else kind = 'operator';
      html += `<span class="tok-${kind}">${escapeHtml(token)}</span>`;
      cursor = (match.index || 0) + token.length;
    }
    return html + escapeHtml(source.slice(cursor));
  }

  function highlightMarkdownInline(source) {
    const matcher = /`[^`]*`|\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*|\[[^\]]+\]\([^)]+\)/g;
    let html = '';
    let cursor = 0;
    for (const match of source.matchAll(matcher)) {
      html += escapeHtml(source.slice(cursor, match.index));
      const token = match[0];
      const kind = token.startsWith('`') ? 'code' : token.startsWith('[') ? 'link' : token.startsWith('**') || token.startsWith('__') ? 'strong' : 'emphasis';
      html += `<span class="tok-${kind}">${escapeHtml(token)}</span>`;
      cursor = (match.index || 0) + token.length;
    }
    return html + escapeHtml(source.slice(cursor));
  }

  function highlightMarkdownSource(source) {
    let fenced = false;
    return source.replace(/\r\n?/g, '\n').split('\n').map((line) => {
      const fence = line.match(/^(\s*```)(.*)$/);
      if (fence) {
        fenced = !fenced;
        return `<span class="tok-markup">${escapeHtml(fence[1])}</span><span class="tok-name">${escapeHtml(fence[2])}</span>`;
      }
      if (fenced) return highlightCode(line);
      const heading = line.match(/^(\s*)(#{1,6}\s+)(.*)$/);
      if (heading) return `${escapeHtml(heading[1])}<span class="tok-markup">${escapeHtml(heading[2])}</span><span class="tok-heading">${highlightMarkdownInline(heading[3])}</span>`;
      const quote = line.match(/^(\s*)(>\s?)(.*)$/);
      if (quote) return `${escapeHtml(quote[1])}<span class="tok-markup">${escapeHtml(quote[2])}</span><span class="tok-comment">${highlightMarkdownInline(quote[3])}</span>`;
      const list = line.match(/^(\s*)((?:[-*+] |\d+\. )(?:\[[ xX]\]\s*)?)(.*)$/);
      if (list) return `${escapeHtml(list[1])}<span class="tok-markup">${escapeHtml(list[2])}</span>${highlightMarkdownInline(list[3])}`;
      if (/^\s*\|?\s*:?-{3,}/.test(line)) return `<span class="tok-punctuation">${escapeHtml(line)}</span>`;
      return highlightMarkdownInline(line);
    }).join('\n');
  }

  function inlineMarkdown(value) {
    const codeTokens = [];
    let html = escapeHtml(value).replace(/`([^`]+)`/g, (_, code) => {
      const token = `%%MDECODE${codeTokens.length}%%`;
      codeTokens.push(`<code>${code}</code>`);
      return token;
    });
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, rawUrl) => {
      const url = rawUrl.trim();
      const safe = /^(https?:\/\/|#)/i.test(url) ? url : '#';
      return `<a href="${safe}" target="_blank" rel="noreferrer">${label}</a>`;
    });
    html = html
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/~~([^~]+)~~/g, '<del>$1</del>')
      .replace(/==([^=]+)==/g, '<mark>$1</mark>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    codeTokens.forEach((code, index) => {
      html = html.replace(`%%MDECODE${index}%%`, code);
    });
    return html;
  }

  const isTableDivider = (line) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const isBlockStart = (line, next) => /^\s*(#{1,6}\s|>|[-*+]\s|\d+\.\s|```|---\s*$)/.test(line) || (line.includes('|') && isTableDivider(next || ''));
  const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());

  function renderMarkdown(source) {
    const lines = source.replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    let index = 0;

    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) { index += 1; continue; }

      const fence = line.match(/^\s*```\s*([\w-]*)/);
      if (fence) {
        const code = [];
        index += 1;
        while (index < lines.length && !/^\s*```/.test(lines[index])) code.push(lines[index++]);
        if (index < lines.length) index += 1;
        const language = fence[1] || 'text';
        const highlighted = /^(?:js|jsx|ts|tsx|javascript|typescript|json)$/i.test(language) ? highlightCode(code.join('\n')) : escapeHtml(code.join('\n'));
        output.push(`<pre class="shiki" data-language="${escapeHtml(language)}"><code>${highlighted}</code></pre>`);
        continue;
      }

      if (line.includes('|') && isTableDivider(lines[index + 1] || '')) {
        const headers = cells(line);
        const rows = [];
        index += 2;
        while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(cells(lines[index++]));
        output.push(`<table><thead><tr>${headers.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }

      const heading = line.match(/^\s*(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        index += 1;
        continue;
      }

      if (/^\s*---\s*$/.test(line)) { output.push('<hr>'); index += 1; continue; }

      if (/^\s*>/.test(line)) {
        const quote = [];
        while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ''));
        output.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line)) {
        const items = [];
        let taskList = false;
        while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
          const raw = lines[index++].replace(/^\s*[-*+]\s+/, '');
          const task = raw.match(/^\[([ xX])\]\s*(.*)$/);
          if (task) {
            taskList = true;
            items.push(`<li class="task-item"><input type="checkbox" disabled ${task[1].toLowerCase() === 'x' ? 'checked' : ''}><span>${inlineMarkdown(task[2])}</span></li>`);
          } else {
            items.push(`<li>${inlineMarkdown(raw)}</li>`);
          }
        }
        output.push(`<ul${taskList ? ' class="task-list"' : ''}>${items.join('')}</ul>`);
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) items.push(`<li>${inlineMarkdown(lines[index++].replace(/^\s*\d+\.\s+/, ''))}</li>`);
        output.push(`<ol>${items.join('')}</ol>`);
        continue;
      }

      const paragraph = [line.trim()];
      index += 1;
      while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index], lines[index + 1])) paragraph.push(lines[index++].trim());
      output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    }

    preview.innerHTML = output.join('');
  }

  function updateMetrics() {
    const before = input.value.slice(0, input.selectionStart);
    const lines = before.split('\n');
    cursorStatus.textContent = `Ln ${lines.length}, Col ${lines.at(-1).length + 1}`;
    wordStatus.textContent = `${input.value.length} 字符`;
    const activeIndex = lines.length - 1;
    activeLine.style.transform = `translateY(${activeIndex * 21 - input.scrollTop}px)`;
  }

  function updateSourceLayer() {
    const lines = input.value.replace(/\r\n?/g, '\n').split('\n');
    sourceHighlight.innerHTML = `${highlightMarkdownSource(input.value)}\n`;
    lineNumbers.innerHTML = lines.map((_, index) => `<span>${index + 1}</span>`).join('');
    sourceHighlight.scrollTop = input.scrollTop;
    sourceHighlight.scrollLeft = input.scrollLeft;
    lineNumbers.style.transform = `translateY(${-input.scrollTop}px)`;
    updateMetrics();
  }

  function queueRender() {
    updateSourceLayer();
    window.clearTimeout(renderTimer);
    renderTimer = window.setTimeout(() => renderMarkdown(input.value), 60);
  }

  function markEditing() {
    documents[currentDocument].content = input.value;
    dirtyDot.classList.add('visible');
    saveState.textContent = '编辑中…';
    saveState.style.color = 'var(--accent)';
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      dirtyDot.classList.remove('visible');
      saveState.textContent = '已保存';
      saveState.style.color = '';
    }, 700);
  }

  function loadDocument(key) {
    currentDocument = key;
    input.value = documents[key].content;
    tabName.textContent = documents[key].name;
    footerFileName.textContent = documents[key].name;
    document.querySelectorAll('.file-item[data-document]').forEach((item) => item.classList.toggle('active', item.dataset.document === key));
    dirtyDot.classList.remove('visible');
    saveState.textContent = '已保存';
    renderMarkdown(input.value);
    updateSourceLayer();
  }

  function notify(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 1800);
  }

  function applyFormat(type) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = input.value.slice(start, end);
    let replacement = selected;
    let cursorOffset = 0;
    if (type === 'heading') {
      const lineStart = input.value.lastIndexOf('\n', start - 1) + 1;
      input.setSelectionRange(lineStart, end);
      replacement = `## ${input.value.slice(lineStart, end) || '标题'}`;
      cursorOffset = replacement.length;
    } else if (type === 'quote') { replacement = `> ${selected || '引用内容'}`; cursorOffset = replacement.length; }
    else if (type === 'bold') { replacement = `**${selected || '粗体文字'}**`; cursorOffset = selected ? replacement.length : 2; }
    else if (type === 'italic') { replacement = `*${selected || '斜体文字'}*`; cursorOffset = selected ? replacement.length : 1; }
    else if (type === 'code') { replacement = `\`${selected || 'code'}\``; cursorOffset = selected ? replacement.length : 1; }
    else if (type === 'link') { replacement = `[${selected || '链接文字'}](https://example.com)`; cursorOffset = replacement.length; }
    input.setRangeText(replacement, input.selectionStart, input.selectionEnd, 'end');
    if (cursorOffset) input.setSelectionRange(input.selectionStart, input.selectionStart);
    input.focus();
    markEditing();
    queueRender();
    updateMetrics();
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#121212' : '#f5f5f7';
  }

  function updateViewMode(nextMode) {
    viewMode = nextMode;
    workspace.className = `workspace mode-${viewMode}`;
    splitToggle.classList.toggle('active', viewMode === 'split');
    modeToggle.classList.toggle('active', viewMode === 'preview');
    demoFooter.classList.toggle('previewing', viewMode === 'preview');
    modeToggle.title = viewMode === 'preview' ? '返回源码编辑' : '切换到预览';
  }

  async function checkStatus() {
    const overall = document.querySelector('#overall-status');
    const dot = document.querySelector('#overall-dot');
    const button = document.querySelector('#refresh-status');
    button.disabled = true;
    button.textContent = '检测中…';
    dot.className = 'live-dot';
    overall.textContent = '正在检测';
    const started = performance.now();
    try {
      const response = await fetch('/health', { cache: 'no-store', headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('status request failed');
      const data = await response.json();
      const latency = Math.max(1, Math.round(performance.now() - started));
      const healthy = data.status === 'operational';
      dot.className = `live-dot ${healthy ? 'online' : 'offline'}`;
      overall.textContent = healthy ? '所有公开服务运行正常' : '部分服务状态异常';
      setStatusValue('api-status', data.services?.api === 'operational' ? '运行正常' : '不可用', data.services?.api === 'operational');
      setStatusValue('database-status', databaseLabel(data.services?.database), data.services?.database === 'connected');
      document.querySelector('#version-status').textContent = `v${String(data.version || '—')}`;
      document.querySelector('#latency-status').textContent = `${latency} ms`;
      document.querySelector('#status-time').textContent = new Date(data.checkedAt || Date.now()).toLocaleTimeString('zh-CN', { hour12: false });
    } catch {
      dot.className = 'live-dot offline';
      overall.textContent = '暂时无法连接服务';
      setStatusValue('api-status', '不可用', false);
      setStatusValue('database-status', '未知', false);
      document.querySelector('#latency-status').textContent = '—';
      document.querySelector('#status-time').textContent = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    } finally {
      button.disabled = false;
      button.textContent = '重新检测';
    }
  }

  function databaseLabel(state) {
    return ({ connected: '连接正常', connecting: '正在连接', disconnecting: '正在断开', disconnected: '未连接' })[state] || '未知';
  }

  function setStatusValue(id, label, healthy) {
    const element = document.querySelector(`#${id}`);
    element.textContent = label;
    element.className = healthy ? 'ok' : 'bad';
  }

  input.addEventListener('input', () => { markEditing(); queueRender(); });
  input.addEventListener('click', updateMetrics);
  input.addEventListener('keyup', updateMetrics);
  input.addEventListener('scroll', () => {
    sourceHighlight.scrollTop = input.scrollTop;
    sourceHighlight.scrollLeft = input.scrollLeft;
    lineNumbers.style.transform = `translateY(${-input.scrollTop}px)`;
    updateMetrics();
  });
  input.addEventListener('keydown', (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;
    const shortcut = event.key.toLowerCase();
    if (shortcut === 'b' || shortcut === 'i') { event.preventDefault(); applyFormat(shortcut === 'b' ? 'bold' : 'italic'); }
    if (shortcut === 's') { event.preventDefault(); dirtyDot.classList.remove('visible'); saveState.textContent = '已保存'; notify('演示文档已在当前页面保存'); }
  });

  document.querySelectorAll('.file-item[data-document]').forEach((item) => item.addEventListener('click', () => loadDocument(item.dataset.document)));
  splitToggle.addEventListener('click', () => updateViewMode(viewMode === 'split' ? 'edit' : 'split'));
  modeToggle.addEventListener('click', () => updateViewMode(viewMode === 'preview' ? 'edit' : 'preview'));
  document.querySelector('#toolbar-toggle').addEventListener('click', (event) => {
    const visible = formatToolbar.classList.toggle('ft--show');
    event.currentTarget.classList.toggle('active', visible);
  });
  document.querySelectorAll('.format-toolbar button').forEach((button) => button.addEventListener('click', () => applyFormat(button.dataset.format)));
  document.querySelectorAll('.segment button').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.segment button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    if (button.textContent === '大纲') notify('完整桌面版会在这里生成文档大纲');
  }));
  document.querySelectorAll('.js-sidebar-toggle').forEach((button) => button.addEventListener('click', () => document.querySelector('#demo-sidebar').classList.toggle('hidden')));
  document.querySelector('#reset-demo').addEventListener('click', () => {
    Object.keys(originals).forEach((key) => { documents[key].content = originals[key].content; });
    loadDocument(currentDocument);
    notify('演示内容已恢复');
  });
  document.querySelector('.tab-close').addEventListener('click', () => notify('这是产品演示，标签页会保持打开'));
  document.querySelector('#theme-toggle').addEventListener('click', toggleTheme);
  document.querySelector('#demo-theme-toggle').addEventListener('click', toggleTheme);
  document.querySelector('#refresh-status').addEventListener('click', checkStatus);
  document.querySelector('#copy-endpoint').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(window.location.origin); notify('服务地址已复制'); }
    catch { notify(`服务地址：${window.location.origin}`); }
  });

  const divider = document.querySelector('#split-divider');
  divider.addEventListener('pointerdown', (event) => {
    divider.setPointerCapture(event.pointerId);
    divider.classList.add('dragging');
  });
  divider.addEventListener('pointermove', (event) => {
    if (!divider.hasPointerCapture(event.pointerId)) return;
    const bounds = workspace.getBoundingClientRect();
    const mobile = window.matchMedia('(max-width: 680px)').matches;
    const ratio = mobile ? (event.clientY - bounds.top) / bounds.height : (event.clientX - bounds.left) / bounds.width;
    workspace.style.setProperty('--split', `${Math.min(72, Math.max(28, ratio * 100))}%`);
  });
  const stopDragging = (event) => {
    if (divider.hasPointerCapture(event.pointerId)) divider.releasePointerCapture(event.pointerId);
    divider.classList.remove('dragging');
  };
  divider.addEventListener('pointerup', stopDragging);
  divider.addEventListener('pointercancel', stopDragging);

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark';
  if (window.matchMedia('(max-width: 680px)').matches) document.querySelector('#demo-sidebar').classList.add('hidden');
  updateViewMode('split');
  loadDocument('welcome');
  checkStatus();
})();
