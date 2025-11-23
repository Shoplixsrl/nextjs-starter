'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Star,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Sparkles,
  DollarSign,
} from 'lucide-react';

export default function MenuEngineeringPage() {
  // Menu engineering matrix categorization
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      category: 'Stars', // High profit, high popularity
      price: 12.50,
      cost: 2.45,
      margin: 10.05,
      marginPercent: 80.4,
      popularity: 95,
      salesVolume: 450,
      revenue: 5625,
      profitContribution: 4522.50,
      recommendation: 'Maintain quality and price. Feature prominently on menu.',
      color: 'green',
    },
    {
      id: 2,
      name: 'Truffle Risotto',
      category: 'Puzzles', // High profit, low popularity
      price: 18.00,
      cost: 4.50,
      margin: 13.50,
      marginPercent: 75.0,
      popularity: 45,
      salesVolume: 80,
      revenue: 1440,
      profitContribution: 1080,
      recommendation: 'High margin but low sales. Increase visibility or reduce portion cost.',
      color: 'blue',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      category: 'Plow horses', // Low profit, high popularity
      price: 8.50,
      cost: 2.90,
      margin: 5.60,
      marginPercent: 65.9,
      popularity: 88,
      salesVolume: 380,
      revenue: 3230,
      profitContribution: 2128,
      recommendation: 'Popular but low margin. Consider small price increase or cost reduction.',
      color: 'yellow',
    },
    {
      id: 4,
      name: 'Seafood Platter',
      category: 'Dogs', // Low profit, low popularity
      price: 24.00,
      cost: 12.00,
      margin: 12.00,
      marginPercent: 50.0,
      popularity: 32,
      salesVolume: 45,
      revenue: 1080,
      profitContribution: 540,
      recommendation: 'Remove from menu or significantly improve recipe/pricing.',
      color: 'red',
    },
  ];

  const categoryInfo = {
    Stars: {
      description: 'High profit & popularity',
      icon: Star,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-900',
    },
    Puzzles: {
      description: 'High profit, low popularity',
      icon: AlertCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-900',
    },
    'Plow horses': {
      description: 'Low profit, high popularity',
      icon: TrendingDown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-900',
    },
    Dogs: {
      description: 'Low profit & popularity',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-900',
    },
  };

  const totalRevenue = menuItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = menuItems.reduce((sum, item) => sum + item.profitContribution, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-indigo-500" />
          Menu Engineering
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          AI-powered menu optimization using profitability and popularity analysis
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Stars (High Performers)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {menuItems.filter((i) => i.category === 'Stars').length}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Keep promoting these
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Items Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {menuItems.filter((i) => i.category === 'Dogs' || i.category === 'Puzzles').length}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Optimize or remove
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Engineering Matrix</CardTitle>
          <CardDescription>
            Items categorized by profitability and popularity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(categoryInfo).map(([category, info]) => {
              const Icon = info.icon;
              return (
                <div
                  key={category}
                  className={`p-4 rounded-lg border-2 ${info.bgColor} ${info.borderColor}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-5 w-5 ${info.color}`} />
                    <h3 className={`font-semibold ${info.color}`}>{category}</h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of each menu item's performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Popularity</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Profit Contribution</TableHead>
                <TableHead>AI Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => {
                const categoryConfig = categoryInfo[item.category];
                const Icon = categoryConfig.icon;

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${categoryConfig.bgColor} ${categoryConfig.color} border-0`}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">€{item.price.toFixed(2)}</div>
                        <div className="text-xs text-slate-500">
                          Cost: €{item.cost.toFixed(2)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">€{item.margin.toFixed(2)}</div>
                        <div className="text-xs text-slate-500">
                          {item.marginPercent.toFixed(1)}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${item.popularity}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{item.popularity}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.salesVolume} units</div>
                        <div className="text-xs text-slate-500">
                          €{item.revenue.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">
                        €{item.profitContribution.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.recommendation}
                        </p>
                        <Button size="sm" className="mt-2" variant="outline">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Optimize
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            AI Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-950 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold">Promote Your Stars</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Feature Margherita Pizza more prominently. Consider upsell strategies with
                high-margin add-ons to increase average ticket by 12%.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-950 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold">Fix Your Puzzles</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Truffle Risotto has great margins but low sales. Improve menu placement,
                add appealing description, or create a tasting menu featuring it.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-950 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold">Eliminate Your Dogs</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Seafood Platter is underperforming. Consider removing it or completely
                redesigning the recipe with better cost structure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
