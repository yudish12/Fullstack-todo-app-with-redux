import { Express, Request, Response } from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
} from "../controllers/taskController";

export default function (app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: "Success",
      message: "Hello from server",
    });
  });

  app.get("/api/tasks", getAllTasks);

  app.post("/api/tasks", createTask);

  app.delete("/api/tasks/:id", deleteTask);

  app.patch("/api/tasks/:id", editTask);
}
