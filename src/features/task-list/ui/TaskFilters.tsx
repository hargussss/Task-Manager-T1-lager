import React from "react";
import { useTaskStore } from "@/entities/task/model/useTaskStore";

const TaskFilters: React.FC = () => {
    const { filters, setFilter, resetFilters } = useTaskStore();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter(name as "status" | "category" | "priority", value);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Статус
                    </label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">Все</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Категория
                    </label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">Все</option>
                        <option value="Bug">Bug</option>
                        <option value="Feature">Feature</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Refactor">Refactor</option>
                        <option value="Test">Test</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Приоритет
                    </label>
                    <select
                        name="priority"
                        value={filters.priority}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">Все</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={resetFilters}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                    type="button"
                >
                    Сбросить фильтры
                </button>
            </div>
        </div>
    );
};

export default TaskFilters;
