import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { usersRoutes } from "./http/controllers/users/routes";
import { tasksRoutes } from "./http/controllers/tasks/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.use(cors());
app.use(express.json());

app.use(usersRoutes);
app.use(tasksRoutes);

app.listen(PORT, function () {
  console.clear();
  console.log(`HTTP Server running on port ${PORT}`);
});
