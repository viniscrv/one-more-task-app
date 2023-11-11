import { TasksRepository } from "../repositories/tasks-repository";
import { NotFoundError } from "./errors/not-found-error";
import { NotAllowed } from "./errors/not-allowed";

interface DeleteTaskServiceRequest {
  userId: string;
  taskId: string;
}

// interface DeleteTaskServiceResponse {}

export class DeleteTaskService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({ userId, taskId }: DeleteTaskServiceRequest): Promise<void> {
    const task = await this.tasksRepository.findById(taskId);

    console.log(task);

    if (!task) {
      throw new NotFoundError();
    }

    if (task.userId !== userId) {
      throw new NotAllowed();
    }

    await this.tasksRepository.delete(taskId);
  }
}
