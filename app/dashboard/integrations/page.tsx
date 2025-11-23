'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Plug,
  CheckCircle2,
  XCircle,
  Plus,
  ShoppingCart,
  Zap,
  Settings,
  RefreshCw,
} from 'lucide-react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: '1',
      name: 'Square POS',
      provider: 'square',
      description: 'Sync sales and inventory with Square POS',
      icon: '🟦',
      status: 'connected',
      lastSync: new Date('2025-11-23T10:30:00'),
      salesSynced: 1247,
    },
    {
      id: '2',
      name: 'Toast POS',
      provider: 'toast',
      description: 'Real-time sales and menu sync with Toast',
      icon: '🍞',
      status: 'available',
      lastSync: null,
      salesSynced: 0,
    },
    {
      id: '3',
      name: 'Lightspeed',
      provider: 'lightspeed',
      description: 'Connect with Lightspeed Restaurant',
      icon: '⚡',
      status: 'available',
      lastSync: null,
      salesSynced: 0,
    },
    {
      id: '4',
      name: 'Clover',
      provider: 'clover',
      description: 'Integrate with Clover POS system',
      icon: '🍀',
      status: 'available',
      lastSync: null,
      salesSynced: 0,
    },
  ]);

  const otherIntegrations = [
    {
      id: '5',
      name: 'QuickBooks',
      category: 'Accounting',
      description: 'Sync financials with QuickBooks',
      icon: '💰',
      status: 'coming_soon',
    },
    {
      id: '6',
      name: 'Xero',
      category: 'Accounting',
      description: 'Connect your Xero accounting',
      icon: '📊',
      status: 'available',
    },
    {
      id: '7',
      name: 'Deliverect',
      category: 'Delivery',
      description: 'Manage online orders from all platforms',
      icon: '🚚',
      status: 'coming_soon',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Plug className="h-8 w-8 text-indigo-500" />
          Integrations
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Connect your existing tools to automate data flow
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Active Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter((i) => i.status === 'connected').length}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              of {integrations.length} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Sales Synced (Today)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.reduce((sum, i) => sum + i.salesSynced, 0)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Automatic sync every 5 min
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Last Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 min ago</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* POS Integrations */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-indigo-500" />
          POS Systems
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <Card
              key={integration.id}
              className="border-2 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{integration.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {integration.description}
                      </CardDescription>
                    </div>
                  </div>
                  {integration.status === 'connected' ? (
                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 border-0">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline">Available</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {integration.status === 'connected' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Last sync:
                      </span>
                      <span className="font-medium">
                        {integration.lastSync?.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Sales synced:
                      </span>
                      <span className="font-medium">{integration.salesSynced}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect {integration.name}</DialogTitle>
                        <DialogDescription>
                          Enter your {integration.name} credentials to enable automatic
                          sync
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input
                            id="apiKey"
                            placeholder="Enter your API key"
                            type="password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="locationId">Location ID</Label>
                          <Input id="locationId" placeholder="Your location ID" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="autoSync" defaultChecked />
                          <Label htmlFor="autoSync">
                            Enable automatic sync every 5 minutes
                          </Label>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        Connect Integration
                      </Button>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Integrations */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-indigo-500" />
          Other Integrations
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {otherIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {integration.status === 'coming_soon' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
