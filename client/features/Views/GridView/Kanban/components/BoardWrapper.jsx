import React from "react";
import styles from "./components.module.css";

function BoardWrapper({ children, ...props }) {

  return (
    <div className={styles.boardWrapper} >
      {children}
    </div >
  )
}

export default BoardWrapper;
