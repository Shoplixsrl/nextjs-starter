'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Calendar,
} from 'lucide-react';

export default function AnalyticsPage() {
  const kpis = [
    {
      title: 'Total Revenue',
      value: '€45,230',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      period: 'This month',
    },
    {
      title: 'Food Cost %',
      value: '28.5%',
      change: -2.3,
      trend: 'down',
      icon: Package,
      period: 'This month',
      target: '30%',
    },
    {
      title: 'Avg Order Value',
      value: '€24.50',
      change: 5.2,
      trend: 'up',
      icon: ShoppingCart,
      period: 'Last 30 days',
    },
    {
      title: 'Customer Count',
      value: '1,847',
      change: 8.7,
      trend: 'up',
      icon: Users,
      period: 'This month',
    },
  ];

  const topItems = [
    { name: 'Margherita Pizza', sales: 450, revenue: 5625, trend: 5 },
    { name: 'Carbonara Pasta', sales: 380, revenue: 4560, trend: -2 },
    { name: 'Caesar Salad', sales: 340, revenue: 2890, trend: 12 },
    { name: 'Truffle Risotto', sales: 280, revenue: 5040, trend: 8 },
    { name: 'Tiramisu', sales: 250, revenue: 2000, trend: 3 },
  ];

  const costAnalysis = [
    { category: 'Meat & Seafood', cost: 8450, percent: 34.4, trend: -1.2 },
    { category: 'Vegetables', cost: 4230, percent: 17.2, trend: 2.3 },
    { category: 'Dairy', cost: 3890, percent: 15.8, trend: -0.5 },
    { category: 'Grains & Pasta', cost: 2670, percent: 10.9, trend: 1.1 },
    { category: 'Others', cost: 5327, percent: 21.7, trend: 0.8 },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-indigo-500" />
          Analytics & Reports
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Comprehensive insights into your restaurant performance
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend === 'up';

          return (
            <Card key={kpi.title} className="border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`flex items-center text-xs font-medium ${
                      isPositive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(kpi.change)}%
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {kpi.period}
                  </span>
                </div>
                {kpi.target && (
                  <p className="text-xs text-slate-500 mt-1">Target: {kpi.target}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="menu">Menu Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Selling Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>Best performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topItems.map((item, idx) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-slate-500">
                            {item.sales} orders • €{item.revenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          item.trend > 0
                            ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400'
                            : 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                        }
                      >
                        {item.trend > 0 ? '+' : ''}
                        {item.trend}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales by Day */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Day of Week</CardTitle>
                <CardDescription>Average daily performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { day: 'Friday', amount: 6780, percent: 95 },
                    { day: 'Saturday', amount: 7120, percent: 100 },
                    { day: 'Thursday', amount: 5890, percent: 82 },
                    { day: 'Wednesday', amount: 5340, percent: 75 },
                    { day: 'Tuesday', amount: 4560, percent: 64 },
                    { day: 'Sunday', amount: 4230, percent: 59 },
                    { day: 'Monday', amount: 3890, percent: 54 },
                  ].map((day) => (
                    <div key={day.day}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{day.day}</span>
                        <span className="text-sm font-semibold">€{day.amount}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${day.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown by Category</CardTitle>
              <CardDescription>Total: €24,567 this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costAnalysis.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{category.category}</span>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="secondary"
                              className={
                                category.trend < 0
                                  ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400'
                                  : 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                              }
                            >
                              {category.trend > 0 ? '+' : ''}
                              {category.trend}%
                            </Badge>
                            <span className="font-semibold">€{category.cost}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                              style={{ width: `${category.percent}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400 w-12 text-right">
                            {category.percent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Performance Matrix</CardTitle>
              <CardDescription>
                Items categorized by profitability and popularity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                See detailed menu engineering analysis in the{' '}
                <a
                  href="/dashboard/menu-engineering"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Menu Engineering
                </a>{' '}
                page
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Calendar className="h-5 w-5 inline mr-2" />
                Trend Analysis
              </CardTitle>
              <CardDescription>Historical performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Advanced trend charts and forecasting coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
