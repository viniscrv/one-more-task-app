import { Prisma, Task } from "@prisma/client";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;

  findMany(id: string): Promise<Task[] | null>;

  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;

  save(task: Task): Promise<Task>;

  delete(id: string): Promise<void>;
}
