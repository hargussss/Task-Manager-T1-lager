import React from "react";
import Layout from "../../components/Layout";
import TaskList from "../../components/TaskList";

const HomePage: React.FC = () => {
    return (
        <Layout>
            <TaskList />
        </Layout>
    );
};

export default HomePage;
