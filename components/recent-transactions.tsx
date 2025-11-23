"use client";

import * as React from "react";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getRecentTransactions } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { cn } from "@/lib/utils";

export function RecentTransactions() {
  const transactions = getRecentTransactions(8);

  return (
    <AnimatedCard delay={0.4}>
      <GlassCard className="p-5">
        <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction, index) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={transaction.id}
                className={cn(
                  "flex items-center justify-between rounded-lg p-3 transition-all duration-180",
                  "hover:bg-muted/50"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isIncome
                        ? "bg-income/10 text-income"
                        : "bg-expense/10 text-expense"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isIncome ? "text-income" : "text-expense"
                    )}
                  >
                    {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </AnimatedCard>
  );
}
