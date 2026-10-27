import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * C# notes API.
 *
 * Reads the notes directory (NOTES_DIR for a real vault, otherwise the copy
 * bundled next to the site) and returns the note list, a note's Markdown and
 * its `.mgtree` outline. The tree parser mirrors the editor's format:
 * indentation defines depth, optional `>lang[n]` suffixes are code jumps.
 */
const CONTENT_DIR = process.env.NOTES_DIR || join(__dirname, '..', 'site', 'notes', 'csharp', 'content');

interface TreeNode {
  title: string;
  level: number;
  jump: { language: string; index: number } | null;
  children: TreeNode[];
}

const JUMP = />(c\+\+|[a-zA-Z][\w#-]*)(?:\[(\d+)\]|(\+\+)|\+=(\d+))?\s*$/i;

function parseTree(text: string): TreeNode[] {
  const roots: TreeNode[] = [];
  const stack: TreeNode[] = [];
  const indices = new Map<string, number>();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const indent = (line.match(/^[\t ]*/) || [''])[0].replace(/\t/g, '  ').length;
    const match = trimmed.match(JUMP);
    const inCodeSpan = match ? (trimmed.slice(0, match.index).match(/`/g) || []).length % 2 === 1 : false;
    let jump: TreeNode['jump'] = null;
    let title = trimmed;
    if (match && !inCodeSpan) {
      const language = match[1].toLowerCase();
      const previous = indices.get(language) || 0;
      const index = match[2] !== undefined
        ? Number(match[2])
        : match[3]
          ? previous + 1
          : match[4] !== undefined
            ? previous + Number(match[4])
            : previous || 1;
      if (match[2] !== undefined || match[3] || match[4] !== undefined) indices.set(language, index);
      jump = { language, index };
      title = trimmed.slice(0, match.index).trimEnd();
    }
    const node: TreeNode = { title, level: indent, jump, children: [] };
    while (stack.length && stack[stack.length - 1].level >= indent) stack.pop();
    if (stack.length) stack[stack.length - 1].children.push(node);
    else roots.push(node);
    stack.push(node);
  }
  return roots;
}

@Controller('notes/csharp/api')
export class NotesController {
  @Get('notes')
  list(@Res() response: Response): void {
    if (!existsSync(CONTENT_DIR)) {
      response.status(503).json({ message: 'Notes directory not found' });
      return;
    }
    const notes = readdirSync(CONTENT_DIR)
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const name = file.replace(/\.md$/, '');
        const matched = name.match(/^(\d+)[-_ ]*/);
        return {
          name,
          title: name.replace(/^\d+[-_ ]*/, ''),
          index: matched ? Number(matched[1]) : Number.MAX_SAFE_INTEGER,
        };
      })
      .sort((a, b) => a.index - b.index || a.name.localeCompare(b.name));
    response.status(200).setHeader('Cache-Control', 'public, max-age=0, must-revalidate').json({ notes });
  }

  @Get('note')
  note(@Query('name') name: string, @Res() response: Response): void {
    // Only plain note names; no path traversal.
    if (typeof name !== 'string' || !/^[\w\u4e00-\u9fa5-]+$/.test(name)) {
      response.status(400).json({ message: 'Invalid note name' });
      return;
    }
    const markdownPath = join(CONTENT_DIR, `${name}.md`);
    if (!existsSync(markdownPath)) {
      response.status(404).json({ message: 'Note not found' });
      return;
    }
    const baseName = name.replace(/^\d+[-_ ]*/, '');
    const treePath = join(CONTENT_DIR, 'trees', `${baseName}.mgtree`);
    const tree = existsSync(treePath) ? parseTree(readFileSync(treePath, 'utf8')) : [];
    response.status(200)
      .setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
      .json({ name, markdown: readFileSync(markdownPath, 'utf8'), tree });
  }
}
