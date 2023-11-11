import { z } from "zod";
import { Request, Response } from "express";
import { UpdateTaskService } from "../../../services/update-task";
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";
import { NotFoundError } from "../../../services/errors/not-found-error";
import { NotAllowed } from "../../../services/errors/not-allowed";

export async function updateTask(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const { name, description } = registerBodySchema.parse(req.body);
  const userId = req.userId;
  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTasksRepository();
    const updateTaskService = new UpdateTaskService(taskRepository);

    const response = await updateTaskService.execute({
      name,
      description,
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
