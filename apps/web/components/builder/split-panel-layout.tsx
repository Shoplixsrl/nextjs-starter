"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable-panels";
import { ChatInterface } from "@/components/chat/chat-interface";
import { StorePreview } from "@/components/preview/store-preview";

export function SplitPanelLayout() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      {/* Chat Panel */}
      <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
        <ChatInterface />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Preview Panel */}
      <ResizablePanel defaultSize={60} minSize={40}>
        <StorePreview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
