"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactions, Transaction } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState<"all" | "income" | "expense">("all");
  const [filterCategory, setFilterCategory] = React.useState<string>("all");

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter transactions
  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        filterType === "all" || transaction.type === filterType;
      const matchesCategory =
        filterCategory === "all" || transaction.category === filterCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, filterType, filterCategory]);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <Header />

        <AnimatedCard delay={0}>
          <GlassCard className="mb-6 p-5">
            <h2 className="mb-4 text-2xl font-bold">Transactions</h2>

            {/* Search and Filters */}
            <div className="mb-4 space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap gap-2">
                <Select value={filterType} onValueChange={(value) => setFilterType(value as "all" | "income" | "expense")}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(searchQuery || filterType !== "all" || filterCategory !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterType("all");
                      setFilterCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <p className="mb-3 text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>

            {/* Transactions List */}
            <div className="space-y-2">
              {filteredTransactions.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              ) : (
                filteredTransactions.map((transaction, index) => {
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
                        animationDelay: `${index * 30}ms`,
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
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {format(new Date(transaction.date), "MMM dd, yyyy")}
                            </span>
                            <span>•</span>
                            <span className="rounded-md bg-muted px-1.5 py-0.5">
                              {transaction.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={cn(
                            "text-base font-semibold",
                            isIncome ? "text-income" : "text-expense"
                          )}
                        >
                          {isIncome ? "+" : ""}$
                          {Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </GlassCard>
        </AnimatedCard>
      </div>

      <BottomNav />
    </div>
  );
}
