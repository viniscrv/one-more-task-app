import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { NotFoundError } from "./errors/not-found-error";
import { NotAllowed } from "./errors/not-allowed";

interface UpdateTaskServiceRequest {
  name?: string;
  description?: string;
  userId: string;
  taskId: string;
}

interface UpdateTaskServiceResponse {
  task: Task;
}

export class UpdateTaskService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({
    name,
    description,
    taskId,
    userId,
  }: UpdateTaskServiceRequest): Promise<UpdateTaskServiceResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError();
    }

    if (task.userId !== userId) {
      throw new NotAllowed();
    }

    if (name) task.name = name;
    if (description) task.description = description;

    await this.tasksRepository.save(task);

    return { task };
  }
}
