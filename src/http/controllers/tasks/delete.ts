import { Request, Response } from "express";
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";
import { DeleteTaskService } from "../../../services/delete-task";
import { NotFoundError } from "../../../services/errors/not-found-error";
import { NotAllowed } from "../../../services/errors/not-allowed";

export async function deleteTask(req: Request, res: Response) {
  const userId = req.userId;
  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTasksRepository();
    const deleteTaskService = new DeleteTaskService(taskRepository);

    await deleteTaskService.execute({ userId, taskId });

    return res.status(200).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }
    if (err instanceof NotAllowed) {
      return res.status(401).json({ message: err.message });
    }

    throw new Error();
  }
}
