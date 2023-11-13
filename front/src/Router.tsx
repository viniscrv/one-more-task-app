import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";

export function Router() {
  

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}
