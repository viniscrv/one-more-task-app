import { Request, Response } from "express";
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";
import { NotFoundError } from "../../../services/errors/not-found-error";
import { GetAllTasksService } from "../../../services/get-all-tasks";

export async function getAllTasks(req: Request, res: Response) {
  const userId = req.userId;

  try {
    const taskRepository = new PrismaTasksRepository();
    const getAllTasksService = new GetAllTasksService(taskRepository);

    const response = await getAllTasksService.execute({ userId });
    return res.status(200).json({ response });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }

    throw err;
  }
}
