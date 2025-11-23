"use client";

import { Task, Priority, Label } from "@/lib/kanban/types";
import { AVAILABLE_LABELS } from "@/lib/kanban/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label as UILabel } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Trash2, User, Flag, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "text-blue-600 dark:text-blue-400" },
  { value: "medium", label: "Medium", color: "text-yellow-600 dark:text-yellow-400" },
  { value: "high", label: "High", color: "text-orange-600 dark:text-orange-400" },
  { value: "urgent", label: "Urgent", color: "text-red-600 dark:text-red-400" },
];

export function TaskDetailModal({ task, open, onClose, onUpdate, onDelete }: TaskDetailModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority);
      setAssignee(task.assignee || "");
      setDueDate(task.dueDate || "");
      setSelectedLabels(task.labels);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    onUpdate(task.id, {
      title,
      description,
      priority,
      assignee: assignee || undefined,
      dueDate: dueDate || undefined,
      labels: selectedLabels,
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
      onClose();
    }
  };

  const toggleLabel = (label: Label) => {
    setSelectedLabels((prev) =>
      prev.find((l) => l.id === label.id)
        ? prev.filter((l) => l.id !== label.id)
        : [...prev, label]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <UILabel htmlFor="title">Title</UILabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className="text-base"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <UILabel htmlFor="description">Description</UILabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Priority and Assignee */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <UILabel htmlFor="priority" className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Priority
              </UILabel>
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className={cn("font-medium", option.color)}>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <UILabel htmlFor="assignee" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Assignee
              </UILabel>
              <Input
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Assign to..."
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <UILabel htmlFor="dueDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Due Date
            </UILabel>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Labels */}
          <div className="space-y-2">
            <UILabel className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Labels
            </UILabel>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_LABELS.map((label) => {
                const isSelected = selectedLabels.find((l) => l.id === label.id);
                return (
                  <Badge
                    key={label.id}
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    style={
                      isSelected
                        ? {
                            backgroundColor: label.color,
                            color: "white",
                            borderColor: label.color,
                          }
                        : {
                            backgroundColor: `${label.color}15`,
                            color: label.color,
                            borderColor: `${label.color}30`,
                          }
                    }
                    onClick={() => toggleLabel(label)}
                  >
                    {label.name}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
            <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(task.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
