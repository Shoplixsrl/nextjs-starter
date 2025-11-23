"use client";

import { User } from "@/lib/types/social";
import { formatNumber } from "@/lib/data/mock-social";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Settings } from "lucide-react";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-background via-background to-muted/20 border-border/50 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <Avatar className="h-16 w-16 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {user.verified && (
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{user.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{user.username}</p>
        {user.bio && (
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{formatNumber(user.following)}</span>
          <span className="text-muted-foreground">Following</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">{formatNumber(user.followers)}</span>
          <span className="text-muted-foreground">Followers</span>
        </div>
      </div>
    </Card>
  );
}
