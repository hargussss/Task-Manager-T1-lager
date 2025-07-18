// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";

import HomePage from "./pages/HomePage";
import TaskDetailsPage from "./pages/TaskDetailsPage";

const App: React.FC = () => {
    return (
        <TaskProvider>
            <Router basename="/Task-Manager-T1-lager">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/task/:id" element={<TaskDetailsPage />} />
                </Routes>
            </Router>
        </TaskProvider>
    );
};

export default App;
