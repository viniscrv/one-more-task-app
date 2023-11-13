import { Trash } from "phosphor-react";
import React, { useState } from "react";
import styles from "./Task.module.css";

export interface taskProps {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  onDelete: (taskToDelete: string) => void;
  onToggle: (taskToToggle: string) => void;
}

const Task = ({ id, name, description, completed, onDelete, onToggle }: taskProps) => {
  function handleDelete() {
    onDelete(id);
  }

  function handleCompleted() {
    onToggle(id);
  }

  return (
    <div className={styles.task}>
      <div>
        <div className={!completed ? styles.checkbox : styles.checkbox_complete}>
          <label>
            {name}
            <span onClick={handleCompleted}>
              <input type="checkbox" id="task" />
            </span>
          </label>
        </div>
      </div>
      <button onClick={handleDelete}>
        <Trash size={26} />
      </button>
    </div>
  );
};

export default Task;
