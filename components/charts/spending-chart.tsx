"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { categorySpending } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCard } from "@/components/ui/animated-card";

export function SpendingChart() {
  return (
    <AnimatedCard delay={0.2}>
      <GlassCard className="p-5">
        <h3 className="mb-4 text-lg font-semibold">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categorySpending}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="amount"
              animationDuration={600}
              animationBegin={0}
            >
              {categorySpending.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem" }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </GlassCard>
    </AnimatedCard>
  );
}
