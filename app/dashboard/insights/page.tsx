'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Lightbulb,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

export default function InsightsPage() {
  const insights = {
    costSaving: [
      {
        id: 1,
        priority: 'high',
        title: 'Optimize Tomato Purchasing Schedule',
        description:
          'Historical data shows tomato prices drop 15% next week. Delaying your scheduled bulk order by 7 days will save approximately €245.',
        impact: { value: '€245', type: 'savings', period: 'one-time' },
        confidence: 92,
        actionItems: [
          'Delay purchase order PO-2847',
          'Use current inventory (sufficient for 10 days)',
          'Set reminder to order on Nov 30',
        ],
        status: 'active',
      },
      {
        id: 2,
        priority: 'medium',
        title: 'Switch to Seasonal Vegetables',
        description:
          'Zucchini and eggplant are currently 40% cheaper than off-season alternatives. Updating 3 recipes to use seasonal vegetables could reduce food cost by 3.2%.',
        impact: { value: '€320', type: 'savings', period: 'monthly' },
        confidence: 88,
        actionItems: [
          'Review recipes: Pasta Primavera, Ratatouille, Grilled Vegetables',
          'Update menu with seasonal specials',
          'Train kitchen staff on new recipes',
        ],
        status: 'active',
      },
    ],
    wasteReduction: [
      {
        id: 3,
        priority: 'critical',
        title: 'Carbonara Portion Size Issue',
        description:
          'Computer vision analysis shows Carbonara portions are 23% larger than the recipe standard. This leads to €890/month in unnecessary food waste.',
        impact: { value: '€890', type: 'savings', period: 'monthly' },
        confidence: 95,
        actionItems: [
          'Adjust recipe portion size from 380g to 310g',
          'Retrain kitchen staff on portioning',
          'Monitor with portion control cameras',
        ],
        status: 'active',
      },
      {
        id: 4,
        priority: 'high',
        title: 'Bread Waste from Overproduction',
        description:
          'Predictive analytics show you're producing 18% more bread than needed daily. Thursday and Monday show highest waste rates.',
        impact: { value: '€430', type: 'savings', period: 'monthly' },
        confidence: 91,
        actionItems: [
          'Reduce Thursday production by 20%',
          'Reduce Monday production by 15%',
          'Implement day-old bread specials',
        ],
        status: 'active',
      },
    ],
    revenueOpportunity: [
      {
        id: 5,
        priority: 'high',
        title: 'Margherita Pizza Underpriced',
        description:
          'Price elasticity analysis shows Margherita Pizza can support an 8% price increase with minimal demand impact. Competitor analysis confirms this is below market rate.',
        impact: { value: '€420', type: 'revenue', period: 'monthly' },
        confidence: 87,
        actionItems: [
          'Increase price from €12.50 to €13.50',
          'Monitor sales for 2 weeks',
          'A/B test with new menu design',
        ],
        status: 'active',
      },
      {
        id: 6,
        priority: 'medium',
        title: 'Bundle Opportunity Detected',
        description:
          'ML analysis shows 67% of customers ordering Carbonara also order a salad. Creating a combo deal could increase average order value by €4.20.',
        impact: { value: '€650', type: 'revenue', period: 'monthly' },
        confidence: 84,
        actionItems: [
          'Create "Pasta & Salad Combo" at €16.90',
          'Train staff to suggest combo',
          'Add to menu and POS system',
        ],
        status: 'active',
      },
    ],
  };

  const InsightCard = ({ insight }: { insight: any }) => {
    const priorityColors = {
      critical: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900',
      high: 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900',
      medium: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900',
      low: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900',
    };

    return (
      <Card className={`${priorityColors[insight.priority]} border-2`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={insight.priority === 'critical' ? 'destructive' : 'default'}
                  className="text-xs"
                >
                  {insight.priority}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {insight.confidence}% confidence
                </Badge>
              </div>
              <CardTitle className="text-lg">{insight.title}</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {insight.impact.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {insight.impact.period}
              </div>
            </div>
          </div>
          <CardDescription className="mt-2">{insight.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-indigo-500" />
              Recommended Actions
            </h4>
            <ul className="space-y-2">
              {insight.actionItems.map((action: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <ArrowRight className="h-4 w-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Implement
            </Button>
            <Button variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const totalSavings =
    [...insights.costSaving, ...insights.wasteReduction]
      .reduce((sum, i) => sum + parseFloat(i.impact.value.replace('€', '')), 0);

  const totalRevenue = insights.revenueOpportunity
    .reduce((sum, i) => sum + parseFloat(i.impact.value.replace('€', '')), 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-indigo-500" />
          AI Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Smart recommendations powered by machine learning and predictive analytics
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Potential Monthly Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              €{totalSavings.toFixed(0)}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              From {insights.costSaving.length + insights.wasteReduction.length} insights
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Revenue Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              €{totalRevenue.toFixed(0)}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              From {insights.revenueOpportunity.length} opportunities
            </p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Total Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              €{(totalSavings + totalRevenue).toFixed(0)}
            </div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              per month if implemented
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insights Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All Insights ({insights.costSaving.length + insights.wasteReduction.length + insights.revenueOpportunity.length})
          </TabsTrigger>
          <TabsTrigger value="savings">
            <DollarSign className="h-4 w-4 mr-2" />
            Cost Savings ({insights.costSaving.length})
          </TabsTrigger>
          <TabsTrigger value="waste">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Waste Reduction ({insights.wasteReduction.length})
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <TrendingUp className="h-4 w-4 mr-2" />
            Revenue ({insights.revenueOpportunity.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {[...insights.costSaving, ...insights.wasteReduction, ...insights.revenueOpportunity]
            .sort((a, b) => {
              const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          {insights.costSaving.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </TabsContent>

        <TabsContent value="waste" className="space-y-4">
          {insights.wasteReduction.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          {insights.revenueOpportunity.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
