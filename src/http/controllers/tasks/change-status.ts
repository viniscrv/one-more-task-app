import { z } from "zod";
import { Request, Response } from "express";
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";
import { NotFoundError } from "../../../services/errors/not-found-error";
import { NotAllowed } from "../../../services/errors/not-allowed";
import { ChangeStatusTaskService } from "../../../services/change-status-task";

export async function changeStatusTask(req: Request, res: Response) {
  const userId = req.userId;
  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTasksRepository();
    const changeStatusTaskService = new ChangeStatusTaskService(taskRepository);

    const response = await changeStatusTaskService.execute({
      userId,
      taskId,
    });
    return res.status(200).json({ response });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }
    if (err instanceof NotAllowed) {
      return res.status(401).json({ message: err.message });
    }

    throw err;
  }
}
