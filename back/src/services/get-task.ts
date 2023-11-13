import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { NotFoundError } from "./errors/not-found-error";

interface GetTaskServiceRequest {
  userId: string;
  taskId: string;
}

interface GetTaskServiceResponse {
  task: Task;
}

export class GetTaskService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({
    userId,
    taskId,
  }: GetTaskServiceRequest): Promise<GetTaskServiceResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task || task.userId !== userId) {
      throw new NotFoundError();
    }

    return { task };
  }
}
