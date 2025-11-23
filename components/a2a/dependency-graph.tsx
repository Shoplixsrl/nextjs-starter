'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, GitBranch, Link2 } from 'lucide-react';

// Mock dependency data
const mockDependencies = [
  {
    id: '1',
    task: {
      id: 't1',
      title: 'Deploy ML model update',
      status: 'blocked',
    },
    dependsOn: [
      {
        id: 't2',
        title: 'Model validation passed',
        status: 'completed',
        type: 'requires',
      },
      {
        id: 't3',
        title: 'Infrastructure approval',
        status: 'pending',
        type: 'blocks',
      },
    ],
  },
  {
    id: '2',
    task: {
      id: 't4',
      title: 'Generate weekly report',
      status: 'pending',
    },
    dependsOn: [
      {
        id: 't5',
        title: 'Data aggregation complete',
        status: 'completed',
        type: 'requires',
      },
    ],
  },
  {
    id: '3',
    task: {
      id: 't6',
      title: 'Send customer notifications',
      status: 'pending',
    },
    dependsOn: [
      {
        id: 't7',
        title: 'Process payment transactions',
        status: 'in_progress',
        type: 'requires',
      },
      {
        id: 't8',
        title: 'Email template approved',
        status: 'completed',
        type: 'requires',
      },
    ],
  },
];

const statusColors = {
  pending: 'bg-blue-100 text-blue-800 border-blue-300',
  in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  blocked: 'bg-red-100 text-red-800 border-red-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
};

const dependencyTypeColors = {
  requires: 'text-blue-600',
  blocks: 'text-red-600',
  relates_to: 'text-gray-600',
};

export function DependencyGraph() {
  const [dependencies] = useState(mockDependencies);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Dependencies</h2>
          <p className="text-muted-foreground">
            Visualize task relationships and dependencies
          </p>
        </div>
        <Button variant="outline">
          <GitBranch className="h-4 w-4 mr-2" />
          View Graph
        </Button>
      </div>

      <div className="space-y-4">
        {dependencies.map((dep) => (
          <Card key={dep.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">{dep.task.title}</CardTitle>
                <Badge
                  variant="outline"
                  className={`${
                    statusColors[dep.task.status as keyof typeof statusColors]
                  } text-xs ml-2`}
                >
                  {dep.task.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Depends on {dep.dependsOn.length}{' '}
                  {dep.dependsOn.length === 1 ? 'task' : 'tasks'}:
                </p>

                {dep.dependsOn.map((dependency) => (
                  <div
                    key={dependency.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {dependency.title}
                        </span>
                        <Badge
                          variant="outline"
                          className={`${
                            statusColors[dependency.status as keyof typeof statusColors]
                          } text-xs`}
                        >
                          {dependency.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 ml-6">
                        <span
                          className={`text-xs font-medium ${
                            dependencyTypeColors[
                              dependency.type as keyof typeof dependencyTypeColors
                            ]
                          }`}
                        >
                          {dependency.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Dependency Status Summary */}
                <div className="pt-3 border-t flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">
                      {dep.dependsOn.filter((d) => d.status === 'completed').length} completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">
                      {dep.dependsOn.filter((d) => d.status === 'in_progress').length} in progress
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">
                      {dep.dependsOn.filter((d) => d.status === 'pending').length} pending
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {dependencies.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                No dependencies configured
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Create task dependencies to visualize relationships
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
