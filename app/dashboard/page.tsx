import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data - in production this would come from the database
  const stats = [
    {
      title: 'Food Cost %',
      value: '28.5%',
      change: -2.3,
      target: '30%',
      icon: DollarSign,
      trend: 'down',
      description: '2.3% below target',
    },
    {
      title: 'Total Inventory Value',
      value: '$12,450',
      change: 5.2,
      icon: Package,
      trend: 'up',
      description: 'Across 3 locations',
    },
    {
      title: 'Waste Cost (This Month)',
      value: '$1,234',
      change: -12.5,
      icon: AlertTriangle,
      trend: 'down',
      description: '12.5% reduction vs last month',
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: 8.1,
      icon: TrendingUp,
      trend: 'up',
      description: 'This month',
    },
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'cost_saving',
      priority: 'high',
      title: 'Optimize Tomato Purchases',
      description: 'AI predicts 15% price drop next week. Delay large purchases to save ~$245.',
      impact: '$245',
      action: 'Review',
    },
    {
      id: 2,
      type: 'waste_reduction',
      priority: 'critical',
      title: 'High Waste on Carbonara',
      description: 'Portion sizes 23% larger than standard. Adjust recipe to reduce waste.',
      impact: '$890/mo',
      action: 'Adjust Recipe',
    },
    {
      id: 3,
      type: 'revenue_opportunity',
      priority: 'medium',
      title: 'Underpriced Menu Items',
      description: 'Margherita Pizza could support 8% price increase based on cost & demand analysis.',
      impact: '+$420/mo',
      action: 'Review Pricing',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Welcome back! Here's what's happening with your restaurant.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'down' && stat.title.includes('Waste') ||
                            stat.trend === 'down' && stat.title.includes('Cost') ||
                            stat.trend === 'up' && !stat.title.includes('Waste');

          return (
            <Card key={stat.title} className="border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`flex items-center text-xs font-medium ${
                      isPositive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Insights */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription className="mt-1">
                Smart recommendations to optimize your operations
              </CardDescription>
            </div>
            <Link href="/dashboard/insights">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge
                      variant={
                        insight.priority === 'critical'
                          ? 'destructive'
                          : insight.priority === 'high'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      Impact: {insight.impact}
                    </span>
                  </div>
                </div>
                <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors cursor-pointer">
          <Link href="/dashboard/recipes">
            <CardHeader>
              <CardTitle className="text-base">Create Recipe</CardTitle>
              <CardDescription>
                Add a new recipe with cost calculations
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors cursor-pointer">
          <Link href="/dashboard/orders">
            <CardHeader>
              <CardTitle className="text-base">New Purchase Order</CardTitle>
              <CardDescription>
                Order ingredients from suppliers
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors cursor-pointer">
          <Link href="/dashboard/waste">
            <CardHeader>
              <CardTitle className="text-base">Log Waste</CardTitle>
              <CardDescription>
                Track and analyze food waste
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
}
