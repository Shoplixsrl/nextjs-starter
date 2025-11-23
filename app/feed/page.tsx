"use client";

import { useState } from "react";
import { UserProfile } from "@/components/social/user-profile";
import { CreatePost } from "@/components/social/create-post";
import { Timeline } from "@/components/social/timeline";
import { TrendsSidebar } from "@/components/social/trends-sidebar";
import { currentUser, mockPosts, mockTrends } from "@/lib/data/mock-social";
import { Post as PostType } from "@/lib/types/social";
import { Separator } from "@/components/ui/separator";
import { Home, Search, Bell, Mail, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FeedPage() {
  const [posts, setPosts] = useState<PostType[]>(mockPosts);

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: PostType = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      image,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date(),
      liked: false,
      bookmarked: false,
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    console.log("Liked post:", postId);
  };

  const handleBookmark = (postId: string) => {
    console.log("Bookmarked post:", postId);
  };

  const handleShare = (postId: string) => {
    toast.success("Link copied to clipboard!");
    console.log("Shared post:", postId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Social
              </h1>

              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-primary/10"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-primary/10"
                >
                  <Search className="h-4 w-4" />
                  Explore
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - User Profile */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <UserProfile user={currentUser} />
            </div>
          </aside>

          {/* Center - Timeline */}
          <main className="lg:col-span-6 space-y-6">
            {/* Feed Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Your Feed
              </h2>
            </div>

            {/* Create Post */}
            <CreatePost user={currentUser} onPost={handleCreatePost} />

            <Separator className="my-6" />

            {/* Timeline */}
            <Timeline
              posts={posts}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onShare={handleShare}
            />
          </main>

          {/* Right Sidebar - Trends */}
          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-24">
              <TrendsSidebar trends={mockTrends} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
