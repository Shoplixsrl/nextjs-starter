"use client";

import { Wallet, TrendingUp, ArrowDownCircle, PiggyBank } from "lucide-react";
import { Header } from "@/components/header";
import { StatCard } from "@/components/ui/stat-card";
import { SpendingChart } from "@/components/charts/spending-chart";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import { BottomNav } from "@/components/bottom-nav";
import { accountSummary } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <Header />

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={`$${accountSummary.balance.toLocaleString()}`}
            change={12.5}
            icon={Wallet}
            delay={0}
          />
          <StatCard
            title="Income"
            value={`$${accountSummary.income.toLocaleString()}`}
            change={8.2}
            icon={TrendingUp}
            delay={0.05}
          />
          <StatCard
            title="Expenses"
            value={`$${accountSummary.expenses.toLocaleString()}`}
            change={-3.1}
            icon={ArrowDownCircle}
            delay={0.1}
          />
          <StatCard
            title="Savings"
            value={`$${accountSummary.savings.toLocaleString()}`}
            change={15.7}
            icon={PiggyBank}
            delay={0.15}
          />
        </div>

        {/* Charts Section */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <IncomeExpenseChart />
          <SpendingChart />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <BottomNav />
    </div>
  );
}
