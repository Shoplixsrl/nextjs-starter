'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertTriangle,
  Plus,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Camera,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';

export default function WasteTrackingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data
  const wasteLog = [
    {
      id: 1,
      date: new Date('2025-11-22'),
      item: 'Tomatoes',
      type: 'ingredient',
      quantity: 2.5,
      unit: 'kg',
      cost: 8.75,
      reason: 'spoilage',
      location: 'Main Kitchen',
      loggedBy: 'John Chef',
      aiAnalysis: 'Over-ordering detected. Reduce weekly order by 15%.',
    },
    {
      id: 2,
      date: new Date('2025-11-22'),
      item: 'Carbonara Pasta',
      type: 'prepared_food',
      quantity: 3,
      unit: 'portions',
      cost: 11.40,
      reason: 'overproduction',
      location: 'Main Kitchen',
      loggedBy: 'Sarah Cook',
      aiAnalysis: 'Portion size 23% above standard. Adjust recipe.',
    },
    {
      id: 3,
      date: new Date('2025-11-21'),
      item: 'Bread Rolls',
      type: 'prepared_food',
      quantity: 18,
      unit: 'pcs',
      cost: 9.00,
      reason: 'quality_control',
      location: 'Bakery',
      loggedBy: 'Mike Baker',
      aiAnalysis: 'Consistent Thursday overproduction. Reduce by 20%.',
    },
  ];

  const reasonLabels = {
    spoilage: 'Spoilage',
    overproduction: 'Overproduction',
    preparation_error: 'Preparation Error',
    quality_control: 'Quality Control',
    customer_return: 'Customer Return',
    other: 'Other',
  };

  const reasonColors = {
    spoilage: 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400',
    overproduction: 'bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400',
    preparation_error: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400',
    quality_control: 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400',
    customer_return: 'bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400',
    other: 'bg-slate-50 text-slate-700 dark:bg-slate-950/20 dark:text-slate-400',
  };

  const totalWasteCost = wasteLog.reduce((sum, item) => sum + item.cost, 0);
  const avgDailyCost = totalWasteCost / 7;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            Waste Tracking
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor and reduce food waste with AI-powered insights
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Log Waste
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log Food Waste</DialogTitle>
              <DialogDescription>
                Record waste for AI analysis and optimization
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wasteType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingredient">Ingredient</SelectItem>
                      <SelectItem value="prepared_food">Prepared Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="e.g., Tomatoes" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" step="0.1" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                      <SelectItem value="pcs">pieces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost (€)</Label>
                  <Input id="cost" type="number" step="0.01" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spoilage">Spoilage</SelectItem>
                      <SelectItem value="overproduction">Overproduction</SelectItem>
                      <SelectItem value="preparation_error">Preparation Error</SelectItem>
                      <SelectItem value="quality_control">Quality Control</SelectItem>
                      <SelectItem value="customer_return">Customer Return</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Kitchen</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="prep">Prep Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional details about the waste incident..."
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Upload photo for AI analysis
                </p>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                Log Waste Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              This Week's Waste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€{totalWasteCost.toFixed(2)}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -12.5% vs last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Daily Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{avgDailyCost.toFixed(2)}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Per day this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Waste % of Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Target: &lt;2%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              AI Savings Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€890</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Per month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            AI Waste Reduction Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-950 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold">Portion Control Issue Detected</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Carbonara portions are 23% larger than recipe standard. Adjusting to correct
                size will save €890/month.
              </p>
            </div>
            <Button size="sm" variant="outline">View Details</Button>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-950 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold">Overproduction Pattern</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Bread waste peaks on Thursdays and Mondays. Reduce production by 15-20%
                on these days.
              </p>
            </div>
            <Button size="sm" variant="outline">Adjust Schedule</Button>
          </div>
        </CardContent>
      </Card>

      {/* Waste Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Waste Log</CardTitle>
              <CardDescription>Recent waste entries with AI analysis</CardDescription>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>AI Analysis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteLog.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="text-sm">
                      {format(entry.date, 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{entry.item}</div>
                      <div className="text-xs text-slate-500 capitalize">
                        {entry.type.replace('_', ' ')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {entry.quantity} {entry.unit}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-red-600">
                      €{entry.cost.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={reasonColors[entry.reason]}>
                      {reasonLabels[entry.reason]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{entry.location}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <Badge
                        variant="secondary"
                        className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 mb-1"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {entry.aiAnalysis}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
