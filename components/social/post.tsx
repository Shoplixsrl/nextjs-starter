"use client";

import { useState } from "react";
import { Post as PostType } from "@/lib/types/social";
import { formatTimestamp, formatNumber } from "@/lib/data/mock-social";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  Flag,
  UserMinus,
  Link2,
  Volume2,
} from "lucide-react";
import Image from "next/image";

interface PostProps {
  post: PostType;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function Post({ post, onLike, onBookmark, onShare }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked || false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(post.id);
  };

  const handleShare = () => {
    onShare?.(post.id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="group p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 bg-gradient-to-br from-card via-card to-muted/10 border-border/50">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <Avatar className="h-12 w-12 ring-1 ring-border/50">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm truncate">
                    {post.author.name}
                  </h4>
                  {post.author.verified && (
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.author.username}</span>
                  <span>•</span>
                  <span>{formatTimestamp(post.timestamp)}</span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Bookmark className="h-4 w-4 mr-2" />
                  {isBookmarked ? "Remove bookmark" : "Bookmark"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Unfollow {post.author.username}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Mute {post.author.username}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Flag className="h-4 w-4 mr-2" />
                  Report post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {post.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted/30">
                <Image
                  src={post.image}
                  alt="Post image"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`gap-2 transition-all duration-200 ${
                  isLiked
                    ? "text-pink-500 hover:text-pink-600"
                    : "hover:text-pink-500"
                }`}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-200 ${
                    isLiked ? "fill-pink-500 scale-110" : ""
                  }`}
                />
                <span className="text-xs">{formatNumber(likes)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{formatNumber(post.comments)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="gap-2 hover:text-green-500 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-xs">{formatNumber(post.shares)}</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className={`h-8 w-8 transition-all duration-200 ${
                isBookmarked
                  ? "text-amber-500 hover:text-amber-600"
                  : "hover:text-amber-500"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 transition-all duration-200 ${
                  isBookmarked ? "fill-amber-500 scale-110" : ""
                }`}
              />
            </Button>
          </div>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={handleLike}>
          <Heart className="h-4 w-4 mr-2" />
          {isLiked ? "Unlike" : "Like"}
        </ContextMenuItem>
        <ContextMenuItem onClick={handleBookmark}>
          <Bookmark className="h-4 w-4 mr-2" />
          {isBookmarked ? "Remove bookmark" : "Bookmark"}
        </ContextMenuItem>
        <ContextMenuItem>
          <Link2 className="h-4 w-4 mr-2" />
          Copy link
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <UserMinus className="h-4 w-4 mr-2" />
          Unfollow {post.author.username}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive focus:text-destructive">
          <Flag className="h-4 w-4 mr-2" />
          Report
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
