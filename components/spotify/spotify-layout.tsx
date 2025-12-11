"use client";

import { SpotifySidebar } from "./spotify-sidebar";
import { SpotifyPlayer } from "./spotify-player";
import { PlayerProvider } from "@/lib/player-context";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SpotifyLayoutProps {
  children: React.ReactNode;
}

export function SpotifyLayout({ children }: SpotifyLayoutProps) {
  return (
    <PlayerProvider>
      <div className="h-screen flex flex-col bg-black overflow-hidden">
        {/* Main Content Area */}
        <div className="flex flex-1 gap-2 p-2 pb-0 overflow-hidden">
          {/* Sidebar */}
          <SpotifySidebar />

          {/* Main Content */}
          <main className="flex-1 bg-[#121212] rounded-lg overflow-hidden">
            <ScrollArea className="h-full spotify-scrollbar">
              {children}
            </ScrollArea>
          </main>
        </div>

        {/* Player */}
        <SpotifyPlayer />
      </div>
    </PlayerProvider>
  );
}
