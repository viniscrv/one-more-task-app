import { Router } from "express";
import { createTask } from "./create";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { getTask } from "./get";
import { deleteTask } from "./delete";
import { updateTask } from "./update";
import { getAllTasks } from "./get-all";

export const tasksRoutes = Router();

tasksRoutes.post("/tasks/create", verifyJWT, createTask);
tasksRoutes.get("/tasks/list", verifyJWT, getAllTasks);
tasksRoutes.get("/tasks/:taskId", verifyJWT, getTask);
tasksRoutes.put("/tasks/:taskId", verifyJWT, updateTask);
tasksRoutes.delete("/tasks/:taskId", verifyJWT, deleteTask);