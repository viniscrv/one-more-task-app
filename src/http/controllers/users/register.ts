import { z } from "zod";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { RegisterService } from "../../../services/register";
import { Request, Response } from "express";

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({ username, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }

    throw err;
  }

  return res.status(201).send();
}
