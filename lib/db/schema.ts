import { pgTable, text, timestamp, uuid, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums for status and priority
export const agentStatusEnum = pgEnum('agent_status', ['active', 'inactive', 'busy', 'offline']);
export const taskStatusEnum = pgEnum('task_status', ['pending', 'in_progress', 'blocked', 'completed', 'failed', 'cancelled']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'critical']);
export const dependencyTypeEnum = pgEnum('dependency_type', ['blocks', 'requires', 'relates_to']);

// Agents table - represents AI agents in the system
export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  // Agent capabilities following A2A protocol's Agent Card structure
  capabilities: jsonb('capabilities').notNull().$type<{
    skills: string[];
    protocols: string[];
    supportedFormats: string[];
    maxConcurrentTasks?: number;
  }>(),
  status: agentStatusEnum('status').notNull().default('active'),
  // Authentication and endpoint information
  endpoint: text('endpoint'),
  authConfig: jsonb('auth_config').$type<{
    type: 'bearer' | 'apiKey' | 'oauth2' | 'none';
    credentials?: Record<string, string>;
  }>(),
  // Metadata for extensibility
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tasks table - represents work items for agents
export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').notNull().default('pending'),
  priority: taskPriorityEnum('priority').notNull().default('medium'),

  // Requirements that must be satisfied
  requirements: jsonb('requirements').notNull().$type<Array<{
    id: string;
    description: string;
    satisfied: boolean;
    validatedAt?: string;
  }>>().default([]),

  // Current blockers preventing progress
  blockers: jsonb('blockers').notNull().$type<Array<{
    id: string;
    description: string;
    severity: 'minor' | 'major' | 'critical';
    resolvedAt?: string;
  }>>().default([]),

  // Task result/output following A2A protocol
  result: jsonb('result').$type<{
    parts: Array<{
      contentType: string;
      data: unknown;
    }>;
    status: 'success' | 'partial' | 'failed';
  }>(),

  // Agent assignments
  assignedAgentId: uuid('assigned_agent_id').references(() => agents.id),
  createdByAgentId: uuid('created_by_agent_id').references(() => agents.id),

  // Additional metadata
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  dueAt: timestamp('due_at'),
});

// Task dependencies - defines relationships between tasks
export const taskDependencies = pgTable('task_dependencies', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  dependsOnTaskId: uuid('depends_on_task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  dependencyType: dependencyTypeEnum('dependency_type').notNull().default('requires'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Task history - audit trail of all changes to tasks
export const taskHistory = pgTable('task_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  agentId: uuid('agent_id').references(() => agents.id),
  action: text('action').notNull(), // 'created', 'updated', 'assigned', 'completed', etc.
  changes: jsonb('changes').$type<{
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[]>(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});

// Relations
export const agentsRelations = relations(agents, ({ many }) => ({
  assignedTasks: many(tasks, { relationName: 'assignedTasks' }),
  createdTasks: many(tasks, { relationName: 'createdTasks' }),
  historyEntries: many(taskHistory),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  assignedAgent: one(agents, {
    fields: [tasks.assignedAgentId],
    references: [agents.id],
    relationName: 'assignedTasks',
  }),
  createdByAgent: one(agents, {
    fields: [tasks.createdByAgentId],
    references: [agents.id],
    relationName: 'createdTasks',
  }),
  dependencies: many(taskDependencies, { relationName: 'taskDependencies' }),
  dependents: many(taskDependencies, { relationName: 'taskDependents' }),
  history: many(taskHistory),
}));

export const taskDependenciesRelations = relations(taskDependencies, ({ one }) => ({
  task: one(tasks, {
    fields: [taskDependencies.taskId],
    references: [tasks.id],
    relationName: 'taskDependencies',
  }),
  dependsOnTask: one(tasks, {
    fields: [taskDependencies.dependsOnTaskId],
    references: [tasks.id],
    relationName: 'taskDependents',
  }),
}));

export const taskHistoryRelations = relations(taskHistory, ({ one }) => ({
  task: one(tasks, {
    fields: [taskHistory.taskId],
    references: [tasks.id],
  }),
  agent: one(agents, {
    fields: [taskHistory.agentId],
    references: [agents.id],
  }),
}));
