'use client';

import { MarkdownPage } from '@/components/markdown-page';
import { useState } from 'react';

export default function MarkdownDemo() {
  const [savedContent, setSavedContent] = useState<string>('');

  const handleSave = async (content: string) => {
    // Simulate saving to a backend
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSavedContent(content);
    console.log('Content saved:', content);
  };

  return (
    <div className="h-screen">
      <MarkdownPage
        title="Markdown Editor Demo"
        onSave={handleSave}
        showToolbar={true}
        defaultMode="split"
      />
    </div>
  );
}
