import { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks-repository";
import { NotFoundError } from "./errors/not-found-error";

interface GetAllTasksServiceRequest {
  userId: string;
}

interface GetAllTasksServiceResponse {
  tasks: Task[];
}

export class GetAllTasksService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({
    userId,
  }: GetAllTasksServiceRequest): Promise<GetAllTasksServiceResponse> {
    const tasks = await this.tasksRepository.findMany(userId);

    if (!tasks) {
      throw new NotFoundError();
    }

    return { tasks };
  }
}
