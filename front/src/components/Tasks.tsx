import React, { ReactElement, useState } from "react";
import styles from "./Tasks.module.css";
import Task from "./Task";
import Header from "./Header";

interface taskListProps {
  taskList: {
    task: string;
    isComplete: boolean;
  }[];
}

const Tasks = ({ taskList }: taskListProps) => {
  const [newTaskList, setNewTaskList] = useState(taskList);

  const [taskText, setTaskText] = useState("");

  const [taskProgress, setTaskProgress] = useState(0);

  const sizeTaskList = newTaskList.length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewTaskList([...newTaskList, { task: taskText, isComplete: false }]);

    setTaskText("");
  }

  function changeTaskText(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskText(e.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeleted = newTaskList.filter((task) => {
      if (task.task === taskToDelete) {
        if (task.isComplete) {
          setTaskProgress((prev) => prev - 1);
        }
      }

      return task.task !== taskToDelete;
    });

    setNewTaskList(tasksWithoutDeleted);
  }

  function toggleStatus(taskToToggle: string) {
    const taskToggled = newTaskList.map((task) => {
      if (task.task === taskToToggle) {
        if (task.isComplete) {
          setTaskProgress((prev) => prev - 1);
        } else {
          setTaskProgress((prev) => prev + 1);
        }

        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });

    setNewTaskList(taskToggled);
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
        {newTaskList.map((task) => {
          return (
            <Task
              key={task.task}
              content={task.task}
              status={task.isComplete}
              onDelete={deleteTask}
              onToggle={toggleStatus}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
