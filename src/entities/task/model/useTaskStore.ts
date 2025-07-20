import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
    Task,
    TaskCategory,
    TaskStatus,
    TaskPriority,
} from "@/entities/task/types/Task";

interface SortState {
    sortBy: "createdAt" | "priority" | "title";
    sortOrder: "asc" | "desc";
    setSort: (
        sortBy: "createdAt" | "priority" | "title",
        sortOrder: "asc" | "desc"
    ) => void;
    resetSort: () => void;
}

interface TaskState extends SortState {
    tasks: Task[];
    filters: {
        status: TaskStatus | "All";
        category: TaskCategory | "All";
        priority: TaskPriority | "All";
    };
    setFilter: (filterType: keyof TaskState["filters"], value: string) => void;
    resetFilters: () => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
}

const mockTasks: Task[] = [
    {
        id: "1",
        title: "Fix login flow",
        description: "Fix the redirect after login on mobile",
        category: "Bug",
        status: "In Progress",
        priority: "High",
        createdAt: new Date("2024-01-01").toISOString(),
    },
    {
        id: "2",
        title: "Add dark mode",
        description: "Implement dark mode toggle in settings",
        category: "Feature",
        status: "To Do",
        priority: "Medium",
        createdAt: new Date("2024-02-01").toISOString(),
    },
    {
        id: "3",
        title: "Update documentation",
        description: "Update the getting started guide",
        category: "Documentation",
        status: "Done",
        priority: "Low",
        createdAt: new Date("2024-03-01").toISOString(),
    },
];

export const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            tasks: mockTasks,
            filters: {
                status: "All",
                category: "All",
                priority: "All",
            },
            sortBy: "createdAt",
            sortOrder: "desc",
            setSort: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
            resetSort: () =>
                set({
                    sortBy: "createdAt",
                    sortOrder: "desc",
                }),
            setFilter: (filterType, value) =>
                set((state) => ({
                    filters: {
                        ...state.filters,
                        [filterType]: value,
                    },
                })),
            resetFilters: () =>
                set({
                    filters: {
                        status: "All",
                        category: "All",
                        priority: "All",
                    },
                }),
            addTask: (task) => {
                set((state) => ({ tasks: [...state.tasks, task] }));
            },
            updateTask: (updatedTask) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    ),
                })),
            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                })),
            getTaskById: (id) => get().tasks.find((task) => task.id === id),
        }),
        {
            name: "task-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
