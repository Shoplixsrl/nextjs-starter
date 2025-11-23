'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Users, ListTodo, Network } from 'lucide-react';
import { TaskBoard } from '@/components/a2a/task-board';
import { AgentRegistry } from '@/components/a2a/agent-registry';
import { DependencyGraph } from '@/components/a2a/dependency-graph';

export default function A2ACoordinationPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">AI Agent Coordination</h1>
          <p className="text-muted-foreground mt-2">
            Centralized state management system with A2A protocol
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          A2A Protocol v1.0
        </Badge>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            Task Board
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Agent Registry
          </TabsTrigger>
          <TabsTrigger value="dependencies" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Dependencies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <TaskBoard />
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <AgentRegistry />
        </TabsContent>

        <TabsContent value="dependencies" className="mt-6">
          <DependencyGraph />
        </TabsContent>
      </Tabs>
    </div>
  );
}
