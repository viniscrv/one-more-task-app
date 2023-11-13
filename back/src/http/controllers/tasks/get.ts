import { Request, Response } from "express";
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";
import { GetTaskService } from "../../../services/get-task";
import { NotFoundError } from "../../../services/errors/not-found-error";

export async function getTask(req: Request, res: Response) {
  const userId = req.userId;
  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTasksRepository();
    const getTaskService = new GetTaskService(taskRepository);

    const response = await getTaskService.execute({ userId, taskId });
    return res.status(200).json({ response });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }

    throw err;
  }
}
