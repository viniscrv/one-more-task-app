import { useState } from "react";
import "./global.css";
import styles from "./App.module.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const taskList = [
  {
    task: "Exemplo",
    isComplete: false,
  },
];

function App() {
  return (
    <>
      <Header />
      <div className={styles.App}>
        <Tasks taskList={taskList} />
      </div>
    </>
  );
}

export default App;
