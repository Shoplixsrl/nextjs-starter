'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

// Mock data for demonstration
const mockTasks = {
  pending: [
    {
      id: '1',
      title: 'Analyze customer sentiment data',
      description: 'Process and analyze recent customer feedback',
      priority: 'high',
      assignedAgent: 'DataAnalyzer-01',
      requirements: [
        { id: 'r1', description: 'Access to customer database', satisfied: true },
        { id: 'r2', description: 'Sentiment analysis model loaded', satisfied: false },
      ],
      blockers: [],
    },
    {
      id: '2',
      title: 'Generate weekly report',
      description: 'Compile analytics from the past week',
      priority: 'medium',
      assignedAgent: 'ReportGenerator-02',
      requirements: [
        { id: 'r3', description: 'Data aggregation complete', satisfied: true },
      ],
      blockers: [],
    },
  ],
  in_progress: [
    {
      id: '3',
      title: 'Process payment transactions',
      description: 'Validate and process pending payments',
      priority: 'critical',
      assignedAgent: 'PaymentProcessor-01',
      requirements: [
        { id: 'r4', description: 'Payment gateway connected', satisfied: true },
        { id: 'r5', description: 'Fraud detection active', satisfied: true },
      ],
      blockers: [],
    },
  ],
  blocked: [
    {
      id: '4',
      title: 'Deploy ML model update',
      description: 'Push new version of recommendation model',
      priority: 'high',
      assignedAgent: 'MLOps-Agent',
      requirements: [
        { id: 'r6', description: 'Model validation passed', satisfied: true },
      ],
      blockers: [
        { id: 'b1', description: 'Waiting for infrastructure approval', severity: 'major' },
      ],
    },
  ],
  completed: [
    {
      id: '5',
      title: 'Data backup completed',
      description: 'Backup all customer data to cloud storage',
      priority: 'medium',
      assignedAgent: 'BackupAgent-01',
      requirements: [],
      blockers: [],
    },
  ],
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-300',
  medium: 'bg-blue-100 text-blue-800 border-blue-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300',
};

const statusIcons = {
  pending: Clock,
  in_progress: AlertCircle,
  blocked: XCircle,
  completed: CheckCircle2,
};

export function TaskBoard() {
  const [tasks] = useState(mockTasks);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <Badge
            variant="outline"
            className={`${priorityColors[task.priority as keyof typeof priorityColors]} text-xs`}
          >
            {task.priority}
          </Badge>
        </div>
        <CardDescription className="text-sm">{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{task.assignedAgent}</span>
          </div>

          {task.requirements.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Requirements:</p>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {task.requirements.map((req: any) => (
                <div key={req.id} className="flex items-center gap-2 text-xs">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      req.satisfied ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                  <span className={req.satisfied ? 'text-muted-foreground' : ''}>
                    {req.description}
                  </span>
                </div>
              ))}
            </div>
          )}

          {task.blockers.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-red-600">Blockers:</p>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {task.blockers.map((blocker: any) => (
                <div key={blocker.id} className="flex items-center gap-2 text-xs text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>{blocker.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderColumn = (status: string, title: string, tasks: any[]) => {
    const Icon = statusIcons[status as keyof typeof statusIcons];

    return (
      <div className="flex-1 min-w-[300px]">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <CardTitle className="text-lg">{title}</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {tasks.length}
                </Badge>
              </div>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {tasks.map(renderTaskCard)}
              {tasks.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  No tasks in this column
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {renderColumn('pending', 'Pending', tasks.pending)}
      {renderColumn('in_progress', 'In Progress', tasks.in_progress)}
      {renderColumn('blocked', 'Blocked', tasks.blocked)}
      {renderColumn('completed', 'Completed', tasks.completed)}
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
