import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
    Task,
    TaskCategory,
    TaskStatus,
    TaskPriority,
} from "@/entities/task/types/Task";

const API_URL = "http://localhost:3001";

interface SortState {
    sortBy: "createdAt" | "priority" | "title";
    sortOrder: "asc" | "desc";
    setSort: (
        sortBy: "createdAt" | "priority" | "title",
        sortOrder: "asc" | "desc"
    ) => void;
    resetSort: () => void;
}

interface FilterState {
    filters: {
        status: TaskStatus | "All";
        category: TaskCategory | "All";
        priority: TaskPriority | "All";
    };
    setFilter: (
        filterType: keyof FilterState["filters"],
        value: string
    ) => void;
    resetFilters: () => void;
}

interface TaskState extends SortState, FilterState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;

    fetchTasks: () => Promise<void>;
    createTask: (taskData: Omit<Task, "id" | "createdAt">) => Promise<void>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    getTaskById: (id: string) => Task | undefined;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            tasks: [],
            isLoading: false,
            error: null,
            filters: {
                status: "All",
                category: "All",
                priority: "All",
            },
            sortBy: "createdAt",
            sortOrder: "desc",

            fetchTasks: async () => {
                set({ isLoading: true, error: null });
                try {
                    const res = await fetch(`${API_URL}/tasks`);
                    if (!res.ok) throw new Error("Failed to fetch tasks");
                    const tasks: Task[] = await res.json();
                    set({ tasks });
                } catch (err: any) {
                    set({ error: err.message || "Failed to load tasks" });
                } finally {
                    set({ isLoading: false });
                }
            },

            createTask: async (taskData) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await fetch(`${API_URL}/tasks`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(taskData),
                    });
                    if (!res.ok) throw new Error("Failed to create task");
                    const newTask: Task = await res.json();
                    set((state) => ({ tasks: [...state.tasks, newTask] }));
                } catch (err: any) {
                    set({ error: err.message || "Failed to create task" });
                } finally {
                    set({ isLoading: false });
                }
            },

            updateTask: async (id, updates) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await fetch(`${API_URL}/tasks/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updates),
                    });
                    if (!res.ok) throw new Error("Failed to update task");
                    const updatedTask: Task = await res.json();
                    set((state) => ({
                        tasks: state.tasks.map((t) =>
                            t.id === id ? updatedTask : t
                        ),
                    }));
                } catch (err: any) {
                    set({ error: err.message || "Failed to update task" });
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteTask: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await fetch(`${API_URL}/tasks/${id}`, {
                        method: "DELETE",
                    });
                    if (!res.ok) throw new Error("Failed to delete task");
                    set((state) => ({
                        tasks: state.tasks.filter((t) => t.id !== id),
                    }));
                } catch (err: any) {
                    set({ error: err.message || "Failed to delete task" });
                } finally {
                    set({ isLoading: false });
                }
            },

            getTaskById: (id) => get().tasks.find((task) => task.id === id),

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
        }),
        {
            name: "task-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                filters: state.filters,
                sortBy: state.sortBy,
                sortOrder: state.sortOrder,
            }),
        }
    )
);
