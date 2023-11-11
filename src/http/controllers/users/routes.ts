import { Router } from "express";
import { register } from "./register";
import { authenticate } from "./authenticate";

export const usersRoutes = Router();

usersRoutes.post("/register", register);
usersRoutes.post("/authenticate", authenticate);
