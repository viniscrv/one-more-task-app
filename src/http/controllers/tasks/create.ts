import { z } from "zod";
import { Request, Response } from "express";
import { CreateTaskService } from "../../../services/create-task";
import { PrismaTasksRepository } from "../../../repositories/prisma/prisma-tasks-repository";

export async function createTask(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const { name, description } = registerBodySchema.parse(req.body);
  const userId = req.userId;

  try {
    const taskRepository = new PrismaTasksRepository();
    const createTaskService = new CreateTaskService(taskRepository);

    const response = await createTaskService.execute({
      name,
      description,
      userId,
    });
    return res.status(200).json({ response });
  } catch (err) {
    throw err;
  }
}
