"use client";

import { useState, useRef } from "react";
import { User } from "@/lib/types/social";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Smile, MapPin, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CreatePostProps {
  user: User;
  onPost?: (content: string, image?: string) => void;
}

export function CreatePost({ user, onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !imagePreview) {
      toast.error("Please add some content or an image");
      return;
    }

    setIsPosting(true);

    // Simulate posting delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    onPost?.(content, imagePreview || undefined);

    // Reset form
    setContent("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsPosting(false);
    toast.success("Post created successfully!");
  };

  const canPost = (content.trim().length > 0 || imagePreview) && !isPosting;

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-border/50">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 ring-1 ring-border/50 flex-shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
            maxLength={500}
          />

          {imagePreview && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted/30">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-primary hover:text-primary hover:bg-primary/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-amber-500 hover:text-amber-500 hover:bg-amber-500/10"
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-blue-500 hover:text-blue-500 hover:bg-blue-500/10"
              >
                <MapPin className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <span
                  className={`text-xs ${
                    content.length > 450
                      ? "text-destructive font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {content.length}/500
                </span>
              )}
              <Button
                onClick={handlePost}
                disabled={!canPost}
                className="px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
