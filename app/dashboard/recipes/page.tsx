'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Search,
  Sparkles,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
} from 'lucide-react';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const recipes = [
    {
      id: '1',
      name: 'Margherita Pizza',
      servings: 1,
      prepTime: 20,
      cookTime: 12,
      cost: 2.45,
      aiOptimizedCost: 2.15,
      ingredients: 8,
      status: 'active',
      popularity: 95,
    },
    {
      id: '2',
      name: 'Carbonara Pasta',
      servings: 1,
      prepTime: 10,
      cookTime: 15,
      cost: 3.80,
      aiOptimizedCost: 3.50,
      ingredients: 6,
      status: 'active',
      popularity: 88,
    },
    {
      id: '3',
      name: 'Caesar Salad',
      servings: 1,
      prepTime: 15,
      cookTime: 0,
      cost: 2.90,
      aiOptimizedCost: 2.90,
      ingredients: 7,
      status: 'active',
      popularity: 72,
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recipes</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create and optimize recipes with AI-powered cost analysis
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Recipe</DialogTitle>
              <DialogDescription>
                Add a new recipe with ingredients and cooking instructions
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipeName">Recipe Name</Label>
                  <Input id="recipeName" placeholder="e.g., Margherita Pizza" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servingSize">Serving Size</Label>
                  <Input id="servingSize" type="number" defaultValue="1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (min)</Label>
                  <Input id="prepTime" type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time (min)</Label>
                  <Input id="cookTime" type="number" placeholder="15" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ingredients</Label>
                <Card className="p-4 space-y-3">
                  <div className="grid grid-cols-12 gap-2">
                    <Input className="col-span-6" placeholder="Ingredient name" />
                    <Input className="col-span-2" type="number" placeholder="Qty" />
                    <Input className="col-span-3" placeholder="Unit" />
                    <Button variant="outline" size="icon" className="col-span-1">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Add all ingredients with their quantities
                  </p>
                </Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Cooking Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Step by step cooking instructions..."
                  rows={6}
                />
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-900">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">
                      AI Optimization Available
                    </h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                      Our AI will analyze your recipe and suggest cost optimizations,
                      portion adjustments, and ingredient substitutions.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                Create Recipe
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
              Total Recipes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              48 active in menu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Avg Recipe Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€3.24</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              -8% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              AI Optimizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Potential savings: €245/mo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Avg Food Cost %
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5%</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Target: 30%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Table */}
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search recipes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipe</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>AI Optimization</TableHead>
                <TableHead>Popularity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{recipe.name}</div>
                      <div className="text-sm text-slate-500">
                        {recipe.ingredients} ingredients • {recipe.servings} serving
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-slate-400" />
                      {recipe.prepTime + recipe.cookTime} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">€{recipe.cost.toFixed(2)}</div>
                      <div className="text-xs text-slate-500">per serving</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {recipe.aiOptimizedCost < recipe.cost ? (
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          €{recipe.aiOptimizedCost.toFixed(2)}
                        </Badge>
                        <span className="text-xs text-green-600">
                          Save €{(recipe.cost - recipe.aiOptimizedCost).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="outline">Optimized</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${recipe.popularity}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{recipe.popularity}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {recipe.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                      </Button>
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
