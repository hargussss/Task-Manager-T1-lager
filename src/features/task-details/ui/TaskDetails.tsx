import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "@/entities/task/model/useTaskStore";
import {
    Task,
    TaskCategory,
    TaskStatus,
    TaskPriority,
} from "@/entities/task/types/Task";
import { format, parseISO } from "date-fns";

const TaskDetails: React.FC<{ taskId?: string }> = ({ taskId: propTaskId }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const taskId = propTaskId || id || "new";

    const { addTask, updateTask, getTaskById } = useTaskStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<TaskCategory>("Bug");
    const [status, setStatus] = useState<TaskStatus>("To Do");
    const [priority, setPriority] = useState<TaskPriority>("Low");
    const [createdAt, setCreatedAt] = useState<string>("");

    const [titleError, setTitleError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (taskId && taskId !== "new") {
            const task = getTaskById(taskId);
            if (task) {
                setTitle(task.title);
                setDescription(task.description);
                setCategory(task.category);
                setStatus(task.status);
                setPriority(task.priority);
                setCreatedAt(
                    task.createdAt || format(new Date(), "yyyy-MM-dd'T'HH:mm")
                );
            } else {
                navigate("/");
            }
        } else {
            setCreatedAt(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        }
    }, [taskId, getTaskById, navigate]);

    const validateForm = () => {
        let isValid = true;

        if (!title.trim()) {
            setTitleError("Заголовок обязателен для заполнения");
            isValid = false;
        } else {
            setTitleError(null);
        }

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        const newTask: Task = {
            id: taskId === "new" ? Date.now().toString() : taskId!,
            title,
            description,
            category,
            status,
            priority,
            createdAt: createdAt || new Date().toISOString(),
        };

        if (taskId === "new") {
            addTask(newTask);
        } else {
            updateTask(newTask);
        }

        setIsSubmitting(false);
        navigate("/");
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsedDate = value ? new Date(value) : new Date();

        if (!isNaN(parsedDate.getTime())) {
            setCreatedAt(parsedDate.toISOString());
        }
    };

    const displayDate = createdAt
        ? format(parseISO(createdAt), "yyyy-MM-dd HH:mm")
        : "";

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
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (titleError) setTitleError(null);
                        }}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            titleError
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                    />
                    {titleError && (
                        <p className="mt-1 text-sm text-red-500">
                            {titleError}
                        </p>
                    )}
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Дата создания
                    </label>
                    <input
                        type="datetime-local"
                        value={
                            createdAt
                                ? format(
                                      parseISO(createdAt),
                                      "yyyy-MM-dd HH:mm"
                                  )
                                : ""
                        }
                        onChange={handleDateChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Сохранение..." : "Сохранить"}
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
