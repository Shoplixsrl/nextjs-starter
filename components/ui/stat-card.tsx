"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "./glass-card";
import { AnimatedCard } from "./animated-card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  delay = 0,
  className,
}: StatCardProps) {
  const isPositive = change ? change >= 0 : null;

  return (
    <AnimatedCard delay={delay}>
      <GlassCard className={cn("p-5", className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{value}</h3>
            {change !== undefined && (
              <p className="mt-2 flex items-center text-xs">
                <span
                  className={cn(
                    "font-medium",
                    isPositive ? "text-income" : "text-expense"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
                <span className="ml-1 text-muted-foreground">vs last month</span>
              </p>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </GlassCard>
    </AnimatedCard>
  );
}
