"use client";

import { useState, useEffect } from "react";
import { Post as PostType } from "@/lib/types/social";
import { Post } from "./post";
import { Skeleton } from "@/components/ui/skeleton";

interface TimelineProps {
  posts: PostType[];
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function Timeline({ posts, onLike, onBookmark, onShare }: TimelineProps) {
  const [visiblePosts, setVisiblePosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and animate posts appearing
    setIsLoading(true);
    const timer = setTimeout(() => {
      setVisiblePosts(posts);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [posts]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-6 rounded-lg border border-border/50 bg-card">
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {visiblePosts.map((post, index) => (
        <div
          key={post.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "backwards",
          }}
        >
          <Post
            post={post}
            onLike={onLike}
            onBookmark={onBookmark}
            onShare={onShare}
          />
        </div>
      ))}
    </div>
  );
}
