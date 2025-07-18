import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../../context/TaskContext";

import { Task, TaskCategory, TaskStatus, TaskPriority } from "../../types/Task";

interface TaskDetailsProps {
    taskId?: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId: propTaskId }) => {
    const { tasks, updateTask, addTask } = useTaskContext();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const taskId = propTaskId || id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TaskCategory>("Bug");
    const [status, setStatus] = useState<TaskStatus>("To Do");
    const [priority, setPriority] = useState<TaskPriority>("Low");

    useEffect(() => {
        if (taskId && taskId !== "new") {
            const task = tasks.find((t) => t.id === taskId);
            if (task) {
                setTitle(task.title);
                setDescription(task.description);
                setCategory(task.category);
                setStatus(task.status);
                setPriority(task.priority);
            } else {
                navigate("/");
            }
        }
    }, [taskId, tasks, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTask: Task = {
            id: taskId === "new" ? Date.now().toString() : taskId!,
            title,
            description,
            category,
            status,
            priority,
        };

        if (taskId === "new") {
            addTask(updatedTask);
        } else {
            updateTask(updatedTask);
        }

        navigate("/");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                {taskId === "new"
                    ? "Создать новую задачу"
                    : "Редактировать задачу"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Заголовок
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Описание
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Категория
                        </label>
                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value as TaskCategory)
                            }
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Bug">Bug</option>
                            <option value="Feature">Feature</option>
                            <option value="Documentation">Documentation</option>
                            <option value="Refactor">Refactor</option>
                            <option value="Test">Test</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Статус
                        </label>
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as TaskStatus)
                            }
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Приоритет
                        </label>
                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value as TaskPriority)
                            }
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskDetails;
