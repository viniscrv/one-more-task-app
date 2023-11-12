import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { NotFoundError } from "./errors/not-found-error";
import { NotAllowed } from "./errors/not-allowed";

interface ChangeStatusTaskServiceRequest {
  userId: string;
  taskId: string;
}

interface ChangeStatusTaskServiceResponse {
  task: Task;
}

export class ChangeStatusTaskService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({
    taskId,
    userId,
  }: ChangeStatusTaskServiceRequest): Promise<ChangeStatusTaskServiceResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError();
    }

    if (task.userId !== userId) {
      throw new NotAllowed();
    }

    task.completed = !task.completed;

    await this.tasksRepository.save(task);

    return { task };
  }
}
