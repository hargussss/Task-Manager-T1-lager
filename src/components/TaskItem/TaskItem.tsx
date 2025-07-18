import React from "react";
import { Link } from "react-router-dom";
import { Task } from "../../types/Task";

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { title, description, category, status, priority } = task;

    const statusColorMap: Record<string, string> = {
        "To Do": "bg-gray-200 text-gray-800",
        "In Progress": "bg-blue-200 text-blue-800",
        Done: "bg-green-200 text-green-800",
    };

    const categoryColorMap: Record<string, string> = {
        Bug: "bg-red-200 text-red-800",
        Feature: "bg-indigo-200 text-indigo-800",
        Documentation: "bg-yellow-200 text-yellow-800",
        Refactor: "bg-purple-200 text-purple-800",
        Test: "bg-teal-200 text-teal-800",
    };

    const priorityColorMap: Record<string, string> = {
        Low: "bg-green-100 text-green-700",
        Medium: "bg-yellow-100 text-yellow-700",
        High: "bg-red-100 text-red-700",
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {description}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
                <span
                    className={`text-xs px-2 py-1 rounded ${categoryColorMap[category]}`}
                >
                    {category}
                </span>
                <span
                    className={`text-xs px-2 py-1 rounded ${statusColorMap[status]}`}
                >
                    {status}
                </span>
                <span
                    className={`text-xs px-2 py-1 rounded ${priorityColorMap[priority]}`}
                >
                    {priority}
                </span>
            </div>

            <Link
                to={`/task/${task.id}`}
                className="inline-block text-blue-600 hover:underline text-sm"
            >
                Редактировать
            </Link>
        </div>
    );
};

export default TaskItem;
