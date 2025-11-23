'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TextareaAutosize from 'react-textarea-autosize';
import { Eye, Edit3, Columns2 } from 'lucide-react';
import type { Note } from '@/lib/notes/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

type ViewMode = 'edit' | 'preview' | 'split';

export function Editor({ note, onUpdateNote }: EditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('split');

  // Sync local state with note prop
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
    // Only reset on note ID change to avoid resetting during edits
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id]);

  // Debounced save
  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        onUpdateNote(note.id, { title, content });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [title, content, note, onUpdateNote]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  if (!note) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Edit3 className="mx-auto h-12 w-12 mb-4 opacity-20" />
          <p className="text-lg">Select a note or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="text-sm text-muted-foreground">
          Last edited: {new Date(note.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>

        <div className="flex gap-1">
          <Button
            variant={viewMode === 'edit' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('edit')}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant={viewMode === 'split' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('split')}
          >
            <Columns2 className="h-4 w-4 mr-2" />
            Split
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('preview')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden">
        <div className={cn(
          "grid h-full",
          viewMode === 'split' ? 'grid-cols-2' : 'grid-cols-1'
        )}>
          {/* Edit Pane */}
          {(viewMode === 'edit' || viewMode === 'split') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "flex flex-col h-full overflow-y-auto p-6",
                viewMode === 'split' && "border-r"
              )}
            >
              <TextareaAutosize
                value={title}
                onChange={handleTitleChange}
                placeholder="Untitled"
                className="text-4xl font-bold mb-4 w-full resize-none bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
                maxRows={3}
              />

              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing..."
                className="flex-1 w-full resize-none bg-transparent border-none outline-none font-mono text-sm leading-relaxed placeholder:text-muted-foreground/50"
              />
            </motion.div>
          )}

          {/* Preview Pane */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full overflow-y-auto p-6 prose prose-neutral dark:prose-invert max-w-none"
            >
              <h1 className="text-4xl font-bold mb-6">{title || 'Untitled'}</h1>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  // Custom styling for markdown elements
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
                  ul: ({ node, ...props }) => <ul className="mb-4 ml-6 list-disc" {...props} />,
                  ol: ({ node, ...props }) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic my-4" {...props} />
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ node, ...props }) => (
                    <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-4" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-primary underline underline-offset-2 hover:text-primary/80" {...props} />
                  ),
                }}
              >
                {content || '*No content*'}
              </ReactMarkdown>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
