import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import TaskItem from "../TaskItem";
import { Link } from "react-router-dom";

const TaskList: React.FC = () => {
    const { tasks } = useTaskContext();

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

            {tasks.length === 0 ? (
                <p className="text-gray-500 text-center">
                    Нет задач для отображения.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
