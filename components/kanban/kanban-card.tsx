"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/lib/kanban/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GripVertical, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanCardProps {
  task: Task;
  onClick: () => void;
}

const priorityConfig = {
  low: { color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20", label: "Low" },
  medium: { color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20", label: "Medium" },
  high: { color: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20", label: "High" },
  urgent: { color: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20", label: "Urgent" },
};

export function KanbanCard({ task, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "group cursor-pointer border bg-card hover:bg-accent/50 transition-colors",
        isDragging && "opacity-50 shadow-lg"
      )}
      onClick={onClick}
    >
      <div className="p-3 space-y-3">
        {/* Header with drag handle */}
        <div className="flex items-start gap-2">
          <button
            className="mt-0.5 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 pl-6">
            {task.description}
          </p>
        )}

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-6">
            {task.labels.map((label) => (
              <Badge
                key={label.id}
                variant="outline"
                className="text-xs px-2 py-0.5 font-normal border"
                style={{
                  backgroundColor: `${label.color}15`,
                  color: label.color,
                  borderColor: `${label.color}30`,
                }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pl-6">
          <div className="flex items-center gap-3">
            {task.assignee && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span className="truncate max-w-[100px]">{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs px-2 py-0.5 font-medium border", priorityConfig[task.priority].color)}
          >
            {priorityConfig[task.priority].label}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
