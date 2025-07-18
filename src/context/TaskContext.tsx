import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

import { Task } from "../types/Task";

interface TaskContextType {
    tasks: Task[];
    getTaskById: (id: string) => Task | undefined;
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};

const mockTasks: Task[] = [
    {
        id: "1",
        title: "Fix login flow",
        description: "Fix the redirect after login on mobile",
        category: "Bug",
        status: "In Progress",
        priority: "High",
    },
    {
        id: "2",
        title: "Add dark mode",
        description: "Implement dark mode toggle in settings",
        category: "Feature",
        status: "To Do",
        priority: "Medium",
    },
    {
        id: "3",
        title: "Update documentation",
        description: "Update the getting started guide",
        category: "Documentation",
        status: "Done",
        priority: "Low",
    },
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : mockTasks;
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const getTaskById = (id: string): Task | undefined =>
        tasks.find((task) => task.id === id);

    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

    const updateTask = (updatedTask: Task) =>
        setTasks((prev) =>
            prev.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );

    const deleteTask = (id: string) =>
        setTasks((prev) => prev.filter((task) => task.id !== id));

    const value = {
        tasks,
        getTaskById,
        addTask,
        updateTask,
        deleteTask,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
};
