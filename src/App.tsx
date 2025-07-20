import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "@/pages/home";
import { CreateTaskForm } from "@/features/task-create/ui/TaskDetails";
import { EditTaskForm } from "@/features/task-edit/ui/TaskDetails";

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/Task-Manager-T1-lager">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/task/new" element={<CreateTaskForm />} />
                <Route path="/task/:id" element={<EditTaskForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
