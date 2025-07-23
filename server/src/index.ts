import express, { Request, Response } from "express";
import cors from "cors";
import { Task } from "./types/Task";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage
let tasks: Task[] = [
    {
        id: "1",
        title: "Fix login flow",
        description: "Fix the redirect after login on mobile",
        category: "Bug",
        status: "In Progress",
        priority: "High",
        createdAt: new Date("2024-01-01").toISOString(),
    },
    {
        id: "2",
        title: "Add dark mode",
        description: "Implement dark mode toggle in settings",
        category: "Feature",
        status: "To Do",
        priority: "Medium",
        createdAt: new Date("2024-02-01").toISOString(),
    },
    {
        id: "3",
        title: "Update documentation",
        description: "Update the getting started guide",
        category: "Documentation",
        status: "Done",
        priority: "Low",
        createdAt: new Date("2024-03-01").toISOString(),
    },
];

// GET /tasks — получить все задачи
app.get("/tasks", (req: Request, res: Response) => {
    const { search, from, to } = req.query;

    let filtered = [...tasks];

    if (search) {
        filtered = filtered.filter(
            (task) =>
                task.title
                    .toLowerCase()
                    .includes((search as string).toLowerCase()) ||
                task.description
                    .toLowerCase()
                    .includes((search as string).toLowerCase())
        );
    }

    if (from) {
        filtered = filtered.filter(
            (task) => new Date(task.createdAt) >= new Date(from as string)
        );
    }

    if (to) {
        filtered = filtered.filter(
            (task) => new Date(task.createdAt) <= new Date(to as string)
        );
    }

    res.json(filtered);
});

// GET /tasks/:id
app.get("/tasks/:id", (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

// POST /tasks
app.post("/tasks", (req: Request, res: Response) => {
    const newTask: Task = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PATCH /tasks/:id
app.patch("/tasks/:id", (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to Task Manager API", docs: "/tasks" });
});

export default app;
