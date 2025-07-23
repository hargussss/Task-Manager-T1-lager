import React, { useEffect } from "react";
import { useTaskStore } from "@/entities/task/model/useTaskStore";
import Layout from "@/widgets/layout/Layout";
import TaskList from "@/features/task-list/ui/TaskList";

const HomePage: React.FC = () => {
    const { fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Layout>
            <TaskList />
        </Layout>
    );
};

export default HomePage;
