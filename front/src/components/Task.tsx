import { Trash } from "phosphor-react";
import React, { useState } from "react";
import styles from "./Task.module.css";

interface taskProps {
  content: string;
  status: boolean;
  onDelete: (taskToDelete: string) => void;
  onToggle: (taskToToggle: string) => void;
}

const Task = ({ content, status, onDelete, onToggle }: taskProps) => {
  function handleDelete() {
    onDelete(content);
  }

  function handleStatus() {
    onToggle(content);
  }

  return (
    <div className={styles.task}>
      <div>
        <div className={!status ? styles.checkbox : styles.checkbox_complete}>
          <label>
            {content}
            <span onClick={handleStatus}>
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
