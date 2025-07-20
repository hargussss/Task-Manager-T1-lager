import React from "react";
import Layout from "@/widgets/layout/Layout";
import TaskList from "@/features/task-list/ui/TaskList";

const HomePage: React.FC = () => {
    return (
        <Layout>
            <TaskList />
        </Layout>
    );
};

export default HomePage;
