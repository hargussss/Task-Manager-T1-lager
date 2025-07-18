import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-xl font-bold text-blue-600 hover:text-blue-800 transition"
                >
                    Task Manager
                </Link>
                <nav>
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 transition mr-4"
                    >
                        Задачи
                    </Link>
                    <Link
                        to="/task/new"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Создать задачу
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
