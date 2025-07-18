export type TaskCategory =
    | "Bug"
    | "Feature"
    | "Documentation"
    | "Refactor"
    | "Test";
export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export type Task = {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
};
