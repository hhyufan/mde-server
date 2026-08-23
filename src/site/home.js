(() => {
  'use strict';

  const staticEnglish = {
    '在线体验': 'Live Demo', '核心能力': 'Features', '服务状态': 'Service Status',
    '为 Markdown 写作者而生': 'Made for Markdown writers',
    '写作应该专注于内容，': 'Writing should stay focused on the content,', '其余交给 MDE。': 'leave the rest to MDE.',
    'MDE 将本地优先的可靠性、顺滑的实时预览和克制的桌面体验放在同一个工作台里。': 'MDE brings local-first reliability, fluid live preview, and a focused desktop experience into one workspace.',
    '立即体验': 'Try it now', '获取桌面版': 'Get the desktop app', '本地优先': 'Local first', '跨平台': 'Cross-platform', '开源': 'Open source', '随笔.md': 'Notes.md',
    '一个真正可以编辑的 MDE': 'A genuinely interactive MDE',
    '切换文件、输入 Markdown 或拖动分隔条。这里的内容只在当前页面渲染，不会保存或上传。': 'Switch files, type Markdown, or drag the divider. Everything renders locally in this page and is never saved or uploaded.',
    'Markdown 编辑器': 'Markdown Editor', '文件': 'Files', '大纲': 'Outline', '最近': 'Recent', '最近文件': 'Recent Files',
    '登录': 'Sign in', '搜索文件...': 'Search files...', '欢迎.md': 'Welcome.md', '功能速览.md': 'Feature Tour.md', '快捷键.md': 'Shortcuts.md',
    '使用指南.md': 'Guide.md', '代码高亮.md': 'Code Highlighting.md', '表格示例.md': 'Table Example.md', '每日记录.md': 'Daily Notes.md', '灵感.md': 'Ideas.md',
    '从第一行到最后一次保存': 'From the first line to the final save', '每项能力都服务于更可靠、更安静的写作过程。': 'Every feature serves a calmer, more reliable writing process.',
    '本地优先，不打断思路': 'Local first, without breaking your flow', '文件保留在你的工作区。原子保存与恢复快照共同保护每一次修改。': 'Files stay in your workspace. Atomic saves and recovery snapshots protect every edit.',
    '保存完成': 'Saved', '双编辑体验': 'Two editing experiences', '源码、所见即所得与实时预览随时切换。': 'Move freely between source, rich editing, and live preview.',
    '源码': 'Source', '分屏': 'Split', '预览': 'Preview', '为长文档准备': 'Ready for long documents', '大纲、搜索、代码块与 Mermaid 按需工作，复杂文档依旧轻快。': 'Outline, search, code blocks, and Mermaid load as needed to keep complex documents responsive.',
    '可选的安全同步': 'Optional secure sync', '需要跨设备时再开启。冲突可见、状态透明，始终由你决定保留哪个版本。': 'Enable it only when you need multiple devices. Conflicts stay visible and you decide which version to keep.',
    '桌面端': 'Desktop', '加密认证': 'Secure auth', '云端': 'Cloud', '同步服务，清晰可见': 'A sync service you can inspect',
    '页面实时检测公开服务状态，只呈现健康枚举和版本，不暴露数据库地址、凭据、用户数据或内部环境信息。': 'This page checks public service health in real time and shows only safe status and version data—never database addresses, credentials, user data, or internal environment details.',
    '重新检测': 'Check again', '复制服务地址': 'Copy service URL', '正在检测': 'Checking', '检测中': 'Checking', 'API 服务': 'API Service', '当前版本': 'Current Version', '响应耗时': 'Response Time',
    '准备好写下下一篇了吗？': 'Ready to write the next one?', '下载 MDE，或者从源代码开始了解它。': 'Download MDE or explore it from the source.', '获取 MDE': 'Get MDE', '查看源代码': 'View source',
    '专注、可靠的 Markdown 工作台。': 'A focused, reliable Markdown workspace.', '服务端': 'Server',
    '本地': 'Local', '未找到标题。': 'No headings found.', '输入文件名并回车': 'Enter a file name and press Enter', '新文件名': 'New file name',
    '所有公开服务运行正常': 'All public services are operational', '部分服务状态异常': 'Some services are degraded', '暂时无法连接服务': 'Service is temporarily unavailable',
    '运行正常': 'Operational', '不可用': 'Unavailable', '未知': 'Unknown', '连接正常': 'Connected', '正在连接': 'Connecting', '正在断开': 'Disconnecting', '未连接': 'Disconnected',
    '排序': 'Sort', '新建文件': 'New file', '保存': 'Save', '打开文件夹 / 恢复演示': 'Open folder / reset demo', '后退': 'Back', '前进': 'Forward', '上一级': 'Up', '刷新': 'Refresh', '在资源管理器中打开': 'Open in Explorer', '关闭文件夹': 'Close folder',
    '全部折叠': 'Collapse all', '全部展开': 'Expand all', '统计': 'Statistics', '清空': 'Clear', '切换编辑器主题': 'Toggle editor theme', '检查更新': 'Check for updates', '设置': 'Settings',
    '显示或隐藏侧栏': 'Show or hide sidebar', '窗口控制': 'Window controls', '最小化': 'Minimize', '最大化': 'Maximize', '关闭': 'Close', '向左滚动': 'Scroll left', '向右滚动': 'Scroll right', '关闭标签': 'Close tab', '标签栏动作': 'Tab actions', '切换工具栏': 'Toggle toolbar', '书签': 'Bookmark',
    'Markdown 格式工具栏': 'Markdown formatting toolbar', '拖动工具栏': 'Drag toolbar', '粗体': 'Bold', '斜体': 'Italic', '删除线': 'Strikethrough', '标题': 'Heading', '引用': 'Quote', '表格': 'Table', '代码块': 'Code block', '链接': 'Link', '图片': 'Image', '任务列表': 'Task list', '分隔线': 'Divider', '收起工具栏': 'Hide toolbar',
    'Markdown 实时预览': 'Markdown live preview', '拖动调整分栏': 'Drag to resize panes', '切换侧栏': 'Toggle sidebar', '关闭侧栏': 'Close sidebar', '切换代码/预览': 'Toggle source/preview', '切换到预览': 'Switch to preview', '返回源码编辑': 'Return to source',
    '切换语言': 'Switch language', '切换深浅主题': 'Toggle page theme', '切换主题': 'Toggle theme', '主导航': 'Main navigation', '产品特性': 'Product features', '侧栏视图': 'Sidebar views', '演示文件': 'Demo files',
    '当前文件夹中已存在同名文件': 'A file with this name already exists in this folder', '演示文档已在当前页面保存': 'The demo document was saved in this page', '桌面版会将本地文件移入回收站': 'The desktop app moves local files to the Recycle Bin', '产品演示会保留 mde-workspace': 'The product demo keeps mde-workspace open', '至少保留一个标签页': 'Keep at least one tab open', '搜索面板已在桌面版中提供': 'Search is available in the desktop app', '演示内容已恢复': 'Demo content restored', '服务地址已复制': 'Service URL copied',
  };
  const englishToChinese = new Map(Object.entries(staticEnglish).map(([zh, en]) => [en, zh]));
  let currentLocale = (() => {
    try { return localStorage.getItem('mde-home-locale') || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'); }
    catch { return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'; }
  })();
  if (!['zh', 'en'].includes(currentLocale)) currentLocale = 'zh';

  const localize = (value) => currentLocale === 'en' ? (staticEnglish[value] || value) : (englishToChinese.get(value) || value);

  function translateDom() {
    document.documentElement.lang = currentLocale === 'zh' ? 'zh-CN' : 'en';
    document.title = currentLocale === 'zh' ? 'MDE · 专注写作，清晰表达' : 'MDE · Focused writing, clearly expressed';
    document.querySelector('meta[name="description"]').content = currentLocale === 'zh'
      ? 'MDE 是一款专注写作体验的跨平台 Markdown 编辑器，支持实时预览、工作区管理与可选云同步。'
      : 'MDE is a focused cross-platform Markdown editor with live preview, workspace management, and optional cloud sync.';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('#markdown-preview, #markdown-highlight, textarea, pre')) continue;
      const trimmed = node.nodeValue.trim();
      if (!trimmed) continue;
      const source = staticEnglish[trimmed] ? trimmed : englishToChinese.get(trimmed);
      if (!source) continue;
      node.nodeValue = node.nodeValue.replace(trimmed, currentLocale === 'en' ? staticEnglish[source] : source);
    }
    document.querySelectorAll('[title], [aria-label], [placeholder]').forEach((element) => {
      ['title', 'aria-label', 'placeholder'].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value) element.setAttribute(attribute, localize(value));
      });
    });
    const languageButton = document.querySelector('#language-toggle');
    if (languageButton) {
      languageButton.dataset.locale = currentLocale;
      languageButton.setAttribute('aria-label', localize('切换语言'));
      languageButton.title = localize('切换语言');
    }
  }

  function setLocale(nextLocale) {
    currentLocale = nextLocale;
    try { localStorage.setItem('mde-home-locale', currentLocale); } catch { /* Locale persistence is optional. */ }
    const activeContentChanged = syncDemoDocumentLocale(currentLocale);
    if (activeContentChanged) input.value = documents[currentDocument].content;
    translateDom();
    if (activeContentChanged) { renderMarkdown(input.value); updateSourceLayer(); }
    updateMetrics();
    renderFileTree();
    renderFooterBreadcrumb();
    updateOutline();
  }

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
  Object.assign(documents, {
    guide: { name: '使用指南.md', content: '# 使用指南\n\n## 工作区\n\n通过侧栏浏览文件夹与 Markdown 文档。\n\n## 写作模式\n\n使用标签栏切换源码、分屏和预览。' },
    codeSample: { name: '代码高亮.md', content: '# 代码高亮\n\n```typescript\ninterface Note {\n  title: string;\n  saved: boolean;\n}\n\nconst note: Note = { title: \'MDE\', saved: true };\n```' },
    tableSample: { name: '表格示例.md', content: '# 表格示例\n\n| 功能 | 状态 |\n| --- | --- |\n| Monaco | 已启用 |\n| Shiki | 已启用 |' },
    daily: { name: '每日记录.md', content: '# 每日记录\n\n## 上午\n\n- [x] 整理工作区\n\n## 下午\n\n- [ ] 完成文章' },
    ideas: { name: '灵感.md', content: '# 灵感\n\n> 好的工具应该安静地消失在内容背后。' },
  });
  const workspaceTree = {
    docs: { type: 'folder', children: { guide: { type: 'document', key: 'guide' } } },
    examples: { type: 'folder', children: { code: { type: 'document', key: 'codeSample' }, table: { type: 'document', key: 'tableSample' } } },
    welcome: { type: 'document', key: 'welcome' },
    features: { type: 'document', key: 'features' },
    shortcuts: { type: 'document', key: 'shortcuts' },
    notes: { type: 'folder', children: { daily: { type: 'document', key: 'daily' }, ideas: { type: 'document', key: 'ideas' } } },
  };
  const englishDemoDocuments = {
    welcome: { name: 'Welcome.md', content: '# Welcome to MDE\n\n> This is a genuinely interactive mini workspace. Edit the source and watch the preview update instantly.\n\n## Writing starts with focus\n\nMDE brings **reliable saving**, *live preview*, and `Markdown` tools into a quiet workspace.\n\n- [x] Write safely on your device\n- [x] Check layout in split view\n- [ ] Publish the next article\n\n```javascript\nconst idea = \'Keep it simple, keep writing\';\nconsole.log(idea);\n```\n\nUse the controls above to switch between **source / split / preview**.' },
    features: { name: 'Feature Tour.md', content: '# Feature Tour\n\nMDE provides a complete yet focused toolkit for everyday Markdown work.\n\n| Capability | Experience |\n| --- | --- |\n| Workspace | File tree and multiple tabs |\n| Preview | GFM, code blocks, tables, and diagrams |\n| Safety | Atomic saves and recovery snapshots |\n| Sync | Optional cloud sync with conflict handling |\n\n## Design principles\n\n1. Your content always belongs to you\n2. Complex features appear only when needed\n3. Every state remains visible' },
    shortcuts: { name: 'Shortcuts.md', content: '# Common Shortcuts\n\n| Action | Windows / Linux | macOS |\n| --- | --- | --- |\n| Bold | Ctrl + B | ⌘ + B |\n| Italic | Ctrl + I | ⌘ + I |\n| Save | Ctrl + S | ⌘ + S |\n| Search | Ctrl + K | ⌘ + K |\n\n> The demo supports bold, italic, and simulated save shortcuts.\n\n## Today\n\n- [x] Organize sources\n- [ ] Finish the draft\n- [ ] Review and publish' },
    guide: { name: 'Guide.md', content: '# Guide\n\n## Workspace\n\nBrowse folders and Markdown documents from the sidebar.\n\n## Writing modes\n\nUse the tab bar to switch between source, split, and preview.' },
    codeSample: { name: 'Code Highlighting.md', content: '# Code Highlighting\n\n```typescript\ninterface Note {\n  title: string;\n  saved: boolean;\n}\n\nconst note: Note = { title: \'MDE\', saved: true };\n```' },
    tableSample: { name: 'Table Example.md', content: '# Table Example\n\n| Feature | Status |\n| --- | --- |\n| Monaco | Enabled |\n| Shiki | Enabled |' },
    daily: { name: 'Daily Notes.md', content: '# Daily Notes\n\n## Morning\n\n- [x] Organize workspace\n\n## Afternoon\n\n- [ ] Finish article' },
    ideas: { name: 'Ideas.md', content: '# Ideas\n\n> A good tool should quietly disappear behind the content.' },
  };
  const chineseDemoDocuments = Object.fromEntries(Object.entries(documents).map(([key, value]) => [key, { ...value }]));
  let demoDocumentLocale = 'zh';

  function syncDemoDocumentLocale(nextLocale) {
    if (nextLocale === demoDocumentLocale) return false;
    const previousCatalog = demoDocumentLocale === 'en' ? englishDemoDocuments : chineseDemoDocuments;
    const nextCatalog = nextLocale === 'en' ? englishDemoDocuments : chineseDemoDocuments;
    let activeContentChanged = false;
    Object.entries(nextCatalog).forEach(([key, nextDocument]) => {
      const document = documents[key];
      const previousDocument = previousCatalog[key];
      if (!document || !previousDocument) return;
      document.name = nextDocument.name;
      if (document.content === previousDocument.content) {
        document.content = nextDocument.content;
        if (key === currentDocument) activeContentChanged = true;
      }
    });
    demoDocumentLocale = nextLocale;
    return activeContentChanged;
  }
  const input = document.querySelector('#markdown-input');
  const preview = document.querySelector('#markdown-preview');
  const workspace = document.querySelector('#workspace');
  const frame = document.querySelector('#demo-frame');
  const sidebar = document.querySelector('#demo-sidebar');
  const sidebarScrim = document.querySelector('#sidebar-scrim');
  const mobileMedia = window.matchMedia('(max-width: 680px)');
  const footerFileName = document.querySelector('#footer-file-name');
  const cursorStatus = document.querySelector('#cursor-status');
  const wordStatus = document.querySelector('#word-status');
  const sourceHighlight = document.querySelector('#markdown-highlight');
  const lineNumbers = document.querySelector('#line-numbers');
  const activeLine = document.querySelector('#monaco-active-line');
  const formatToolbar = document.querySelector('#format-toolbar');
  const tabStrip = document.querySelector('#tab-strip');
  const tabScrollLeft = document.querySelector('#tab-scroll-left');
  const tabScrollRight = document.querySelector('#tab-scroll-right');
  const splitToggle = document.querySelector('#split-toggle');
  const modeToggle = document.querySelector('#mode-toggle');
  const demoFooter = document.querySelector('.demo-footer');
  const toast = document.querySelector('#toast');
  let currentDocument = 'welcome';
  let untitledCount = 1;
  let isCreatingFile = false;
  let creatingFileName = '';
  let folderPath = [];
  let folderHistory = [[]];
  let folderHistoryIndex = 0;
  const collapsedOutlineLines = new Set();
  let viewMode = 'split';
  let renderTimer = 0;
  let saveTimer = 0;
  let toastTimer = 0;
  let outlineAnimationTimer = 0;
  let editorThemeTransitioning = false;

  function setSidebarHidden(hidden) {
    sidebar.classList.toggle('hidden', hidden);
    frame.classList.toggle('sidebar-open', mobileMedia.matches && !hidden);
  }

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const markdownFileIcon = '<span class="file-icon"><svg viewBox="0 0 32 32"><path d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg></span>';
  const folderFileIcon = '<span class="folder-icon"><svg viewBox="0 0 32 32"><path class="folder-icon__body" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><rect class="folder-icon__label" width="18" height="6" x="14" y="22" rx="1"/></svg></span>';
  const breadcrumbChevron = '<svg class="breadcrumb-chevron" viewBox="0 0 1024 1024" aria-hidden="true"><path d="M704 514.368a52.864 52.864 0 0 1-15.808 37.888L415.872 819.2a55.296 55.296 0 0 1-73.984-2.752 52.608 52.608 0 0 1-2.816-72.512l233.6-228.928-233.6-228.992a52.736 52.736 0 0 1-17.536-53.056 53.952 53.952 0 0 1 40.192-39.424c19.904-4.672 40.832 1.92 54.144 17.216l272.32 266.88c9.92 9.792 15.616 23.04 15.808 36.8z" fill="currentColor"/></svg>';

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
    cursorStatus.textContent = currentLocale === 'zh' ? `行 ${lines.length}, 列 ${lines.at(-1).length + 1}` : `Ln ${lines.length}, Col ${lines.at(-1).length + 1}`;
    wordStatus.textContent = currentLocale === 'zh' ? `${input.value.length} 字符` : `${input.value.length} chars`;
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
    workspace.classList.toggle('has-content', input.value.trim().length > 0);
    updateMetrics();
  }

  function getCurrentFolder() {
    let entries = workspaceTree;
    folderPath.forEach((part) => { entries = entries[part].children; });
    return entries;
  }

  function renderFileTree() {
    const tree = document.querySelector('#file-tree');
    const entries = Object.entries(getCurrentFolder()).sort(([, left], [, right]) => Number(right.type === 'folder') - Number(left.type === 'folder'));
    tree.innerHTML = entries.map(([name, entry]) => {
      if (entry.type === 'folder') return `<button class="file-item file-item--folder" type="button" data-folder="${escapeHtml(name)}">${folderFileIcon}<span>${escapeHtml(name)}</span></button>`;
      const document = documents[entry.key];
      const active = entry.key === currentDocument ? ' active' : '';
      return `<button class="file-item${active}" type="button" data-document="${entry.key}">${markdownFileIcon}<span>${escapeHtml(localize(document.name))}</span><i class="file-delete">×</i></button>`;
    }).join('') + (isCreatingFile
      ? `<div class="file-item file-item--creating">${markdownFileIcon}<input class="file-item-input" value="${escapeHtml(creatingFileName)}" placeholder="${localize('输入文件名并回车')}" aria-label="${localize('新文件名')}"></div>`
      : '');
    const breadcrumbParts = ['mde-workspace', ...folderPath];
    document.querySelector('#file-breadcrumb-path').innerHTML = breadcrumbParts.map((part, index) => `<span class="file-breadcrumb__item">${index > 0 ? breadcrumbChevron : ''}<span class="file-breadcrumb__part" data-breadcrumb-index="${index}">${escapeHtml(part)}</span></span>`).join('');
    const back = document.querySelector('#file-nav-back');
    const forward = document.querySelector('#file-nav-forward');
    const up = document.querySelector('#file-nav-up');
    back.disabled = folderHistoryIndex === 0;
    forward.disabled = folderHistoryIndex === folderHistory.length - 1;
    up.disabled = folderPath.length === 0;
    const createInput = tree.querySelector('.file-item-input');
    if (createInput) {
      createInput.addEventListener('input', (event) => { creatingFileName = event.target.value; });
      createInput.addEventListener('keydown', (event) => {
        event.stopPropagation();
        if (event.key === 'Enter') { event.preventDefault(); commitCreatingFile(); }
        if (event.key === 'Escape') { event.preventDefault(); cancelCreatingFile(); }
      });
      createInput.addEventListener('blur', commitCreatingFile);
    }
  }

  function navigateFolder(nextPath, record = true) {
    isCreatingFile = false;
    creatingFileName = '';
    folderPath = [...nextPath];
    if (record) {
      folderHistory = folderHistory.slice(0, folderHistoryIndex + 1);
      folderHistory.push([...folderPath]);
      folderHistoryIndex = folderHistory.length - 1;
    }
    renderFileTree();
  }

  function updateOutline() {
    const outline = document.querySelector('#outline-list');
    const items = [];
    input.value.split('\n').forEach((line, lineIndex) => {
      const heading = line.match(/^\s*(#{1,6})\s+(.+)$/);
      if (heading) items.push({ level: heading[1].length, label: heading[2].replace(/[*_`~]/g, ''), line: lineIndex + 1 });
    });
    const collapsedAncestors = [];
    outline.innerHTML = items.length
      ? items.map((item, index) => {
        while (collapsedAncestors.length && collapsedAncestors.at(-1).level >= item.level) collapsedAncestors.pop();
        const hidden = collapsedAncestors.length > 0;
        const hasChildren = Boolean(items[index + 1] && items[index + 1].level > item.level);
        const collapsed = collapsedOutlineLines.has(item.line);
        if (hasChildren && collapsed) collapsedAncestors.push(item);
        const toggle = hasChildren
          ? `<span class="outline-toggle${collapsed ? ' collapsed' : ''}" data-outline-toggle="${item.line}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></span>`
          : '<span class="outline-toggle"></span>';
        return `<button class="outline-item${hidden ? ' hidden-by-collapse' : ''}" type="button" data-outline-line="${item.line}" style="padding-left:${12 + (item.level - 1) * 12}px">${toggle}<span class="outline-item__badge">H${item.level}</span><span class="outline-item__text">${escapeHtml(item.label)}</span></button>`;
      }).join('')
      : `<div class="outline-empty">${localize('未找到标题。')}</div>`;
  }

  function queueRender() {
    updateSourceLayer();
    updateOutline();
    window.clearTimeout(renderTimer);
    renderTimer = window.setTimeout(() => renderMarkdown(input.value), 60);
  }

  function markEditing() {
    documents[currentDocument].content = input.value;
    document.querySelector('.demo-tab.active i')?.classList.add('visible');
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      document.querySelector('.demo-tab.active i')?.classList.remove('visible');
    }, 700);
  }

  function ensureTab(key) {
    let tab = document.querySelector(`.demo-tab[data-tab-document="${key}"]`);
    if (tab) return tab;
    tab = document.createElement('div');
    tab.className = 'demo-tab';
    tab.dataset.tabDocument = key;
    tab.innerHTML = `${markdownFileIcon}<span class="tab-name">${escapeHtml(localize(documents[key].name))}</span><i></i><button class="tab-close" type="button" title="${localize('关闭标签')}"><svg viewBox="0 0 24 24"><path d="m18 6-12 12M6 6l12 12"/></svg></button>`;
    document.querySelector('.tabbar-new').before(tab);
    requestAnimationFrame(updateTabScrollButtons);
    return tab;
  }

  function findDocumentPath(key, entries = workspaceTree, parts = []) {
    for (const [name, entry] of Object.entries(entries)) {
      if (entry.type === 'document' && entry.key === key) return parts;
      if (entry.type === 'folder') {
        const nested = findDocumentPath(key, entry.children, [...parts, name]);
        if (nested) return nested;
      }
    }
    return [];
  }

  function renderFooterBreadcrumb() {
    const parts = ['mde-workspace', ...findDocumentPath(currentDocument), localize(documents[currentDocument].name)];
    footerFileName.innerHTML = parts.map((part, index) => `<span class="demo-footer__breadcrumb-item">${index > 0 ? breadcrumbChevron : ''}<span class="demo-footer__breadcrumb-segment">${escapeHtml(part)}</span></span>`).join('');
  }

  function updateTabScrollButtons() {
    const maxScroll = Math.max(0, tabStrip.scrollWidth - tabStrip.clientWidth);
    tabScrollLeft.disabled = tabStrip.scrollLeft <= 1;
    tabScrollRight.disabled = tabStrip.scrollLeft >= maxScroll - 1;
  }

  function scrollTabStrip(direction) {
    tabStrip.scrollBy({ left: direction * Math.max(140, tabStrip.clientWidth * 0.6), behavior: 'smooth' });
  }

  function startCreatingFile() {
    document.querySelector('.segment button')?.click();
    if (isCreatingFile) {
      document.querySelector('.file-item-input')?.focus();
      return;
    }
    isCreatingFile = true;
    creatingFileName = '';
    renderFileTree();
    requestAnimationFrame(() => document.querySelector('.file-item-input')?.focus());
  }

  function cancelCreatingFile() {
    if (!isCreatingFile) return;
    isCreatingFile = false;
    creatingFileName = '';
    renderFileTree();
  }

  function commitCreatingFile() {
    if (!isCreatingFile) return;
    const enteredName = creatingFileName.trim();
    if (!enteredName) { cancelCreatingFile(); return; }
    const fileName = /\.md(?:own)?$/i.test(enteredName) ? enteredName : `${enteredName}.md`;
    const entries = getCurrentFolder();
    const duplicate = Object.values(entries).some((entry) => entry.type === 'document' && documents[entry.key]?.name.toLowerCase() === fileName.toLowerCase());
    if (duplicate) {
      notify('当前文件夹中已存在同名文件');
      requestAnimationFrame(() => document.querySelector('.file-item-input')?.focus());
      return;
    }
    const key = `created-${Date.now()}-${untitledCount}`;
    untitledCount += 1;
    documents[key] = { name: fileName, content: '' };
    entries[key] = { type: 'document', key };
    isCreatingFile = false;
    creatingFileName = '';
    loadDocument(key);
    input.focus();
  }

  function loadDocument(key) {
    currentDocument = key;
    const tab = ensureTab(key);
    input.value = documents[key].content;
    document.querySelectorAll('.demo-tab').forEach((item) => item.classList.toggle('active', item === tab));
    renderFooterBreadcrumb();
    renderFileTree();
    tab.querySelector('i')?.classList.remove('visible');
    renderMarkdown(input.value);
    updateSourceLayer();
    updateOutline();
    requestAnimationFrame(() => {
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      updateTabScrollButtons();
    });
  }

  function notify(message) {
    toast.textContent = localize(message);
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
    else if (type === 'strike') { replacement = `~~${selected || '删除线文字'}~~`; cursorOffset = selected ? replacement.length : 2; }
    else if (type === 'codeblock') { replacement = `\`\`\`javascript\n${selected || "console.log('MDE');"}\n\`\`\``; cursorOffset = replacement.length; }
    else if (type === 'table') { replacement = '| 标题 | 内容 |\n| --- | --- |\n| MDE | Markdown |'; cursorOffset = replacement.length; }
    else if (type === 'link') { replacement = `[${selected || '链接文字'}](https://example.com)`; cursorOffset = replacement.length; }
    else if (type === 'image') { replacement = `![${selected || '图片说明'}](https://example.com/image.png)`; cursorOffset = replacement.length; }
    else if (type === 'task') { replacement = `- [ ] ${selected || '待办事项'}`; cursorOffset = replacement.length; }
    else if (type === 'rule') { replacement = '---\n'; cursorOffset = replacement.length; }
    input.setRangeText(replacement, input.selectionStart, input.selectionEnd, 'end');
    if (cursorOffset) input.setSelectionRange(input.selectionStart, input.selectionStart);
    input.focus();
    markEditing();
    queueRender();
    updateMetrics();
  }

  function setEditorTheme(nextTheme) {
    if (frame.dataset.editorTheme === nextTheme) return false;
    frame.dataset.editorTheme = nextTheme;
    return true;
  }

  function toggleEditorTheme(event) {
    const next = frame.dataset.editorTheme === 'dark' ? 'light' : 'dark';
    if (!event?.currentTarget || editorThemeTransitioning) { if (!editorThemeTransitioning) setEditorTheme(next); return; }
    const frameBounds = frame.getBoundingClientRect();
    const buttonBounds = event.currentTarget.getBoundingClientRect();
    const x = buttonBounds.left + buttonBounds.width / 2 - frameBounds.left;
    const y = buttonBounds.top + buttonBounds.height / 2 - frameBounds.top;
    const radius = Math.hypot(Math.max(x, frameBounds.width - x), Math.max(y, frameBounds.height - y));
    if (typeof document.startViewTransition === 'function') {
      editorThemeTransitioning = true;
      const transition = document.startViewTransition(() => setEditorTheme(next));
      transition.ready.then(() => document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 340, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards', pseudoElement: '::view-transition-new(mde-editor-theme)' },
      )).catch(() => { /* The theme is already applied if the visual transition is unavailable. */ });
      transition.finished.finally(() => { editorThemeTransitioning = false; });
      return;
    }
    const clone = frame.cloneNode(true);
    clone.classList.add('editor-theme-transition-clone');
    clone.dataset.editorTheme = next;
    clone.setAttribute('aria-hidden', 'true');
    Object.assign(clone.style, {
      top: `${frameBounds.top}px`, left: `${frameBounds.left}px`,
      width: `${frameBounds.width}px`, height: `${frameBounds.height}px`,
      clipPath: `circle(0 at ${x}px ${y}px)`,
    });
    const cloneInput = clone.querySelector('#markdown-input');
    if (cloneInput) cloneInput.value = input.value;
    document.body.appendChild(clone);
    clone.querySelector('#markdown-input')?.scrollTo(input.scrollLeft, input.scrollTop);
    clone.querySelector('#markdown-preview')?.scrollTo(preview.scrollLeft, preview.scrollTop);
    if (typeof clone.animate !== 'function') { setEditorTheme(next); clone.remove(); return; }
    editorThemeTransitioning = true;
    const animation = clone.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 340, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' },
    );
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setEditorTheme(next);
      void frame.offsetWidth;
      requestAnimationFrame(() => {
        editorThemeTransitioning = false;
        clone.remove();
      });
    };
    animation.addEventListener('finish', finish, { once: true });
    animation.addEventListener('cancel', finish, { once: true });
  }

  function togglePageTheme(event) {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    const applyTheme = () => {
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#121212' : '#f5f5f7';
      if (frame.dataset.editorTheme !== next) setEditorTheme(next);
    };
    if (!document.startViewTransition || !event?.currentTarget) { applyTheme(); return; }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(applyTheme);
    transition.ready.then(() => document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 300, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' },
    ));
  }

  function updateViewMode(nextMode) {
    viewMode = nextMode;
    workspace.classList.remove('mode-edit', 'mode-split', 'mode-preview');
    workspace.classList.add(`mode-${viewMode}`);
    splitToggle.classList.toggle('active', viewMode === 'split');
    modeToggle.classList.toggle('active', viewMode === 'preview');
    demoFooter.classList.toggle('previewing', viewMode === 'preview');
    modeToggle.title = localize(viewMode === 'preview' ? '返回源码编辑' : '切换到预览');
  }

  async function checkStatus() {
    const overall = document.querySelector('#overall-status');
    const dot = document.querySelector('#overall-dot');
    const button = document.querySelector('#refresh-status');
    button.disabled = true;
    button.textContent = localize('检测中');
    dot.className = 'live-dot';
    overall.textContent = localize('正在检测');
    const started = performance.now();
    try {
      const response = await fetch('/health', { cache: 'no-store', headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('status request failed');
      const data = await response.json();
      const latency = Math.max(1, Math.round(performance.now() - started));
      const healthy = data.status === 'operational';
      dot.className = `live-dot ${healthy ? 'online' : 'offline'}`;
      overall.textContent = localize(healthy ? '所有公开服务运行正常' : '部分服务状态异常');
      setStatusValue('api-status', localize(data.services?.api === 'operational' ? '运行正常' : '不可用'), data.services?.api === 'operational');
      setStatusValue('database-status', databaseLabel(data.services?.database), data.services?.database === 'connected');
      document.querySelector('#version-status').textContent = `v${String(data.version || '—')}`;
      document.querySelector('#latency-status').textContent = `${latency} ms`;
      document.querySelector('#status-time').textContent = new Date(data.checkedAt || Date.now()).toLocaleTimeString(currentLocale === 'zh' ? 'zh-CN' : 'en-US', { hour12: false });
    } catch {
      dot.className = 'live-dot offline';
      overall.textContent = localize('暂时无法连接服务');
      setStatusValue('api-status', localize('不可用'), false);
      setStatusValue('database-status', localize('未知'), false);
      document.querySelector('#latency-status').textContent = '—';
      document.querySelector('#status-time').textContent = new Date().toLocaleTimeString(currentLocale === 'zh' ? 'zh-CN' : 'en-US', { hour12: false });
    } finally {
      button.disabled = false;
      button.textContent = localize('重新检测');
    }
  }

  function databaseLabel(state) {
    return localize(({ connected: '连接正常', connecting: '正在连接', disconnecting: '正在断开', disconnected: '未连接' })[state] || '未知');
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
    if (shortcut === 's') { event.preventDefault(); document.querySelector('.demo-tab.active i')?.classList.remove('visible'); notify('演示文档已在当前页面保存'); }
  });

  document.querySelectorAll('[data-document]').forEach((item) => item.addEventListener('click', () => loadDocument(item.dataset.document)));
  document.querySelector('#file-tree').addEventListener('click', (event) => {
    if (event.target.closest('.file-delete')) { event.stopPropagation(); notify('桌面版会将本地文件移入回收站'); return; }
    const item = event.target.closest('.file-item');
    if (!item) return;
    if (item.dataset.folder) navigateFolder([...folderPath, item.dataset.folder]);
    if (item.dataset.document) {
      loadDocument(item.dataset.document);
      if (mobileMedia.matches) setSidebarHidden(true);
    }
  });
  document.querySelector('#file-breadcrumb-path').addEventListener('click', (event) => {
    const part = event.target.closest('[data-breadcrumb-index]');
    if (!part) return;
    const index = Number(part.dataset.breadcrumbIndex);
    navigateFolder(folderPath.slice(0, index));
  });
  document.querySelector('#file-nav-back').addEventListener('click', () => {
    if (folderHistoryIndex === 0) return;
    folderHistoryIndex -= 1;
    navigateFolder(folderHistory[folderHistoryIndex], false);
  });
  document.querySelector('#file-nav-forward').addEventListener('click', () => {
    if (folderHistoryIndex >= folderHistory.length - 1) return;
    folderHistoryIndex += 1;
    navigateFolder(folderHistory[folderHistoryIndex], false);
  });
  document.querySelector('#file-nav-up').addEventListener('click', () => navigateFolder(folderPath.slice(0, -1)));
  document.querySelector('#file-nav-refresh').addEventListener('click', renderFileTree);
  document.querySelector('#file-nav-reveal').addEventListener('click', () => notify(`${currentLocale === 'zh' ? '工作区' : 'Workspace'}: ${['mde-workspace', ...folderPath].join(' / ')}`));
  document.querySelector('#file-nav-close').addEventListener('click', () => notify('产品演示会保留 mde-workspace'));
  document.querySelector('.tabbar-new').addEventListener('click', startCreatingFile);
  document.querySelector('.tree-actions button[title="新建文件"]').addEventListener('click', startCreatingFile);
  document.querySelector('.demo-tabbar').addEventListener('click', (event) => {
    const tab = event.target.closest('.demo-tab');
    if (!tab) return;
    if (event.target.closest('.tab-close')) {
      event.stopPropagation();
      const tabs = [...document.querySelectorAll('.demo-tab')];
      if (tabs.length === 1) { notify('至少保留一个标签页'); return; }
      const wasActive = tab.classList.contains('active');
      const fallback = tabs[tabs.indexOf(tab) - 1] || tabs[tabs.indexOf(tab) + 1];
      tab.remove();
      if (wasActive && fallback) loadDocument(fallback.dataset.tabDocument);
      else updateTabScrollButtons();
      return;
    }
    loadDocument(tab.dataset.tabDocument);
  });
  splitToggle.addEventListener('click', () => updateViewMode(viewMode === 'split' ? 'edit' : 'split'));
  modeToggle.addEventListener('click', () => updateViewMode(viewMode === 'preview' ? 'edit' : 'preview'));
  document.querySelector('#toolbar-toggle').addEventListener('click', (event) => {
    const visible = formatToolbar.classList.toggle('ft--show');
    event.currentTarget.classList.toggle('active', visible);
  });
  document.querySelector('#toolbar-collapse').addEventListener('click', (event) => {
    event.stopPropagation();
    formatToolbar.classList.remove('ft--show');
    document.querySelector('#toolbar-toggle').classList.remove('active');
  });
  tabScrollLeft.addEventListener('click', () => scrollTabStrip(-1));
  tabScrollRight.addEventListener('click', () => scrollTabStrip(1));
  tabStrip.addEventListener('scroll', updateTabScrollButtons, { passive: true });
  window.addEventListener('resize', updateTabScrollButtons);
  const toolbarGrip = document.querySelector('.format-toolbar__grip');
  let toolbarDrag = null;
  toolbarGrip.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    const toolbarRect = formatToolbar.getBoundingClientRect();
    const host = document.querySelector('.demo-main').getBoundingClientRect();
    formatToolbar.classList.add('custom-position', 'dragging');
    formatToolbar.style.left = `${toolbarRect.left - host.left}px`;
    formatToolbar.style.top = `${toolbarRect.top - host.top}px`;
    toolbarDrag = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startLeft: toolbarRect.left,
      startTop: toolbarRect.top,
      width: toolbarRect.width,
      height: toolbarRect.height,
    };
    try { toolbarGrip.setPointerCapture(event.pointerId); } catch (_) { /* Synthetic/legacy pointers may not support capture. */ }
  });
  toolbarGrip.addEventListener('pointermove', (event) => {
    if (!toolbarDrag || toolbarDrag.pointerId !== event.pointerId) return;
    const bounds = workspace.getBoundingClientRect();
    const host = document.querySelector('.demo-main').getBoundingClientRect();
    const margin = 8;
    const rawLeft = toolbarDrag.startLeft + event.clientX - toolbarDrag.startClientX;
    const rawTop = toolbarDrag.startTop + event.clientY - toolbarDrag.startClientY;
    const left = Math.min(Math.max(rawLeft, bounds.left + margin), bounds.right - toolbarDrag.width - margin);
    const top = Math.min(Math.max(rawTop, bounds.top + margin), bounds.bottom - toolbarDrag.height - margin);
    formatToolbar.style.left = `${left - host.left}px`;
    formatToolbar.style.top = `${top - host.top}px`;
  });
  const stopToolbarDrag = (event) => {
    if (!toolbarDrag || toolbarDrag.pointerId !== event.pointerId) return;
    toolbarDrag = null;
    formatToolbar.classList.remove('dragging');
    try { toolbarGrip.releasePointerCapture?.(event.pointerId); } catch (_) { /* Capture may already be released. */ }
  };
  toolbarGrip.addEventListener('pointerup', stopToolbarDrag);
  toolbarGrip.addEventListener('pointercancel', stopToolbarDrag);
  toolbarGrip.addEventListener('lostpointercapture', stopToolbarDrag);
  window.addEventListener('pointerup', stopToolbarDrag);
  window.addEventListener('pointercancel', stopToolbarDrag);
  document.querySelectorAll('.format-toolbar button[data-format]').forEach((button) => button.addEventListener('click', () => applyFormat(button.dataset.format)));
  document.querySelectorAll('.segment button').forEach((button, index) => button.addEventListener('click', () => {
    document.querySelectorAll('.segment button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector('.segment__slider').style.transform = `translateX(${index * 100}%)`;
    const viewNames = ['explorer', 'outline', 'recent'];
    document.querySelectorAll('[data-sidebar-view]').forEach((view) => view.classList.toggle('active', view.dataset.sidebarView === viewNames[index]));
  }));
  document.querySelector('#outline-list').addEventListener('click', (event) => {
    const item = event.target.closest('.outline-item');
    if (!item) return;
    const line = Number(item.dataset.outlineLine);
    const toggle = event.target.closest('[data-outline-toggle]');
    if (toggle) {
      const collapsing = !collapsedOutlineLines.has(line);
      if (collapsing) collapsedOutlineLines.add(line);
      else collapsedOutlineLines.delete(line);
      toggle.classList.toggle('collapsed', collapsing);
      window.clearTimeout(outlineAnimationTimer);
      outlineAnimationTimer = window.setTimeout(updateOutline, 180);
      return;
    }
    const sourceLines = input.value.split('\n');
    const offset = sourceLines.slice(0, line - 1).reduce((total, value) => total + value.length + 1, 0);
    input.setSelectionRange(offset, offset);
    input.scrollTop = Math.max(0, (line - 3) * 21);
    updateMetrics();
    input.focus();
  });
  document.querySelector('.sidebar-view[data-sidebar-view="outline"] button[title="全部折叠"]').addEventListener('click', () => {
    document.querySelectorAll('#outline-list .outline-item .outline-toggle[data-outline-toggle]').forEach((toggle) => collapsedOutlineLines.add(Number(toggle.dataset.outlineToggle)));
    updateOutline();
  });
  document.querySelector('.sidebar-view[data-sidebar-view="outline"] button[title="全部展开"]').addEventListener('click', () => {
    collapsedOutlineLines.clear();
    updateOutline();
  });
  document.querySelector('.demo-search').addEventListener('click', () => notify('搜索面板已在桌面版中提供'));
  document.querySelectorAll('.js-sidebar-toggle').forEach((button) => button.addEventListener('click', () => setSidebarHidden(!sidebar.classList.contains('hidden'))));
  sidebarScrim.addEventListener('click', () => setSidebarHidden(true));
  mobileMedia.addEventListener('change', (event) => setSidebarHidden(event.matches));
  document.querySelector('#reset-demo').addEventListener('click', () => {
    const resetCatalog = currentLocale === 'en' ? englishDemoDocuments : chineseDemoDocuments;
    Object.keys(originals).forEach((key) => { documents[key].content = resetCatalog[key].content; });
    folderHistory = [[]];
    folderHistoryIndex = 0;
    navigateFolder([], false);
    loadDocument(currentDocument);
    notify('演示内容已恢复');
  });
  document.querySelector('#theme-toggle').addEventListener('click', togglePageTheme);
  document.querySelector('#demo-theme-toggle').addEventListener('click', toggleEditorTheme);
  document.querySelector('#language-toggle').addEventListener('click', (event) => {
    const button = event.currentTarget;
    button.classList.remove('is-switching');
    void button.offsetWidth;
    button.classList.add('is-switching');
    setLocale(currentLocale === 'zh' ? 'en' : 'zh');
    window.setTimeout(() => button.classList.remove('is-switching'), 520);
  });
  document.querySelector('#refresh-status').addEventListener('click', checkStatus);
  document.querySelector('#copy-endpoint').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(window.location.origin); notify('服务地址已复制'); }
    catch { notify(`${currentLocale === 'zh' ? '服务地址' : 'Service URL'}: ${window.location.origin}`); }
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

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.dataset.theme = 'dark';
    document.querySelector('meta[name="theme-color"]').content = '#121212';
  }
  setEditorTheme(document.documentElement.dataset.theme);
  setSidebarHidden(mobileMedia.matches);
  syncDemoDocumentLocale(currentLocale);
  translateDom();
  updateViewMode('split');
  loadDocument('welcome');
  checkStatus();
})();
