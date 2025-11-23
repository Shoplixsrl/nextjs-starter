"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Target, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: "trendingUp" | "users" | "target" | "dollarSign";
}

const iconMap = {
  trendingUp: TrendingUp,
  users: Users,
  target: Target,
  dollarSign: DollarSign,
};

export function MetricCard({ label, value, change, changeLabel, icon }: MetricCardProps) {
  const Icon = iconMap[icon];
  const isPositive = change > 0;

  return (
    <Card className="relative overflow-hidden hover:shadow-lg group animate-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight font-mono">{value}</div>
        <div className="flex items-center gap-1 mt-2">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">{changeLabel}</span>
        </div>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100" />
    </Card>
  );
}
