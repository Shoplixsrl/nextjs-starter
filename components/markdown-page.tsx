'use client';

import { useState, useEffect } from 'react';
import { MarkdownViewer } from './markdown-viewer';
import { MarkdownEditor } from './markdown-editor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit, Save, Download, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface MarkdownPageProps {
  initialContent?: string;
  onSave?: (content: string) => void | Promise<void>;
  title?: string;
  showToolbar?: boolean;
  defaultMode?: 'view' | 'edit' | 'split';
}

const DEFAULT_CONTENT = `# Welcome to Markdown Editor

This is a **Notion/GitBook-style** Markdown editor with full support for reading and editing.

## Features

- ✅ **Live Preview** - See your changes in real-time
- ✅ **Split View** - Edit and preview simultaneously
- ✅ **Rich Formatting** - Support for all Markdown features
- ✅ **Syntax Highlighting** - Beautiful code blocks
- ✅ **Tables** - GitHub-flavored Markdown tables
- ✅ **Task Lists** - Interactive checkboxes

## Formatting Examples

### Text Styling

You can make text **bold**, *italic*, ~~strikethrough~~, or \`inline code\`.

### Lists

Bullet list:
- Item 1
- Item 2
  - Nested item
  - Another nested item

Numbered list:
1. First item
2. Second item
3. Third item

Task list:
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

### Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

### Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> — Someone Famous

### Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headings | ✅ | H1-H6 |
| Lists | ✅ | Ordered, unordered, tasks |
| Code | ✅ | Inline and blocks |
| Tables | ✅ | GitHub-flavored |
| Images | ✅ | With alt text |
| Links | ✅ | Internal and external |

### Links and Images

[Visit GitHub](https://github.com)

![Placeholder](https://via.placeholder.com/600x200?text=Markdown+Image)

### Horizontal Rule

---

## Getting Started

Click the **Edit** button to start writing your own content!
`;

export function MarkdownPage({
  initialContent = DEFAULT_CONTENT,
  onSave,
  title = 'Markdown Page',
  showToolbar = true,
  defaultMode = 'split',
}: MarkdownPageProps) {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<'view' | 'edit' | 'split'>(defaultMode);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(content);
      toast.success('Your changes have been saved successfully.');
    } catch (error) {
      toast.error('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Markdown file has been downloaded.');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Markdown content copied to clipboard.');
    } catch (error) {
      toast.error('Failed to copy to clipboard.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      {showToolbar && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {onSave && (
              <Button onClick={handleSave} disabled={isSaving} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="h-full">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="view"
                className="rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                className="rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </TabsTrigger>
              <TabsTrigger
                value="split"
                className="rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Split View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="view" className="h-[calc(100%-3rem)] m-0 overflow-auto">
            <div className="max-w-4xl mx-auto p-8">
              <MarkdownViewer content={content} />
            </div>
          </TabsContent>

          <TabsContent value="edit" className="h-[calc(100%-3rem)] m-0 overflow-auto">
            <div className="h-full p-4">
              <MarkdownEditor content={content} onChange={setContent} className="h-full" />
            </div>
          </TabsContent>

          <TabsContent value="split" className="h-[calc(100%-3rem)] m-0">
            <div className="grid grid-cols-2 h-full divide-x divide-gray-200 dark:divide-gray-700">
              <div className="overflow-auto p-4">
                <MarkdownEditor content={content} onChange={setContent} className="h-full" />
              </div>
              <div className="overflow-auto p-8">
                <MarkdownViewer content={content} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
