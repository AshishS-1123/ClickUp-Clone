import React from "react";
import styles from "./Card.module.css";

export default function createSection(Component) {
  function HOC() {
    return (
      <div className={styles.Card}>
        <Component />
      </div>
    );
  }

  return HOC;
}
