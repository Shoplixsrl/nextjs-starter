'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link2,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Table,
  Code2,
  CheckSquare,
} from 'lucide-react';

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function MarkdownEditor({ content, onChange, className = '' }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newText =
      content.substring(0, start) +
      before +
      textToInsert +
      after +
      content.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertAtLine = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = content.substring(0, start);
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;

    const newText =
      content.substring(0, lineStart) +
      prefix +
      content.substring(lineStart);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Heading1, label: 'H1', action: () => insertAtLine('# ') },
    { icon: Heading2, label: 'H2', action: () => insertAtLine('## ') },
    { icon: Heading3, label: 'H3', action: () => insertAtLine('### ') },
    { icon: Bold, label: 'Bold', action: () => insertMarkdown('**', '**', 'bold text') },
    { icon: Italic, label: 'Italic', action: () => insertMarkdown('*', '*', 'italic text') },
    { icon: Strikethrough, label: 'Strikethrough', action: () => insertMarkdown('~~', '~~', 'strikethrough') },
    { icon: Code, label: 'Inline Code', action: () => insertMarkdown('`', '`', 'code') },
    {
      icon: Code2,
      label: 'Code Block',
      action: () => insertMarkdown('\n```\n', '\n```\n', 'code block'),
    },
    { icon: Link2, label: 'Link', action: () => insertMarkdown('[', '](url)', 'link text') },
    { icon: Image, label: 'Image', action: () => insertMarkdown('![', '](url)', 'alt text') },
    { icon: List, label: 'Bullet List', action: () => insertAtLine('- ') },
    { icon: ListOrdered, label: 'Numbered List', action: () => insertAtLine('1. ') },
    { icon: CheckSquare, label: 'Task List', action: () => insertAtLine('- [ ] ') },
    { icon: Quote, label: 'Quote', action: () => insertAtLine('> ') },
    {
      icon: Table,
      label: 'Table',
      action: () =>
        insertMarkdown(
          '\n| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n',
          '',
          ''
        ),
    },
  ];

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="h-8 w-8 p-0"
            title={button.label}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Editor */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        className="flex-1 min-h-[500px] p-4 font-mono text-sm border-x border-b border-gray-200 dark:border-gray-700 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-950 resize-y"
        placeholder="Write your markdown here..."
      />
    </div>
  );
}
