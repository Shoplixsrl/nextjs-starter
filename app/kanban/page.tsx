"use client";

import { useState } from "react";
import { useKanban } from "@/hooks/use-kanban";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { TaskDetailModal } from "@/components/kanban/task-detail-modal";
import { FilterBar } from "@/components/kanban/filter-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Task } from "@/lib/kanban/types";
import { AVAILABLE_LABELS } from "@/lib/kanban/mock-data";
import { LayoutGrid } from "lucide-react";

export default function KanbanPage() {
  const { lists, filters, setFilters, moveTask, updateTask, deleteTask, addTask } = useKanban();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = lists
    .flatMap((list) => list.tasks)
    .find((task) => task.id === selectedTaskId) || null;

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleAddTask = (listId: string) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;

    const newTask: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      title: "New Task",
      description: "",
      status: list.status,
      priority: "medium",
      labels: [],
    };

    addTask(listId, newTask);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">My Project Board</h1>
                <p className="text-sm text-muted-foreground">Kanban task management</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <FilterBar filters={filters} onFiltersChange={setFilters} />
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-6 py-6 h-full">
          <KanbanBoard
            lists={lists}
            onMoveTask={moveTask}
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        </div>
      </main>

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        open={selectedTaskId !== null}
        onClose={() => setSelectedTaskId(null)}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
