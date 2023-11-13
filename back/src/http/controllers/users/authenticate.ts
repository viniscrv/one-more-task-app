import { z } from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../../../services/authenticate";
import { InvalidCredentialsError } from "../../../services/errors/invalid-credentials-error";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    const { user } = await authenticateService.execute({ email, password });

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    return res.status(200).json({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: err.message });
    }

    throw err;
  }
}
