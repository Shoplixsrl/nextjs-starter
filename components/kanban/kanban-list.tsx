"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanList as KanbanListType } from "@/lib/kanban/types";
import { KanbanCard } from "./kanban-card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanListProps {
  list: KanbanListType;
  onTaskClick: (taskId: string) => void;
  onAddTask: (listId: string) => void;
}

export function KanbanList({ list, onTaskClick, onAddTask }: KanbanListProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
  });

  return (
    <div className="flex flex-col h-full w-80 flex-shrink-0">
      {/* List Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{list.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {list.tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onAddTask(list.id)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* List Content */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-2 p-2 rounded-lg border-2 border-dashed transition-colors min-h-[200px]",
          isOver ? "border-primary bg-accent/50" : "border-transparent bg-muted/30"
        )}
      >
        <SortableContext items={list.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {list.tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))}
        </SortableContext>

        {list.tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
            Drop tasks here
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 w-full justify-start text-muted-foreground hover:text-foreground"
        onClick={() => onAddTask(list.id)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add task
      </Button>
    </div>
  );
}
