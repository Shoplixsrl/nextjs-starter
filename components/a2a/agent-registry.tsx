'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Activity, Cpu, Zap } from 'lucide-react';

// Mock data for agents
const mockAgents = [
  {
    id: '1',
    name: 'DataAnalyzer-01',
    description: 'Specialized in data analysis and pattern recognition',
    status: 'active',
    capabilities: {
      skills: ['data-analysis', 'machine-learning', 'statistics'],
      protocols: ['A2A', 'REST'],
      supportedFormats: ['JSON', 'CSV', 'Parquet'],
      maxConcurrentTasks: 5,
    },
    currentTasks: 2,
    completedTasks: 47,
    endpoint: 'https://api.example.com/agents/data-analyzer-01',
  },
  {
    id: '2',
    name: 'PaymentProcessor-01',
    description: 'Handles payment transactions and fraud detection',
    status: 'busy',
    capabilities: {
      skills: ['payment-processing', 'fraud-detection', 'compliance'],
      protocols: ['A2A', 'JSON-RPC'],
      supportedFormats: ['JSON'],
      maxConcurrentTasks: 10,
    },
    currentTasks: 8,
    completedTasks: 1243,
    endpoint: 'https://api.example.com/agents/payment-processor-01',
  },
  {
    id: '3',
    name: 'ReportGenerator-02',
    description: 'Generates reports and visualizations',
    status: 'active',
    capabilities: {
      skills: ['report-generation', 'data-visualization', 'templating'],
      protocols: ['A2A'],
      supportedFormats: ['JSON', 'PDF', 'HTML'],
      maxConcurrentTasks: 3,
    },
    currentTasks: 1,
    completedTasks: 156,
    endpoint: 'https://api.example.com/agents/report-generator-02',
  },
  {
    id: '4',
    name: 'MLOps-Agent',
    description: 'Manages ML model deployment and monitoring',
    status: 'inactive',
    capabilities: {
      skills: ['mlops', 'model-deployment', 'monitoring'],
      protocols: ['A2A', 'gRPC'],
      supportedFormats: ['JSON', 'ONNX', 'TensorFlow'],
      maxConcurrentTasks: 2,
    },
    currentTasks: 0,
    completedTasks: 34,
    endpoint: 'https://api.example.com/agents/mlops-agent',
  },
  {
    id: '5',
    name: 'BackupAgent-01',
    description: 'Handles data backup and recovery operations',
    status: 'active',
    capabilities: {
      skills: ['backup', 'recovery', 'data-migration'],
      protocols: ['A2A'],
      supportedFormats: ['JSON', 'Binary'],
      maxConcurrentTasks: 2,
    },
    currentTasks: 0,
    completedTasks: 89,
    endpoint: 'https://api.example.com/agents/backup-agent-01',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800 border-green-300',
  inactive: 'bg-gray-100 text-gray-800 border-gray-300',
  busy: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  offline: 'bg-red-100 text-red-800 border-red-300',
};

const statusIcons = {
  active: Activity,
  inactive: Cpu,
  busy: Zap,
  offline: Activity,
};

export function AgentRegistry() {
  const [agents] = useState(mockAgents);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Agent Registry</h2>
          <p className="text-muted-foreground">
            Registered AI agents and their capabilities
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Register Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const StatusIcon = statusIcons[agent.status as keyof typeof statusIcons];
          const utilizationPercent = Math.round(
            (agent.currentTasks / agent.capabilities.maxConcurrentTasks) * 100
          );

          return (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${statusColors[agent.status as keyof typeof statusColors]} text-xs`}
                  >
                    {agent.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm mt-2">
                  {agent.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Task Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Tasks</span>
                    <span className="font-medium">
                      {agent.currentTasks} / {agent.capabilities.maxConcurrentTasks}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        utilizationPercent > 80
                          ? 'bg-red-500'
                          : utilizationPercent > 50
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${utilizationPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">{agent.completedTasks}</span>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Protocols */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Protocols:</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.protocols.map((protocol) => (
                      <Badge key={protocol} variant="outline" className="text-xs">
                        {protocol}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Endpoint */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground truncate">
                    {agent.endpoint}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Card
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Assign Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
