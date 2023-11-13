import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";

export function Router() {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await api.get("/tasks/list");

      setTasks(tasks.data);
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Tasks taskList={tasks!} />} />
    </Routes>
  );
}
