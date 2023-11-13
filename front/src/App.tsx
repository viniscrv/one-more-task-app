import { useEffect, useState } from "react";
import "./global.css";
import styles from "./App.module.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { api } from "./lib/axios";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
