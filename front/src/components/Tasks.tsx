import React, { ReactElement, useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import Task, { taskProps } from "./Task";
import Header from "./Header";
import { api } from "../lib/axios";
import { AxiosError } from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await api.get("/tasks/list");

      console.log(tasks.data.response.tasks);

      setTasks(tasks.data.response.tasks);
    };

    fetchData();
  }, [updateTasks]);

  const [taskText, setTaskText] = useState("");

  const [taskProgress, setTaskProgress] = useState(0);

  const sizeTaskList = tasks.length;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setTasks([...tasks, { task: taskText, complete: false }]);

    await api.post(`/tasks/create`, {
      name: taskText,
      description: "",
    });

    setUpdateTasks(updateTasks + 1);

    setTaskText("");
  }

  function changeTaskText(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskText(e.target.value);
  }

  async function deleteTask(taskId: string) {
    try {
      await api.delete(`/tasks/${taskId}`);

      tasks.filter((task: taskProps) => {
        if (task.id === taskId) {
          if (task.completed) {
            setTaskProgress((prev) => prev - 1);
          }
        }
        return task.id !== taskId;
      });

      setUpdateTasks(updateTasks + 1);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return console.log(err.response.data.message);
      }
    }
  }

  async function toggleComplete(taskId: string) {
    try {
      await api.patch(`/tasks/${taskId}`);

      console.log(tasks);

      tasks.map((task: taskProps) => {
        if (task.id === taskId) {
          if (task.completed) {
            setTaskProgress((prev) => prev - 1);
          } else {
            setTaskProgress((prev) => prev + 1);
          }
          return { ...task, complete: !task.completed };
        }
        return task;
      });

      setUpdateTasks(updateTasks + 1);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        return console.log(err.response.data.message);
      }
    }
  }

  return (
    <div className={styles.App}>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          required
          onChange={changeTaskText}
          value={taskText}
        />
        <button type="submit">Criar</button>
      </form>

      <div className={styles.informacoes}>
        <div className={styles.informacoes__criadas}>
          Tarefas criadas<span>{sizeTaskList}</span>
        </div>
        <div className={styles.informacoes__concluidas}>
          Concluídas
          <span>
            {taskProgress} de {sizeTaskList}
          </span>
        </div>
      </div>

      <div>
        {tasks.map((task: taskProps) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              completed={task.completed}
              onDelete={deleteTask}
              onToggle={toggleComplete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
