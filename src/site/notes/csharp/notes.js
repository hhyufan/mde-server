/**
 * C# notes reader.
 *
 * Left: the note's real `.mgtree` outline (indentation + optional code jump).
 * Right: the note rendered with MokiDown's own `.md-preview` styles.
 * Reading only — no source editor. Prev/next note, keyboard, swipe and pinch
 * zoom are supported.
 */
(function () {
  'use strict';

  const API = '/notes/csharp/api';
  const LAST_KEY = 'mokidown-notes-csharp-last';
  const SCALE_KEY = 'mokidown-notes-csharp-scale';

  const state = {
    notes: [],
    index: 0,
    note: null,
    scale: Number(localStorage.getItem(SCALE_KEY)) || 1,
    expanded: new Set(),
  };

  // ── Markdown (dependency-free subset matching the editor's structure) ────
  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const inline = (text) => escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  const renderMarkdown = (markdown) => {
    const lines = String(markdown).replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let list = null;
    let inCode = false;
    let codeLines = [];
    let codeLang = '';
    let inQuote = false;

    const flush = () => {
      if (!paragraph.length) return;
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    };
    const closeList = () => { if (list) { html.push(`</${list}>`); list = null; } };
    const closeQuote = () => { if (inQuote) { html.push('</blockquote>'); inQuote = false; } };

    for (const line of lines) {
      const fence = line.match(/^```(\w*)\s*$/);
      if (fence) {
        if (inCode) {
          html.push(`<pre><code data-lang="${escapeHtml(codeLang)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
          inCode = false; codeLines = []; codeLang = '';
        } else {
          flush(); closeList(); closeQuote();
          inCode = true; codeLang = fence[1] || '';
        }
        continue;
      }
      if (inCode) { codeLines.push(line); continue; }
      if (!line.trim()) { flush(); closeList(); closeQuote(); continue; }

      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        flush(); closeList(); closeQuote();
        const level = heading[1].length;
        html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
        continue;
      }

      if (/^>\s?/.test(line)) {
        flush(); closeList();
        if (!inQuote) { html.push('<blockquote>'); inQuote = true; }
        html.push(`<p>${inline(line.replace(/^>\s?/, ''))}</p>`);
        continue;
      }
      closeQuote();

      const bullet = line.match(/^\s*[-*+]\s+(.*)$/);
      if (bullet) {
        flush();
        if (list !== 'ul') { closeList(); html.push('<ul>'); list = 'ul'; }
        html.push(`<li>${inline(bullet[1])}</li>`);
        continue;
      }
      const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
      if (numbered) {
        flush();
        if (list !== 'ol') { closeList(); html.push('<ol>'); list = 'ol'; }
        html.push(`<li>${inline(numbered[1])}</li>`);
        continue;
      }
      closeList();

      if (/^\|.*\|$/.test(line)) {
        const rows = [];
        let cursor = lines.indexOf(line);
        while (cursor < lines.length && /^\|.*\|$/.test(lines[cursor])) { rows.push(lines[cursor]); cursor += 1; }
        if (rows.length >= 2) {
          flush();
          const cells = (row) => row.slice(1, -1).split('|').map((cell) => cell.trim());
          html.push('<table><thead><tr>');
          for (const cell of cells(rows[0])) html.push(`<th>${inline(cell)}</th>`);
          html.push('</tr></thead><tbody>');
          for (const row of rows.slice(2)) {
            html.push('<tr>');
            for (const cell of cells(row)) html.push(`<td>${inline(cell)}</td>`);
            html.push('</tr>');
          }
          html.push('</tbody></table>');
          lines.splice(lines.indexOf(line), rows.length);
          continue;
        }
      }

      if (/^---+$/.test(line.trim())) { flush(); html.push('<hr />'); continue; }
      paragraph.push(line.trim());
    }
    if (inCode) html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    flush(); closeList(); closeQuote();
    return html.join('\n');
  };

  // ── DOM ──────────────────────────────────────────────────────────────────
  const treeEl = document.getElementById('notes-tree');
  const treeTitleEl = document.getElementById('notes-tree-title');
  const countEl = document.getElementById('notes-count');
  const previewEl = document.getElementById('notes-preview');
  const scrollEl = document.getElementById('notes-preview-scroll');
  const positionEl = document.getElementById('notes-position');
  const prevBtn = document.getElementById('notes-prev');
  const nextBtn = document.getElementById('notes-next');
  const zoomOut = document.getElementById('notes-zoom-out');
  const zoomIn = document.getElementById('notes-zoom-in');
  const zoomLabel = document.getElementById('notes-zoom-label');
  const themeBtn = document.getElementById('theme-toggle');

  // ── Theme ────────────────────────────────────────────────────────────────
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeBtn?.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  setTheme(document.documentElement.dataset.theme || 'light');
  themeBtn?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('mokidown-home-theme', next); } catch {}
  });

  // ── Tree ────────────────────────────────────────────────────────────────
  const countNodes = (nodes) => nodes.reduce((sum, node) => sum + 1 + countNodes(node.children || []), 0);

  const renderTree = (tree) => {
    countEl.textContent = String(countNodes(tree));
    treeEl.replaceChildren();
    if (!tree.length) {
      const empty = document.createElement('li');
      empty.className = 'notes-tree__empty';
      empty.textContent = '这篇笔记没有大纲';
      treeEl.append(empty);
      return;
    }
    const walk = (items, container) => {
      for (const node of items) {
        const li = document.createElement('li');
        li.className = 'notes-node';
        const row = document.createElement('div');
        row.className = 'notes-node__row';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'notes-node__toggle';
        toggle.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m6 3 5 5-5 5"/></svg>';
        if (!node.children || !node.children.length) toggle.classList.add('is-leaf');
        toggle.addEventListener('click', (event) => {
          event.stopPropagation();
          const key = nodeKey(node);
          if (state.expanded.has(key)) state.expanded.delete(key);
          else state.expanded.add(key);
          renderTree(state.note?.tree || []);
        });

        const title = document.createElement('button');
        title.type = 'button';
        title.className = 'notes-node__title';
        renderTitle(title, node.title);
        title.title = node.title;
        title.addEventListener('click', () => jumpToNode(node));

        row.append(toggle, title);
        li.append(row);

        if (node.children && node.children.length) {
          const open = state.expanded.has(nodeKey(node));
          li.classList.toggle('is-open', open);
          const ul = document.createElement('ul');
          ul.className = 'notes-node__children';
          if (!open) ul.hidden = true;
          walk(node.children, ul);
          li.append(ul);
        }
        container.append(li);
      }
    };
    walk(tree, treeEl);
  };

  // Outline titles may contain inline code (`global.json`); render it as a chip.
  const renderTitle = (element, title) => {
    for (const part of String(title).split(/(`[^`]+`)/g)) {
      if (!part) continue;
      if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
        const code = document.createElement('code');
        code.textContent = part.slice(1, -1);
        element.append(code);
      } else {
        element.append(document.createTextNode(part));
      }
    }
  };

  // Keys are text based: the API does not expose line numbers.
  const nodeKey = (node) => `${node.title}@${node.level}@${(node.children || []).length}`;

  const jumpToNode = (node) => {
    // A jump points at the n-th code block; otherwise look for a heading with
    // the same text.
    if (node.jump) {
      const blocks = previewEl.querySelectorAll('pre');
      const target = blocks[node.jump.index - 1];
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); target.classList.add('is-flash'); setTimeout(() => target.classList.remove('is-flash'), 900); return; }
    }
    const clean = String(node.title).replace(/`/g, '').trim();
    const headings = [...previewEl.querySelectorAll('h1,h2,h3,h4,h5,h6')];
    const match = headings.find((heading) => heading.textContent.includes(clean));
    if (match) { match.scrollIntoView({ behavior: 'smooth', block: 'start' }); match.classList.add('is-flash'); setTimeout(() => match.classList.remove('is-flash'), 900); }
  };

  // ── Notes ───────────────────────────────────────────────────────────────
  const syncChrome = () => {
    positionEl.textContent = state.notes.length ? `${state.index + 1} / ${state.notes.length}` : '–';
    prevBtn.disabled = state.index <= 0;
    nextBtn.disabled = state.index >= state.notes.length - 1;
    if (state.note) treeTitleEl.textContent = state.note.title || '知识树';
  };

  const applyScale = () => {
    const clamped = Math.min(1.8, Math.max(0.8, state.scale));
    state.scale = Math.round(clamped * 100) / 100;
    previewEl.style.zoom = String(state.scale);
    zoomLabel.textContent = `${Math.round(state.scale * 100)}%`;
    try { localStorage.setItem(SCALE_KEY, String(state.scale)); } catch {}
  };

  const loadNote = async (index) => {
    const entry = state.notes[index];
    if (!entry) return;
    state.index = index;
    try {
      const response = await fetch(`${API}/note?name=${encodeURIComponent(entry.name)}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      state.note = { ...entry, ...data };
      state.expanded = new Set();
      // Auto-expand the first two levels so the outline is useful immediately.
      const expand = (nodes, depth) => {
        for (const node of nodes) {
          if (depth < 2 && node.children?.length) state.expanded.add(nodeKey(node));
          if (node.children?.length) expand(node.children, depth + 1);
        }
      };
      expand(data.tree || [], 0);
      previewEl.innerHTML = renderMarkdown(data.markdown || '');
      renderTree(data.tree || []);
      scrollEl.scrollTop = 0;
      syncChrome();
      try { localStorage.setItem(LAST_KEY, entry.name); } catch {}
    } catch (error) {
      previewEl.innerHTML = `<p class="notes-placeholder">无法加载笔记：${escapeHtml(error.message)}</p>`;
    }
  };

  const step = (delta) => {
    const next = state.index + delta;
    if (next >= 0 && next < state.notes.length) loadNote(next);
  };

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  zoomOut.addEventListener('click', () => { state.scale -= 0.1; applyScale(); });
  zoomIn.addEventListener('click', () => { state.scale += 0.1; applyScale(); });

  // ── Outline width (drag the divider) ────────────────────────────────────
  const resizerEl = document.getElementById('notes-resizer');
  const sidebarEl = document.getElementById('notes-sidebar');
  const WIDTH_KEY = 'mokidown-notes-csharp-sidebar';
  const applyWidth = (width) => {
    const clamped = Math.round(Math.max(220, Math.min(520, width)));
    document.documentElement.style.setProperty('--notes-sidebar', clamped + 'px');
    try { localStorage.setItem(WIDTH_KEY, String(clamped)); } catch {}
  };
  applyWidth(Number(localStorage.getItem(WIDTH_KEY)) || 272);
  let dragging = null;
  resizerEl.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    resizerEl.setPointerCapture(event.pointerId);
    resizerEl.classList.add('is-dragging');
    dragging = { x: event.clientX, width: sidebarEl.getBoundingClientRect().width };
  });
  resizerEl.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    applyWidth(dragging.width + event.clientX - dragging.x);
  });
  const endDrag = () => { dragging = null; resizerEl.classList.remove('is-dragging'); };
  resizerEl.addEventListener('pointerup', endDrag);
  resizerEl.addEventListener('pointercancel', endDrag);
  resizerEl.addEventListener('lostpointercapture', endDrag);
  resizerEl.addEventListener('dblclick', () => applyWidth(272));

  // ── Zoom gestures ───────────────────────────────────────────────────────
  let pinchStart = 0;
  let pinchBase = 1;
  const distance = (touches) => Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  );
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 2) return;
    pinchStart = distance(event.touches);
    pinchBase = state.scale;
  }, { passive: true });
  document.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 2 || !pinchStart) return;
    event.preventDefault();
    state.scale = pinchBase * (distance(event.touches) / pinchStart);
    applyScale();
  }, { passive: false });
  document.addEventListener('touchend', (event) => {
    if (event.touches.length < 2) pinchStart = 0;
  }, { passive: true });

  // ── Swipe to change note ────────────────────────────────────────────────
  let swipeX = 0;
  let swipeY = 0;
  let swiping = false;
  scrollEl.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;
    swiping = true;
    swipeX = event.touches[0].clientX;
    swipeY = event.touches[0].clientY;
  }, { passive: true });
  scrollEl.addEventListener('touchend', (event) => {
    if (!swiping) return;
    swiping = false;
    const dx = event.changedTouches[0].clientX - swipeX;
    const dy = event.changedTouches[0].clientY - swipeY;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ── Keyboard ────────────────────────────────────────────────────────────
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if ((event.ctrlKey || event.metaKey) && (event.key === '=' || event.key === '+')) {
      event.preventDefault(); state.scale += 0.1; applyScale();
    }
    if ((event.ctrlKey || event.metaKey) && event.key === '-') {
      event.preventDefault(); state.scale -= 0.1; applyScale();
    }
  });

  // ── Boot ────────────────────────────────────────────────────────────────
  (async () => {
    applyScale();
    try {
      const response = await fetch(`${API}/notes`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      state.notes = data.notes || [];
      const wanted = localStorage.getItem(LAST_KEY);
      const index = Math.max(0, state.notes.findIndex((note) => note.name === wanted));
      syncChrome();
      await loadNote(index);
    } catch (error) {
      previewEl.innerHTML = `<p class="notes-placeholder">无法加载笔记列表：${escapeHtml(error.message)}</p>`;
    }
  })();
})();
