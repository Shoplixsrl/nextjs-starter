"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { KanbanList as KanbanListType, Task } from "@/lib/kanban/types";
import { KanbanList } from "./kanban-list";
import { KanbanCard } from "./kanban-card";

interface KanbanBoardProps {
  lists: KanbanListType[];
  onMoveTask: (taskId: string, sourceListId: string, destinationListId: string, newIndex: number) => void;
  onTaskClick: (taskId: string) => void;
  onAddTask: (listId: string) => void;
}

export function KanbanBoard({ lists, onMoveTask, onTaskClick, onAddTask }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = lists
      .flatMap((list) => list.tasks)
      .find((task) => task.id === active.id);

    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTaskId = active.id as string;
    const overListId = over.id as string;

    // Find source list
    const sourceList = lists.find((list) =>
      list.tasks.some((task) => task.id === activeTaskId)
    );

    if (!sourceList) return;

    // Check if dropped over a task or a list
    const destinationList = lists.find((list) => list.id === overListId) ||
      lists.find((list) => list.tasks.some((task) => task.id === overListId));

    if (!destinationList) return;

    // Find the index where to insert
    let newIndex = 0;
    if (over.id !== destinationList.id) {
      // Dropped over a task
      newIndex = destinationList.tasks.findIndex((task) => task.id === over.id);
      if (newIndex === -1) newIndex = 0;

      // If moving within same list and dropping after the current position
      if (sourceList.id === destinationList.id) {
        const currentIndex = sourceList.tasks.findIndex((task) => task.id === activeTaskId);
        if (currentIndex < newIndex) {
          newIndex += 1;
        }
      }
    } else {
      // Dropped over the list itself - add to end
      newIndex = destinationList.tasks.length;
    }

    onMoveTask(activeTaskId, sourceList.id, destinationList.id, newIndex);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {lists.map((list) => (
          <div key={list.id} className="group">
            <KanbanList
              list={list}
              onTaskClick={onTaskClick}
              onAddTask={onAddTask}
            />
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 scale-105">
            <KanbanCard task={activeTask} onClick={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
