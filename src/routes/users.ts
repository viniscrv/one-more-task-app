import { Router } from "express";
import { register } from "../http/controllers/users/register";
import { authenticate } from "../http/controllers/users/authenticate";

export const usersRoutes = Router();

usersRoutes.post("/register", register);
usersRoutes.post("/authenticate", authenticate);