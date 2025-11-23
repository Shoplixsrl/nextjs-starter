"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SpendingChart } from "@/components/charts/spending-chart";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { budgetCategories } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <Header />

        <AnimatedCard delay={0}>
          <GlassCard className="mb-6 p-5">
            <h2 className="mb-6 text-2xl font-bold">Financial Analytics</h2>

            {/* Charts Grid */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <IncomeExpenseChart />
              </div>
              <div>
                <SpendingChart />
              </div>
            </div>

            {/* Budget Overview */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Budget Tracking</h3>
              <div className="space-y-4">
                {budgetCategories.map((category, index) => {
                  const percentage = (category.spent / category.budget) * 100;
                  const isOverBudget = percentage > 100;

                  return (
                    <div
                      key={category.name}
                      className="rounded-lg bg-muted/30 p-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${category.spent} / ${category.budget}
                        </span>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className="h-2"
                        indicatorClassName={cn(
                          isOverBudget && "bg-destructive"
                        )}
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(0)}% used</span>
                        <span
                          className={cn(
                            isOverBudget ? "text-destructive" : "text-income"
                          )}
                        >
                          ${(category.budget - category.spent).toFixed(0)}{" "}
                          {isOverBudget ? "over" : "remaining"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </AnimatedCard>
      </div>

      <BottomNav />
    </div>
  );
}
