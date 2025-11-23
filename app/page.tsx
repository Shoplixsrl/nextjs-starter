import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import {
  metricsData,
  revenueData,
  categoryData,
  performanceData,
  recentTransactions,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="animate-in">
          <h1 className="text-3xl font-bold tracking-tight font-mono">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's your financial overview for today.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricsData.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <RevenueChart data={revenueData} />
          </div>
          <div className="lg:col-span-3">
            <PerformanceChart data={performanceData} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <CategoryChart data={categoryData} />
          <TransactionsTable transactions={recentTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}
