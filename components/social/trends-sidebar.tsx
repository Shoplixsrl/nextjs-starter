"use client";

import { Trend } from "@/lib/types/social";
import { formatNumber } from "@/lib/data/mock-social";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TrendsSidebarProps {
  trends: Trend[];
}

export function TrendsSidebar({ trends }: TrendsSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Trends Card */}
      <Card className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Trending Now</h3>
        </div>

        <div className="space-y-4">
          {trends.slice(0, 5).map((trend, index) => (
            <div key={trend.id}>
              <button className="w-full text-left space-y-1.5 group hover:opacity-80 transition-opacity">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {trend.topic}
                      </span>
                      {index === 0 && (
                        <Sparkles className="h-3 w-3 text-amber-500 flex-shrink-0" />
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs mt-1 bg-muted/50"
                    >
                      {trend.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(trend.posts)} posts
                </p>
              </button>
              {index < 4 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-primary hover:underline">
          Show more trends
        </button>
      </Card>

      {/* Suggestions Card */}
      <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/5 border-border/50">
        <h3 className="font-semibold text-lg mb-4">Who to follow</h3>

        <div className="space-y-4">
          {[
            {
              name: "Design System Hub",
              handle: "@designsystem",
              followers: "12.5K",
            },
            {
              name: "UI Patterns",
              handle: "@uipatterns",
              followers: "8.9K",
            },
            {
              name: "Frontend Weekly",
              handle: "@frontendweekly",
              followers: "15.2K",
            },
          ].map((suggestion, index) => (
            <div key={index}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {suggestion.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.handle}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {suggestion.followers} followers
                  </p>
                </div>
                <button className="px-4 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex-shrink-0">
                  Follow
                </button>
              </div>
              {index < 2 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-primary hover:underline">
          Show more suggestions
        </button>
      </Card>
    </div>
  );
}
