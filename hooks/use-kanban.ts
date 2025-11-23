"use client";

import { useState, useCallback } from "react";
import { Task, KanbanList, FilterOptions, Priority } from "@/lib/kanban/types";
import { MOCK_BOARD } from "@/lib/kanban/mock-data";

export function useKanban() {
  const [lists, setLists] = useState<KanbanList[]>(MOCK_BOARD.lists);
  const [filters, setFilters] = useState<FilterOptions>({});

  const moveTask = useCallback((
    taskId: string,
    sourceListId: string,
    destinationListId: string,
    newIndex: number
  ) => {
    setLists((prevLists) => {
      const newLists = prevLists.map((list) => ({ ...list, tasks: [...list.tasks] }));

      const sourceList = newLists.find((list) => list.id === sourceListId);
      const destinationList = newLists.find((list) => list.id === destinationListId);

      if (!sourceList || !destinationList) return prevLists;

      const taskIndex = sourceList.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return prevLists;

      const [task] = sourceList.tasks.splice(taskIndex, 1);
      task.status = destinationList.status;
      task.updatedAt = new Date().toISOString();

      destinationList.tasks.splice(newIndex, 0, task);

      return newLists;
    });
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        tasks: list.tasks.map((task) =>
          task.id === taskId
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        ),
      }))
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        tasks: list.tasks.filter((task) => task.id !== taskId),
      }))
    );
  }, []);

  const addTask = useCallback((listId: string, task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  ...task,
                  id: `task-${Date.now()}`,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            }
          : list
      )
    );
  }, []);

  const getFilteredLists = useCallback((): KanbanList[] => {
    if (!filters.priority?.length && !filters.labels?.length && !filters.assignee?.length && !filters.search) {
      return lists;
    }

    return lists.map((list) => ({
      ...list,
      tasks: list.tasks.filter((task) => {
        // Priority filter
        if (filters.priority?.length && !filters.priority.includes(task.priority)) {
          return false;
        }

        // Labels filter
        if (filters.labels?.length) {
          const hasMatchingLabel = task.labels.some((label) =>
            filters.labels?.includes(label.id)
          );
          if (!hasMatchingLabel) return false;
        }

        // Assignee filter
        if (filters.assignee?.length && task.assignee && !filters.assignee.includes(task.assignee)) {
          return false;
        }

        // Search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const matchesTitle = task.title.toLowerCase().includes(searchLower);
          const matchesDescription = task.description?.toLowerCase().includes(searchLower);
          if (!matchesTitle && !matchesDescription) return false;
        }

        return true;
      }),
    }));
  }, [lists, filters]);

  return {
    lists: getFilteredLists(),
    filters,
    setFilters,
    moveTask,
    updateTask,
    deleteTask,
    addTask,
  };
}
