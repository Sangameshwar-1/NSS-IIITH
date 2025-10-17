import React from "react";
import styles from "./404.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! Page not found.</p>
      <a href="/" className={styles.link}>
        Go back home
      </a>
    </div>
  );
}
