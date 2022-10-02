import React from "react";
import styles from "./components.module.css";

function LaneHeader(props) {
  return (
    <div className={styles.laneHeader} style={props.style}>
      <span>{props.title}</span>
      <span className={styles.laneHeader_bubble}>{props.cards.length}</span>
    </div >
  )
}

export default LaneHeader;
