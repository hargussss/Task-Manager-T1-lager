import React from "react";
import Layout from "../../components/Layout";
import TaskDetails from "../../components/TaskDetails";

const TaskDetailsPage: React.FC = () => {
    return (
        <Layout>
            <div className="py-6">
                <TaskDetails />
            </div>
        </Layout>
    );
};

export default TaskDetailsPage;
