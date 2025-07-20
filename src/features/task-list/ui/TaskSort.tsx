import React from "react";
import { useTaskStore } from "@/entities/task/model/useTaskStore";

const TaskSort: React.FC = () => {
    const { sortBy, sortOrder, setSort } = useTaskStore();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, order] = e.target.value.split("-");
        useTaskStore
            .getState()
            .setSort(
                field as "createdAt" | "priority" | "title",
                order as "asc" | "desc"
            );
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Сортировать по
            </label>
            <select
                value={`${sortBy}-${sortOrder}`}
                onChange={handleSortChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="createdAt-desc">
                    Дата создания (по убыванию)
                </option>
                <option value="createdAt-asc">
                    Дата создания (по возрастанию)
                </option>
                <option value="priority-desc">
                    Приоритет (важные сначала)
                </option>
                <option value="priority-asc">
                    Приоритет (менее важные сначала)
                </option>
                <option value="title-asc">Заголовок (A → Z)</option>
                <option value="title-desc">Заголовок (Z → A)</option>
            </select>
        </div>
    );
};

export default TaskSort;
