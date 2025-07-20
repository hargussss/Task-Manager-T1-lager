import React from "react";
import Layout from "@/widgets/layout/Layout";
import TaskDetails from "@/features/task-details/ui/TaskDetails";

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
