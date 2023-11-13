import { Prisma, Task } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TasksRepository } from "../tasks-repository";

export class PrismaTasksRepository implements TasksRepository {
  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async findMany(id: string): Promise<Task[] | null> {
    const tasks = await prisma.task.findMany({
      where: {
        userId: id,
      },
    });

    return tasks;
  }

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({
      data,
    });

    return task;
  }

  async save(taskPrisma: Task) {
    const data = taskPrisma;

    const task = await prisma.task.update({
      where: {
        id: data.id,
      },
      data,
    });

    return task;
  }

  async delete(id: string) {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
