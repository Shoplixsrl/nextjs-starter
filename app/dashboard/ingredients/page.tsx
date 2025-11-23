'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertCircle,
  Package,
} from 'lucide-react';

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in production this would come from API
  const ingredients = [
    {
      id: '1',
      name: 'Tomatoes (San Marzano)',
      sku: 'VEG-001',
      category: 'Vegetables',
      currentPrice: 3.50,
      averagePrice: 3.25,
      unit: 'kg',
      stockLevel: 45,
      minStock: 20,
      maxStock: 100,
      supplier: 'Fresh Farms Co.',
      pricetrend: 'up',
      aiPrediction: '+8% in 7 days',
    },
    {
      id: '2',
      name: 'Mozzarella di Bufala',
      sku: 'DAI-003',
      category: 'Dairy',
      currentPrice: 12.50,
      averagePrice: 12.80,
      unit: 'kg',
      stockLevel: 15,
      minStock: 10,
      maxStock: 40,
      supplier: 'Italian Imports Ltd',
      priceTrend: 'down',
      aiPrediction: 'Stable',
    },
    {
      id: '3',
      name: 'Extra Virgin Olive Oil',
      sku: 'OIL-001',
      category: 'Oils',
      currentPrice: 18.00,
      averagePrice: 17.50,
      unit: 'l',
      stockLevel: 8,
      minStock: 15,
      maxStock: 50,
      supplier: 'Mediterranean Goods',
      priceTrend: 'up',
      aiPrediction: 'Order now',
      alert: 'low',
    },
    {
      id: '4',
      name: 'Chicken Breast (Organic)',
      sku: 'MEA-002',
      category: 'Meat',
      currentPrice: 9.50,
      averagePrice: 9.75,
      unit: 'kg',
      stockLevel: 25,
      minStock: 20,
      maxStock: 60,
      supplier: 'Quality Meats Inc',
      priceTrend: 'down',
      aiPrediction: '-5% expected',
    },
  ];

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ingredients</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your ingredient inventory and pricing
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Ingredient</DialogTitle>
              <DialogDescription>
                Create a new ingredient with pricing and stock information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ingredient Name</Label>
                  <Input id="name" placeholder="e.g., Tomatoes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="e.g., VEG-001" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="oils">Oils & Fats</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="l">Liter (l)</SelectItem>
                      <SelectItem value="ml">Milliliter (ml)</SelectItem>
                      <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Current Price (€)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input id="minStock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input id="maxStock" type="number" placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Preferred Supplier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">Fresh Farms Co.</SelectItem>
                    <SelectItem value="supplier2">Italian Imports Ltd</SelectItem>
                    <SelectItem value="supplier3">Quality Meats Inc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                Add Ingredient
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
              Total Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Across 12 categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">12</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Need reordering
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Avg Price Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">-2.3%</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              AI Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Active insights
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, SKU, or category..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="oils">Oils & Fats</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>AI Prediction</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ingredient.name}</div>
                      <div className="text-sm text-slate-500">{ingredient.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ingredient.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">€{ingredient.currentPrice.toFixed(2)}/{ingredient.unit}</div>
                      <div className="flex items-center text-xs">
                        {ingredient.priceTrend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                        )}
                        <span className="text-slate-500">
                          Avg: €{ingredient.averagePrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-slate-400" />
                      <span className={
                        ingredient.alert === 'low' ? 'text-orange-500 font-semibold' : ''
                      }>
                        {ingredient.stockLevel} {ingredient.unit}
                      </span>
                      {ingredient.alert === 'low' && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Min: {ingredient.minStock} / Max: {ingredient.maxStock}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{ingredient.supplier}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 font-medium"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {ingredient.aiPrediction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
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
