import React from "react";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Nav from "./Nav";
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Nav />
      <Header />
      <main className={styles.main}>{children} </main>
    </div>
  );
};

export default Layout;
