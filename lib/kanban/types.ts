export type Priority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  labels: Label[];
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanList {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export interface KanbanBoard {
  id: string;
  title: string;
  lists: KanbanList[];
}

export interface FilterOptions {
  priority?: Priority[];
  labels?: string[];
  assignee?: string[];
  search?: string;
}
