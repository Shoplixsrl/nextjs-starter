"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyData } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCard } from "@/components/ui/animated-card";

export function IncomeExpenseChart() {
  return (
    <AnimatedCard delay={0.3}>
      <GlassCard className="p-5">
        <h3 className="mb-4 text-lg font-semibold">Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--income))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--income))"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--expense))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--expense))"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--savings))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--savings))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem" }}
              iconType="line"
              formatter={(value) => (
                <span className="text-foreground capitalize">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--income))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncome)"
              animationDuration={600}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--expense))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpense)"
              animationDuration={600}
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="hsl(var(--savings))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSavings)"
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </AnimatedCard>
  );
}
