import React from "react";
import { Link } from "react-router-dom";
import TaskItem from "@/features/task-item/TaskItem";
import { useTaskStore } from "@/entities/task/model/useTaskStore";
import TaskFilters from "./TaskFilters";
import TaskSort from "./TaskSort";
import { Task, TaskPriority } from "@/entities/task/types/Task";

const TaskList: React.FC = () => {
    const { tasks, filters, sortBy, sortOrder } = useTaskStore();

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            filters.status === "All" || task.status === filters.status;
        const matchesCategory =
            filters.category === "All" || task.category === filters.category;
        const matchesPriority =
            filters.priority === "All" || task.priority === filters.priority;

        return matchesStatus && matchesCategory && matchesPriority;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const direction = sortOrder === "asc" ? 1 : -1;

        if (sortBy === "createdAt") {
            return (
                direction *
                (new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1)
            );
        }

        if (sortBy === "priority") {
            const priorityOrder: Record<TaskPriority, number> = {
                Low: 0,
                Medium: 1,
                High: 2,
            };
            return (
                direction *
                (priorityOrder[a.priority] < priorityOrder[b.priority] ? -1 : 1)
            );
        }

        if (sortBy === "title") {
            return direction * a.title.localeCompare(b.title);
        }

        return 0;
    });

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Задачи</h2>
                <Link
                    to="/task/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Создать задачу
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-3">
                    <TaskFilters />
                </div>
                <div>
                    <TaskSort />
                </div>
            </div>

            {sortedTasks.length === 0 ? (
                <p className="text-gray-500 text-center">
                    Нет задач для отображения.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
