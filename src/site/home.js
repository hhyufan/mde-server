(() => {
  'use strict';

  const staticEnglish = {
    '在线体验': 'Live Demo', '核心能力': 'Features', '服务状态': 'Service Status',
    '轻量、本地优先的 Markdown 工作台': 'A lightweight, local-first Markdown workspace',
    '编辑、预览、管理文件，': 'Edit, preview, and manage files,', '都在一个工作台。': 'all in one workspace.',
    'Monaco 源码与 Milkdown 所见即所得自由切换；本地文件优先，需要时再开启云同步。': 'Switch freely between Monaco source editing and Milkdown WYSIWYG. Keep files local and enable cloud sync only when needed.',
    '为 Markdown 写作者而生': 'Made for Markdown writers',
    '写作应该专注于内容，': 'Writing should stay focused on the content,', '其余交给 MDE。': 'leave the rest to MDE.',
    'MDE 将本地优先的可靠性、顺滑的实时预览和克制的桌面体验放在同一个工作台里。': 'MDE brings local-first reliability, fluid live preview, and a focused desktop experience into one workspace.',
    '立即体验': 'Try it now', '获取桌面版': 'Get the desktop app', '本地优先': 'Local first', '跨平台': 'Cross-platform', '开源': 'Open source', '随笔.md': 'Notes.md',
    '所见即所得的 Markdown 编辑器': 'WYSIWYG Markdown Editor',
    '这是 MDE 的轻量预览；桌面端提供完整的工作区与编辑体验。': 'A lightweight preview of MDE. The desktop app provides the complete workspace and editing experience.',
    '继续了解 MDE': 'Explore MDE',
    '四个部分，都是 MDE 的真实能力。': 'Four parts, all implemented in MDE.',
    '查看源代码': 'View source',
    '轻量化': 'Lightweight',
    'Tauri 2 的 Rust 桌面壳直接使用系统 WebView；编辑器、图表和高亮模块只在需要时载入，让启动路径保持简洁。': 'The Tauri 2 desktop shell uses Rust and the system WebView. Editor, diagram, and highlighting modules load only when needed, keeping the startup path simple.',
    '系统内置': 'Built in', '核心界面': 'Core UI', '按需载入': 'On demand', '源码编辑': 'Source editing', '已载入': 'Loaded', '按需': 'On demand', '图表渲染': 'Diagram rendering',
    '桌面壳先启动，重型能力随后按需进入。': 'The desktop shell starts first; heavier capabilities join only when needed.',
    '所见即所得': 'WYSIWYG', '今日写作计划': 'Today’s writing plan', '完成文章结构': 'Finish the article outline', '直接编辑': 'Edit the', '排版结果': 'rendered result', '，内容仍然保存为 Markdown。': ', while keeping Markdown as the source.',
    '直接在排版后的内容中写作，标题、列表、任务、表格与代码块所见即所得；需要源码时再切回 Monaco 或分屏。': 'Write directly in the formatted document. Headings, lists, tasks, tables, and code blocks appear exactly as they will read; switch to Monaco or split view only when you need the source.',
    '工作区即文件资源管理器': 'The workspace is a file explorer',
    '文件、标签、大纲、最近记录和搜索都围绕你打开的真实目录工作。': 'Files, tabs, outlines, recent history, and search all work around the real folder you opened.',
    '欢迎使用 MDE': 'Welcome to MDE', '开始写作': 'Start writing', '工作区': 'Workspace', '文件与大纲': 'Files and outline',
    '云同步': 'Cloud sync', '本地文件': 'Local file', '全部同步': 'All synced', '刚刚': 'Just now', '云端副本': 'Cloud copy', '文档与设置': 'Docs and settings', '冲突可见': 'Visible conflicts', '按需启用': 'Opt in',
    '默认写入本地文件。登录后，文档与设置才进入增量同步；冲突会明确展示，不在后台替你覆盖。': 'Files are written locally by default. After sign-in, documents and settings enter incremental sync; conflicts are shown explicitly and never overwritten silently.',
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
    '本地优先、所见即所得的 Markdown 写作工作台。': 'A local-first, WYSIWYG Markdown writing workspace.', '服务端': 'Server',
    '本地': 'Local', '未找到标题。': 'No headings found.', '输入文件名并回车': 'Enter a file name and press Enter', '新文件名': 'New file name',
    '所有公开服务运行正常': 'All public services are operational', '部分服务状态异常': 'Some services are degraded', '暂时无法连接服务': 'Service is temporarily unavailable',
    '运行正常': 'Operational', '不可用': 'Unavailable', '未知': 'Unknown', '连接正常': 'Connected', '正在连接': 'Connecting', '正在断开': 'Disconnecting', '未连接': 'Disconnected',
    '排序': 'Sort', '新建文件': 'New file', '保存': 'Save', '打开文件夹 / 恢复演示': 'Open folder / reset demo', '后退': 'Back', '前进': 'Forward', '上一级': 'Up', '刷新': 'Refresh', '在资源管理器中打开': 'Open in Explorer', '关闭文件夹': 'Close folder',
    '全部折叠': 'Collapse all', '全部展开': 'Expand all', '统计': 'Statistics', '清空': 'Clear', '切换编辑器主题': 'Toggle editor theme', '检查更新': 'Check for updates', '设置': 'Settings',
    '显示或隐藏侧栏': 'Show or hide sidebar', '窗口控制': 'Window controls', '最小化': 'Minimize', '最大化': 'Maximize', '关闭': 'Close', '向左滚动': 'Scroll left', '向右滚动': 'Scroll right', '关闭标签': 'Close tab', '标签栏动作': 'Tab actions', '切换工具栏': 'Toggle toolbar', '书签': 'Bookmark',
    'Markdown 格式工具栏': 'Markdown formatting toolbar', '拖动工具栏': 'Drag toolbar', '粗体': 'Bold', '斜体': 'Italic', '删除线': 'Strikethrough', '标题': 'Heading', '引用': 'Quote', '表格': 'Table', '代码块': 'Code block', '链接': 'Link', '图片': 'Image', '任务列表': 'Task list', '分隔线': 'Divider', '收起工具栏': 'Hide toolbar',
    'Markdown 实时预览': 'Markdown live preview', '拖动调整分栏': 'Drag to resize panes', '切换侧栏': 'Toggle sidebar', '关闭侧栏': 'Close sidebar', '切换代码/预览': 'Toggle source/preview', '切换到预览': 'Switch to preview', '返回源码编辑': 'Return to source',
    '切换语言': 'Switch language', '切换深浅主题': 'Toggle page theme', '切换主题': 'Toggle theme', '主导航': 'Main navigation', '产品特性': 'Product features', '侧栏视图': 'Sidebar views', '编辑模式': 'Editor modes', '折叠': 'Collapse', '展开': 'Expand', '演示文件': 'Demo files',
    '当前文件夹中已存在同名文件': 'A file with this name already exists in this folder', '演示文档已在当前页面保存': 'The demo document was saved in this page', '桌面版会将本地文件移入回收站': 'The desktop app moves local files to the Recycle Bin', '产品演示会保留 mde-workspace': 'The product demo keeps mde-workspace open', '至少保留一个标签页': 'Keep at least one tab open', '搜索面板已在桌面版中提供': 'Search is available in the desktop app', '演示内容已恢复': 'Demo content restored', '服务地址已复制': 'Service URL copied', '展开完整路径': 'Expand full path', '折叠路径': 'Collapse path',
    '窄屏空间不足，分屏模式已禁用，请使用源码或预览模式。': 'Split view is disabled on narrow screens. Use source or preview mode instead.',
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
    renderStoryFolder(storyFolder);
  }

  const originals = {
    welcome: {
      name: 'README.md',
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
    appJsx: { name: 'App.jsx', content: "import { useState } from 'react';\nimport Editor from './Editor.jsx';\n\nexport default function App() {\n  const [mode, setMode] = useState('split');\n\n  return (\n    <main data-mode={mode}>\n      <Editor mode={mode} onModeChange={setMode} />\n    </main>\n  );\n}" },
    editorJs: { name: 'editor.js', content: "export const editorModes = ['source', 'split', 'preview'];\n\nexport function selectMode(mode) {\n  return editorModes.includes(mode) ? mode : 'source';\n}" },
    mainRs: { name: 'main.rs', content: "#![cfg_attr(not(debug_assertions), windows_subsystem = \"windows\")]\n\nfn main() {\n    mde_lib::run();\n}" },
    mainKt: { name: 'MainActivity.kt', content: "package xyz.miaogu.mde\n\nimport android.os.Bundle\nimport androidx.activity.ComponentActivity\n\nclass MainActivity : ComponentActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n    }\n}" },
  });
  const workspaceTree = {
    src: { type: 'folder', children: { app: { type: 'document', key: 'appJsx' }, editor: { type: 'document', key: 'editorJs' } } },
    'src-tauri': { type: 'folder', children: {
      src: { type: 'folder', children: { main: { type: 'document', key: 'mainRs' } } },
      gen: { type: 'folder', children: { android: { type: 'folder', children: { app: { type: 'folder', children: { src: { type: 'folder', children: { main: { type: 'folder', children: { java: { type: 'folder', children: { activity: { type: 'document', key: 'mainKt' } } } } } } } } } } } } },
    } },
    readme: { type: 'document', key: 'welcome' },
  };
  const englishDemoDocuments = {
    welcome: { name: 'README.md', content: '# Welcome to MDE\n\n> This is a genuinely interactive mini workspace. Edit the source and watch the preview update instantly.\n\n## Writing starts with focus\n\nMDE brings **reliable saving**, *live preview*, and `Markdown` tools into a quiet workspace.\n\n- [x] Write safely on your device\n- [x] Check layout in split view\n- [ ] Publish the next article\n\n```javascript\nconst idea = \'Keep it simple, keep writing\';\nconsole.log(idea);\n```\n\nUse the controls above to switch between **source / split / preview**.' },
    features: { name: 'Feature Tour.md', content: '# Feature Tour\n\nMDE provides a complete yet focused toolkit for everyday Markdown work.\n\n| Capability | Experience |\n| --- | --- |\n| Workspace | File tree and multiple tabs |\n| Preview | GFM, code blocks, tables, and diagrams |\n| Safety | Atomic saves and recovery snapshots |\n| Sync | Optional cloud sync with conflict handling |\n\n## Design principles\n\n1. Your content always belongs to you\n2. Complex features appear only when needed\n3. Every state remains visible' },
    shortcuts: { name: 'Shortcuts.md', content: '# Common Shortcuts\n\n| Action | Windows / Linux | macOS |\n| --- | --- | --- |\n| Bold | Ctrl + B | ⌘ + B |\n| Italic | Ctrl + I | ⌘ + I |\n| Save | Ctrl + S | ⌘ + S |\n| Search | Ctrl + K | ⌘ + K |\n\n> The demo supports bold, italic, and simulated save shortcuts.\n\n## Today\n\n- [x] Organize sources\n- [ ] Finish the draft\n- [ ] Review and publish' },
    appJsx: { ...documents.appJsx }, editorJs: { ...documents.editorJs }, mainRs: { ...documents.mainRs }, mainKt: { ...documents.mainKt },
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
  const scrollCue = document.querySelector('#scroll-cue');

  const updateScrollCue = () => {
    const hidden = window.scrollY > 16;
    scrollCue?.classList.toggle('is-hidden', hidden);
    scrollCue?.setAttribute('aria-hidden', String(hidden));
    if (scrollCue) scrollCue.tabIndex = hidden ? -1 : 0;
  };
  window.addEventListener('scroll', updateScrollCue, { passive: true });
  updateScrollCue();

  const revealBlocks = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealBlocks.forEach((block) => revealObserver.observe(block));
  } else {
    revealBlocks.forEach((block) => block.classList.add('is-visible'));
  }

  const storyWorkspacePreview = document.querySelector('#story-workspace-preview');
  const storySidebarTabs = [...document.querySelectorAll('[data-story-sidebar-view]')];
  const storySidebarPanels = [...document.querySelectorAll('[data-story-sidebar-panel]')];
  storySidebarTabs.forEach((tab, index) => tab.addEventListener('click', () => {
    storyWorkspacePreview.dataset.active = String(index);
    storySidebarTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    storySidebarPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.storySidebarPanel === tab.dataset.storySidebarView));
  }));

  const storyFilePanel = document.querySelector('[data-story-sidebar-panel="files"]');
  const storyFileHeading = storyFilePanel?.querySelector('.story-sidebar-heading');
  const storyFileNav = storyFilePanel?.querySelector('.story-sidebar-nav');
  if (storyFileHeading) storyFileHeading.innerHTML = '<strong>文件</strong><span><button type="button" aria-label="排序"><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h12M3 18h6"/></svg></button><button type="button" aria-label="新建文件"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button><button type="button" aria-label="保存"><svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg></button><i></i><button type="button" aria-label="打开文件夹 / 恢复演示"><svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg></button></span>';
  if (storyFileNav) storyFileNav.innerHTML = '<button type="button" aria-label="后退" class="is-disabled"><svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button><button type="button" aria-label="前进" class="is-disabled"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button><button type="button" aria-label="上一级" data-story-folder-up><svg viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></button><i></i><button type="button" aria-label="刷新"><svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button><button type="button" aria-label="在资源管理器中打开"><svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></button><i></i><button type="button" aria-label="关闭文件夹"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  const storyFileTree = document.querySelector('.story-file-tree');
  const storyFolderBreadcrumb = document.querySelector('.story-sidebar-path');
  const storyFolderUp = document.querySelector('[data-story-folder-up]');
  const storyFolderBack = storyFileNav?.querySelector('button[aria-label="后退"]');
  const storyFolderForward = storyFileNav?.querySelector('button[aria-label="前进"]');
  const storyFolderContents = {
    '': { folders: ['src'], files: ['README.md', 'vite.config.js'] },
    src: { folders: [], files: ['App.jsx', 'editor.js'] },
  };
  const storyFolderIcon = '<svg class="story-folder-icon" viewBox="0 0 32 32" aria-hidden="true"><path fill="#8d6e63" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><rect width="18" height="6" x="14" y="22" fill="#d7ccc8" rx="1"/></svg>';
  const storyMarkdownIcon = '<svg class="story-md-icon" viewBox="0 0 32 32" aria-hidden="true"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>';
  const storyJavascriptIcon = '<svg class="story-code-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>';
  const storyReactIcon = '<svg class="story-code-icon" viewBox="0 0 32 32" aria-hidden="true"><path fill="#00bcd4" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4-12-2.59-12-4 4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6 14-2.686 14-6-6.268-6-14-6"/><path fill="#00bcd4" d="M16 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/><path fill="#00bcd4" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493 3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#00bcd4" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>';
  const storyFileIcon = (fileName) => fileName.endsWith('.jsx') ? storyReactIcon : fileName.endsWith('.js') ? storyJavascriptIcon : storyMarkdownIcon;
  const storyRecentList = document.querySelector('.story-recent-list');
  if (storyRecentList) storyRecentList.innerHTML = [
    ['README.md', 'mde-workspace'], ['App.jsx', 'src'], ['vite.config.js', 'mde-workspace'],
  ].map(([file, path]) => `<div><span class="story-recent-icon">${storyFileIcon(file)}</span><span><strong>${file}</strong><small>${path}</small></span></div>`).join('');
  const storyWorkspaceIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>';
  const storyChevronIcon = '<svg class="story-breadcrumb-chevron" viewBox="0 0 1024 1024" aria-hidden="true"><path d="M704 514.368a52.864 52.864 0 0 1-15.808 37.888L415.872 819.2a55.296 55.296 0 0 1-73.984-2.752 52.608 52.608 0 0 1-2.816-72.512l233.6-228.928-233.6-228.992a52.736 52.736 0 0 1-17.536-53.056 53.952 53.952 0 0 1 40.192-39.424c19.904-4.672 40.832 1.92 54.144 17.216l272.32 266.88c9.92 9.792 15.616 23.04 15.808 36.8z" fill="currentColor"/></svg>';
  let storyFolder = '';
  let storyFolderHistory = [''];
  let storyFolderHistoryIndex = 0;

  function navigateStoryFolder(nextFolder, record = true) {
    const target = Object.hasOwn(storyFolderContents, nextFolder) ? nextFolder : '';
    if (record && target !== storyFolder) {
      storyFolderHistory = storyFolderHistory.slice(0, storyFolderHistoryIndex + 1);
      storyFolderHistory.push(target);
      storyFolderHistoryIndex = storyFolderHistory.length - 1;
    }
    renderStoryFolder(target);
  }

  function renderStoryFolder(nextFolder = '') {
    if (!storyFileTree || !storyFolderBreadcrumb) return;
    storyFolder = Object.hasOwn(storyFolderContents, nextFolder) ? nextFolder : '';
    const content = storyFolderContents[storyFolder];
    storyFolderBreadcrumb.innerHTML = `${storyWorkspaceIcon}<button type="button" data-story-folder-root>mde-workspace</button>${storyFolder ? `${storyChevronIcon}<button type="button" aria-current="page">${storyFolder}</button>` : ''}`;
    storyFileTree.innerHTML = [
      ...content.folders.map((folder) => `<button type="button" data-story-folder="${folder}">${storyFolderIcon}<span>${folder}</span></button>`),
      ...content.files.map((file, index) => `<button type="button" data-story-file class="${index === 0 ? 'active' : ''}">${storyFileIcon(file)}<span>${localize(file)}</span></button>`),
    ].join('');
    storyFolderBreadcrumb.querySelector('[data-story-folder-root]')?.addEventListener('click', () => navigateStoryFolder(''));
    storyFileTree.querySelectorAll('[data-story-folder]').forEach((button) => button.addEventListener('click', () => navigateStoryFolder(button.dataset.storyFolder)));
    storyFileTree.querySelectorAll('[data-story-file]').forEach((button) => button.addEventListener('click', () => {
      storyFileTree.querySelectorAll('[data-story-file]').forEach((item) => item.classList.toggle('active', item === button));
    }));
    if (storyFolderUp) {
      storyFolderUp.classList.toggle('is-disabled', !storyFolder);
      storyFolderUp.setAttribute('aria-disabled', String(!storyFolder));
      storyFolderUp.tabIndex = storyFolder ? 0 : -1;
    }
    storyFolderBack?.classList.toggle('is-disabled', storyFolderHistoryIndex === 0);
    storyFolderBack?.setAttribute('aria-disabled', String(storyFolderHistoryIndex === 0));
    storyFolderForward?.classList.toggle('is-disabled', storyFolderHistoryIndex >= storyFolderHistory.length - 1);
    storyFolderForward?.setAttribute('aria-disabled', String(storyFolderHistoryIndex >= storyFolderHistory.length - 1));
  }
  storyFolderBack?.addEventListener('click', () => {
    if (storyFolderHistoryIndex === 0) return;
    storyFolderHistoryIndex -= 1;
    navigateStoryFolder(storyFolderHistory[storyFolderHistoryIndex], false);
  });
  storyFolderForward?.addEventListener('click', () => {
    if (storyFolderHistoryIndex >= storyFolderHistory.length - 1) return;
    storyFolderHistoryIndex += 1;
    navigateStoryFolder(storyFolderHistory[storyFolderHistoryIndex], false);
  });
  storyFolderUp?.addEventListener('click', () => { if (storyFolder) navigateStoryFolder(''); });
  renderStoryFolder();

  const runtimeModules = [...document.querySelectorAll('[data-runtime-module]')];
  runtimeModules.forEach((moduleButton) => moduleButton.addEventListener('click', () => {
    runtimeModules.forEach((item) => {
      const active = item === moduleButton;
      item.classList.toggle('active', active);
      const status = item.querySelector('em');
      if (status) status.textContent = localize(active ? '已载入' : '按需');
    });
  }));

  const storyFormatToolbar = document.querySelector('.story-format-toolbar');
  if (storyFormatToolbar) storyFormatToolbar.innerHTML = '<span class="story-format-toolbar__grip"><svg viewBox="0 0 16 24"><circle cx="5" cy="6" r="1.5"/><circle cx="11" cy="6" r="1.5"/><circle cx="5" cy="12" r="1.5"/><circle cx="11" cy="12" r="1.5"/><circle cx="5" cy="18" r="1.5"/><circle cx="11" cy="18" r="1.5"/></svg></span><span class="story-format-sep" data-story-format-action></span><button type="button" data-story-format-action aria-label="粗体"><b>B</b></button><button type="button" data-story-format-action aria-label="斜体"><i>I</i></button><button type="button" data-story-format-action aria-label="删除线"><s>S</s></button><span class="story-format-sep" data-story-format-action></span><button type="button" data-story-format-action aria-label="标题"><b>H</b></button><button type="button" data-story-format-action aria-label="引用"><svg viewBox="0 0 24 24"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .001 0 1.003 1 1.003z"/></svg></button><button type="button" data-story-format-action aria-label="表格"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg></button><button type="button" data-story-format-action aria-label="代码块"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></button><span class="story-format-sep" data-story-format-action></span><button type="button" data-story-format-collapse aria-label="收起工具栏"><svg viewBox="0 0 24 24"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg></button>';
  storyFormatToolbar?.querySelectorAll('button[data-story-format-action]').forEach((button) => button.addEventListener('click', () => button.classList.toggle('active')));
  storyFormatToolbar?.querySelector('[data-story-format-collapse]')?.addEventListener('click', (event) => {
    const collapsed = storyFormatToolbar.classList.toggle('is-collapsed');
    event.currentTarget.setAttribute('aria-expanded', String(!collapsed));
  });

  const storyEditorPreview = document.querySelector('#story-editor-preview');
  const storyEditorTabs = [...document.querySelectorAll('[data-story-editor-mode]')];
  const storyEditorPanels = [...document.querySelectorAll('[data-story-editor-panel]')];
  storyEditorTabs.forEach((tab) => tab.addEventListener('click', () => {
    storyEditorPreview.dataset.editorMode = tab.dataset.storyEditorMode;
    storyEditorTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    storyEditorPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.storyEditorPanel === tab.dataset.storyEditorMode));
  }));

  const storySplit = document.querySelector('.split-mini');
  const storySplitSource = storySplit?.querySelector('.source-mini');
  if (storySplit && storySplitSource && !storySplit.querySelector('.split-mini__divider')) {
    storySplitSource.insertAdjacentHTML('afterend', '<button class="split-mini__divider" type="button" aria-label="拖动调整分栏"><i></i></button>');
  }
  const storySplitDivider = storySplit?.querySelector('.split-mini__divider');
  const setStorySplit = (percentage) => storySplit?.style.setProperty('--story-split', `${Math.min(72, Math.max(28, percentage))}%`);
  storySplitDivider?.addEventListener('pointerdown', (event) => {
    storySplitDivider.setPointerCapture(event.pointerId);
    storySplitDivider.classList.add('dragging');
  });
  storySplitDivider?.addEventListener('pointermove', (event) => {
    if (!storySplitDivider.hasPointerCapture(event.pointerId)) return;
    const bounds = storySplit.getBoundingClientRect();
    setStorySplit(((event.clientX - bounds.left) / bounds.width) * 100);
  });
  const stopStorySplitDrag = (event) => {
    if (storySplitDivider?.hasPointerCapture(event.pointerId)) storySplitDivider.releasePointerCapture(event.pointerId);
    storySplitDivider?.classList.remove('dragging');
  };
  storySplitDivider?.addEventListener('pointerup', stopStorySplitDrag);
  storySplitDivider?.addEventListener('pointercancel', stopStorySplitDrag);
  storySplitDivider?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const current = Number.parseFloat(storySplit.style.getPropertyValue('--story-split')) || 50;
    setStorySplit(current + (event.key === 'ArrowRight' ? 4 : -4));
  });

  const storyOutlineList = document.querySelector('.story-outline-list');
  const storyRootToggle = document.querySelector('[data-story-outline-toggle=""]');
  const storyWorkspaceToggle = document.querySelector('[data-story-outline-toggle="workspace"]');
  const setStoryOutlineCollapsed = (scope, collapsed) => {
    const root = scope === 'root';
    storyOutlineList.classList.toggle(root ? 'root-collapsed' : 'workspace-collapsed', collapsed);
    (root ? storyRootToggle : storyWorkspaceToggle)?.classList.toggle('collapsed', collapsed);
  };
  storyRootToggle?.addEventListener('click', () => setStoryOutlineCollapsed('root', !storyOutlineList.classList.contains('root-collapsed')));
  storyWorkspaceToggle?.addEventListener('click', () => setStoryOutlineCollapsed('workspace', !storyOutlineList.classList.contains('workspace-collapsed')));
  document.querySelector('[data-story-outline-action="collapse"]')?.addEventListener('click', () => setStoryOutlineCollapsed('root', true));
  document.querySelector('[data-story-outline-action="expand"]')?.addEventListener('click', () => {
    setStoryOutlineCollapsed('root', false);
    setStoryOutlineCollapsed('workspace', false);
  });
  let currentDocument = 'welcome';
  let untitledCount = 1;
  let isCreatingFile = false;
  let creatingFileName = '';
  let folderPath = [];
  let folderHistory = [[]];
  let folderHistoryIndex = 0;
  let breadcrumbExpanded = false;
  const collapsedOutlineLines = new Set();
  let viewMode = 'split';
  let markdownViewMode = 'split';
  let renderTimer = 0;
  let saveTimer = 0;
  let toastTimer = 0;
  let outlineAnimationTimer = 0;
  let editorThemeTransitioning = false;

  function setSidebarHidden(hidden) {
    sidebar.classList.toggle('hidden', hidden);
    frame.classList.toggle('sidebar-open', mobileMedia.matches && !hidden);
  }

  function syncResponsiveDemo(isMobile) {
    setSidebarHidden(isMobile);
    frame.classList.toggle('mobile-layout', isMobile);
    input.setAttribute('wrap', isMobile ? 'soft' : 'off');
    splitToggle.classList.toggle('is-disabled', isMobile);
    splitToggle.setAttribute('aria-disabled', String(isMobile));
    if (isMobile) {
      formatToolbar.classList.remove('ft--show');
      document.querySelector('#toolbar-toggle').classList.remove('active');
    }
    if (isMobile && viewMode === 'split') updateViewMode('edit', false);
    if (!isMobile && documentLanguage() === 'markdown' && viewMode !== markdownViewMode) updateViewMode(markdownViewMode, false);
  }

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const markdownFileSvg = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#42a5f5" d="m14 10-4 3.5L6 10H4v12h4v-6l2 2 2-2v6h4V10zm12 6v-6h-4v6h-4l6 8 6-8z"/></svg>';
  const javascriptFileSvg = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#ffca28" d="M2 2v12h12V2zm6 6h1v4a1.003 1.003 0 0 1-1 1H7a1.003 1.003 0 0 1-1-1v-1h1v1h1zm3 0h2v1h-2v1h1a1.003 1.003 0 0 1 1 1v1a1.003 1.003 0 0 1-1 1h-2v-1h2v-1h-1a1.003 1.003 0 0 1-1-1V9a1.003 1.003 0 0 1 1-1"/></svg>';
  const kotlinFileSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="mde-kotlin-gradient" x1="1.725" x2="22.185" y1="22.67" y2="1.982" gradientTransform="translate(1.306 1.129)scale(.89324)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7c4dff"/><stop offset=".5" stop-color="#d500f9"/><stop offset="1" stop-color="#ef5350"/></linearGradient></defs><path fill="url(#mde-kotlin-gradient)" d="M2.975 2.976v18.048h18.05v-.03l-4.478-4.511-4.48-4.515 4.48-4.515 4.443-4.477z"/></svg>';
  const rustFileSvg = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#ff7043" d="m30 12-4-2V6h-4l-2-4-4 2-4-2-2 4H6v4l-4 2 2 4-2 4 4 2v4h4l2 4 4-2 4 2 2-4h4v-4l4-2-2-4ZM6 16a9.9 9.9 0 0 1 .842-4H10v8H6.842A9.9 9.9 0 0 1 6 16m10 10a9.98 9.98 0 0 1-7.978-4H16v-2h-2v-2h4c.819.819.297 2.308 1.179 3.37a1.89 1.89 0 0 0 1.46.63h3.34A9.98 9.98 0 0 1 16 26m-2-12v-2h4a1 1 0 0 1 0 2Zm11.158 6H24a2.006 2.006 0 0 1-2-2 2 2 0 0 0-2-2 3 3 0 0 0 3-3q0-.08-.004-.161A3.115 3.115 0 0 0 19.83 10H8.022a9.986 9.986 0 0 1 17.136 10"/></svg>';
  const reactFileSvg = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#00bcd4" d="M16 12c7.444 0 12 2.59 12 4s-4.556 4-12 4-12-2.59-12-4 4.556-4 12-4m0-2c-7.732 0-14 2.686-14 6s6.268 6 14 6 14-2.686 14-6-6.268-6-14-6"/><path fill="#00bcd4" d="M16 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2"/><path fill="#00bcd4" d="M10.458 5.507c2.017 0 5.937 3.177 9.006 8.493 3.722 6.447 3.757 11.687 2.536 12.392a.9.9 0 0 1-.457.1c-2.017 0-5.938-3.176-9.007-8.492C8.814 11.553 8.779 6.313 10 5.608a.9.9 0 0 1 .458-.1m-.001-2A2.87 2.87 0 0 0 9 3.875C6.13 5.532 6.938 12.304 10.804 19c3.284 5.69 7.72 9.493 10.74 9.493A2.87 2.87 0 0 0 23 28.124c2.87-1.656 2.062-8.428-1.804-15.124-3.284-5.69-7.72-9.493-10.74-9.493Z"/><path fill="#00bcd4" d="M21.543 5.507a.9.9 0 0 1 .457.1c1.221.706 1.186 5.946-2.536 12.393-3.07 5.316-6.99 8.493-9.007 8.493a.9.9 0 0 1-.457-.1C8.779 25.686 8.814 20.446 12.536 14c3.07-5.316 6.99-8.493 9.007-8.493m0-2c-3.02 0-7.455 3.804-10.74 9.493C6.939 19.696 6.13 26.468 9 28.124a2.87 2.87 0 0 0 1.457.369c3.02 0 7.455-3.804 10.74-9.493C25.061 12.304 25.87 5.532 23 3.876a2.87 2.87 0 0 0-1.457-.369"/></svg>';
  function fileIconForName(fileName, wrapperClass = 'file-icon') {
    const lowerName = String(fileName).toLowerCase();
    const svg = lowerName.endsWith('.jsx') || lowerName.endsWith('.tsx') ? reactFileSvg
      : lowerName.endsWith('.js') || lowerName.endsWith('.mjs') || lowerName.endsWith('.cjs') ? javascriptFileSvg
        : lowerName.endsWith('.kt') || lowerName.endsWith('.kts') ? kotlinFileSvg
          : lowerName.endsWith('.rs') ? rustFileSvg : markdownFileSvg;
    return `<span class="${wrapperClass}">${svg}</span>`;
  }
  const markdownFileIcon = fileIconForName('README.md');
  const folderFileIcon = '<span class="folder-icon"><svg viewBox="0 0 32 32"><path class="folder-icon__body" d="m13.844 7.536-1.288-1.072A2 2 0 0 0 11.276 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H15.124a2 2 0 0 1-1.28-.464"/><rect class="folder-icon__label" width="18" height="6" x="14" y="22" rx="1"/></svg></span>';
  const breadcrumbChevron = '<svg class="breadcrumb-chevron" viewBox="0 0 1024 1024" aria-hidden="true"><path d="M704 514.368a52.864 52.864 0 0 1-15.808 37.888L415.872 819.2a55.296 55.296 0 0 1-73.984-2.752 52.608 52.608 0 0 1-2.816-72.512l233.6-228.928-233.6-228.992a52.736 52.736 0 0 1-17.536-53.056 53.952 53.952 0 0 1 40.192-39.424c19.904-4.672 40.832 1.92 54.144 17.216l272.32 266.88c9.92 9.792 15.616 23.04 15.808 36.8z" fill="currentColor"/></svg>';
  const demoRecentList = document.querySelector('.recent-list');
  if (demoRecentList) demoRecentList.innerHTML = [
    ['appJsx', 'src'], ['mainRs', 'src-tauri/src'], ['mainKt', 'src-tauri/gen/android/app/src/main/java'],
  ].map(([key, path]) => `<button class="recent-item" type="button" data-document="${key}">${fileIconForName(documents[key].name, 'recent-icon')}<span><strong>${escapeHtml(documents[key].name)}</strong><small>${path}</small></span></button>`).join('');

  const codeKeywordsByLanguage = {
    javascript: new Set(['as', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return', 'static', 'switch', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield']),
    kotlin: new Set(['as', 'break', 'class', 'continue', 'do', 'else', 'false', 'for', 'fun', 'if', 'import', 'in', 'interface', 'is', 'null', 'object', 'override', 'package', 'return', 'super', 'this', 'throw', 'true', 'try', 'typealias', 'val', 'var', 'when', 'while']),
    rust: new Set(['as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn', 'else', 'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while']),
  };
  const codeConstants = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity', 'this']);

  function documentLanguage(key = currentDocument) {
    const name = documents[key]?.name?.toLowerCase() || '';
    if (/\.jsx?$/.test(name) || /\.mjs$/.test(name) || /\.cjs$/.test(name)) return 'javascript';
    if (/\.kts?$/.test(name)) return 'kotlin';
    if (name.endsWith('.rs')) return 'rust';
    return 'markdown';
  }

  function highlightCode(source, language = 'javascript') {
    const codeKeywords = codeKeywordsByLanguage[language] || codeKeywordsByLanguage.javascript;
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
    let fencedLanguage = '';
    return source.replace(/\r\n?/g, '\n').split('\n').map((line) => {
      const fence = line.match(/^(\s*```)(.*)$/);
      if (fence) {
        fencedLanguage = fencedLanguage ? '' : (fence[2].trim().toLowerCase() || 'javascript');
        return `<span class="tok-markup">${escapeHtml(fence[1])}</span><span class="tok-name">${escapeHtml(fence[2])}</span>`;
      }
      if (fencedLanguage) return highlightCode(line, /^(?:kt|kotlin)$/.test(fencedLanguage) ? 'kotlin' : /^(?:rs|rust)$/.test(fencedLanguage) ? 'rust' : 'javascript');
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
    const activeLanguage = documentLanguage();
    if (activeLanguage !== 'markdown') {
      preview.innerHTML = `<pre class="shiki shiki--document" data-language="${activeLanguage}"><code>${highlightCode(source, activeLanguage)}</code></pre>`;
      return;
    }
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
        const normalizedLanguage = /^(?:kt|kotlin)$/i.test(language) ? 'kotlin' : /^(?:rs|rust)$/i.test(language) ? 'rust' : 'javascript';
        const highlighted = /^(?:js|jsx|ts|tsx|javascript|typescript|json|kt|kotlin|rs|rust)$/i.test(language) ? highlightCode(code.join('\n'), normalizedLanguage) : escapeHtml(code.join('\n'));
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
    const activeLanguage = documentLanguage();
    sourceHighlight.innerHTML = `${activeLanguage === 'markdown' ? highlightMarkdownSource(input.value) : highlightCode(input.value, activeLanguage)}\n`;
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
      return `<button class="file-item${active}" type="button" data-document="${entry.key}">${fileIconForName(document.name)}<span>${escapeHtml(localize(document.name))}</span><i class="file-delete">×</i></button>`;
    }).join('') + (isCreatingFile
      ? `<div class="file-item file-item--creating">${markdownFileIcon}<input class="file-item-input" value="${escapeHtml(creatingFileName)}" placeholder="${localize('输入文件名并回车')}" aria-label="${localize('新文件名')}"></div>`
      : '');
    const breadcrumbParts = ['mde-workspace', ...folderPath];
    const breadcrumbPath = document.querySelector('#file-breadcrumb-path');
    const shouldCollapseBreadcrumb = breadcrumbParts.length > 3 && !breadcrumbExpanded;
    const breadcrumbPart = (part, index, withChevron = index > 0) => `<span class="file-breadcrumb__item">${withChevron ? breadcrumbChevron : ''}<span class="file-breadcrumb__part" data-breadcrumb-index="${index}">${escapeHtml(part)}</span></span>`;
    breadcrumbPath.innerHTML = shouldCollapseBreadcrumb
      ? `${breadcrumbPart(breadcrumbParts[0], 0, false)}<span class="file-breadcrumb__item">${breadcrumbChevron}<button class="file-breadcrumb__ellipsis" type="button" data-breadcrumb-expand aria-label="${localize('展开完整路径')}">…</button></span>${breadcrumbPart(breadcrumbParts.at(-1), breadcrumbParts.length - 1)}`
      : breadcrumbParts.map((part, index) => breadcrumbPart(part, index)).join('');
    const breadcrumb = breadcrumbPath.closest('.file-breadcrumb');
    breadcrumb.querySelector('.file-breadcrumb__collapse')?.remove();
    if (breadcrumbParts.length > 3 && breadcrumbExpanded) {
      breadcrumb.insertAdjacentHTML('beforeend', `<button class="file-breadcrumb__collapse" type="button" data-breadcrumb-collapse aria-label="${localize('折叠路径')}" title="${localize('折叠路径')}"><svg viewBox="0 0 1024 1024" aria-hidden="true"><path d="M704 514.368a52.864 52.864 0 0 1-15.808 37.888L415.872 819.2a55.296 55.296 0 0 1-73.984-2.752 52.608 52.608 0 0 1-2.816-72.512l233.6-228.928-233.6-228.992a52.736 52.736 0 0 1-17.536-53.056 53.952 53.952 0 0 1 40.192-39.424c19.904-4.672 40.832 1.92 54.144 17.216l272.32 266.88c9.92 9.792 15.616 23.04 15.808 36.8z" fill="currentColor"/></svg></button>`);
    }
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
    breadcrumbExpanded = false;
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
    if (tab) {
      tab.querySelector('.file-icon')?.replaceWith(document.createRange().createContextualFragment(fileIconForName(documents[key].name)));
      const tabName = tab.querySelector('.tab-name');
      if (tabName) tabName.textContent = localize(documents[key].name);
      return tab;
    }
    tab = document.createElement('div');
    tab.className = 'demo-tab';
    tab.dataset.tabDocument = key;
    tab.innerHTML = `${fileIconForName(documents[key].name)}<span class="tab-name">${escapeHtml(localize(documents[key].name))}</span><i></i><button class="tab-close" type="button" title="${localize('关闭标签')}"><svg viewBox="0 0 24 24"><path d="m18 6-12 12M6 6l12 12"/></svg></button>`;
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
    const isMarkdown = documentLanguage(key) === 'markdown';
    frame.classList.toggle('code-document', !isMarkdown);
    if (isMarkdown) {
      updateViewMode(mobileMedia.matches && markdownViewMode === 'split' ? 'edit' : markdownViewMode, false);
    } else {
      formatToolbar.classList.remove('ft--show');
      document.querySelector('#toolbar-toggle').classList.remove('active');
      updateViewMode('edit', false);
    }
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

  function setControlTooltip(element, label) {
    if (!element) return;
    element.dataset.tooltipSource = label;
    element.removeAttribute('title');
  }

  function updateViewMode(nextMode, rememberMarkdownMode = true) {
    if (documentLanguage() !== 'markdown') nextMode = 'edit';
    if (mobileMedia.matches && nextMode === 'split') nextMode = 'edit';
    viewMode = nextMode;
    if (rememberMarkdownMode && documentLanguage() === 'markdown') markdownViewMode = nextMode;
    workspace.classList.remove('mode-edit', 'mode-split', 'mode-preview');
    workspace.classList.add(`mode-${viewMode}`);
    splitToggle.classList.toggle('active', viewMode === 'split');
    modeToggle.classList.toggle('active', viewMode === 'preview');
    demoFooter.classList.toggle('previewing', viewMode === 'preview');
    setControlTooltip(modeToggle, localize(viewMode === 'preview' ? '返回源码编辑' : '切换到预览'));
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
  document.querySelector('.file-breadcrumb').addEventListener('click', (event) => {
    if (event.target.closest('[data-breadcrumb-expand]')) {
      breadcrumbExpanded = true;
      renderFileTree();
      return;
    }
    if (event.target.closest('[data-breadcrumb-collapse]')) {
      breadcrumbExpanded = false;
      renderFileTree();
      return;
    }
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
  splitToggle.addEventListener('click', () => {
    if (mobileMedia.matches) {
      notify('窄屏空间不足，分屏模式已禁用，请使用源码或预览模式。');
      return;
    }
    updateViewMode(viewMode === 'split' ? 'edit' : 'split');
  });
  modeToggle.addEventListener('click', () => updateViewMode(viewMode === 'preview' ? 'edit' : 'preview'));
  document.querySelector('#toolbar-toggle').addEventListener('click', (event) => {
    if (mobileMedia.matches || documentLanguage() !== 'markdown') return;
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

  // Reproduce MDE's compact Ant Design tooltip instead of relying on native browser titles.
  const tooltip = document.createElement('div');
  tooltip.className = 'mde-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.innerHTML = '<span></span><i></i>';
  document.body.appendChild(tooltip);
  let tooltipTarget = null;
  let tooltipTimer = 0;
  const tooltipSelector = '[title], button[aria-label], a[aria-label], [data-tooltip-source]';
  const tooltipText = (target) => {
    const source = target.dataset.tooltipSource || target.getAttribute('title') || target.getAttribute('aria-label');
    return source ? localize(source) : '';
  };
  function hideTooltip() {
    window.clearTimeout(tooltipTimer);
    tooltip.classList.remove('visible');
    tooltipTarget = null;
  }
  function showTooltip(target) {
    const label = tooltipText(target);
    if (!label || target.disabled) return;
    if (target.hasAttribute('title')) {
      target.dataset.tooltipSource = target.getAttribute('title');
      target.removeAttribute('title');
    }
    tooltipTarget = target;
    window.clearTimeout(tooltipTimer);
    tooltipTimer = window.setTimeout(() => {
      if (tooltipTarget !== target || !target.isConnected) return;
      tooltip.querySelector('span').textContent = label;
      tooltip.classList.remove('visible', 'below');
      const rect = target.getBoundingClientRect();
      tooltip.style.left = `${Math.min(innerWidth - 8, Math.max(8, rect.left + rect.width / 2))}px`;
      tooltip.style.top = `${rect.top}px`;
      if (rect.top < 44) {
        tooltip.classList.add('below');
        tooltip.style.top = `${rect.bottom}px`;
      }
      tooltip.classList.add('visible');
    }, 300);
  }
  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest?.(tooltipSelector);
    if (target && target !== tooltipTarget) showTooltip(target);
  });
  document.addEventListener('pointerout', (event) => {
    if (tooltipTarget && !tooltipTarget.contains(event.relatedTarget)) hideTooltip();
  });
  document.addEventListener('focusin', (event) => {
    const target = event.target.closest?.(tooltipSelector);
    if (target) showTooltip(target);
  });
  document.addEventListener('focusout', hideTooltip);
  window.addEventListener('scroll', hideTooltip, { passive: true, capture: true });

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
  mobileMedia.addEventListener('change', (event) => syncResponsiveDemo(event.matches));
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
  syncResponsiveDemo(mobileMedia.matches);
  syncDemoDocumentLocale(currentLocale);
  translateDom();
  updateViewMode(mobileMedia.matches ? 'edit' : 'split', !mobileMedia.matches);
  loadDocument('welcome');
})();
