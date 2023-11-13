import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logo} />
    </div>
  );
};

export default Header;
