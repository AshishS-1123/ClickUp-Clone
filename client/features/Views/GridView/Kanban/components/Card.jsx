import React from "react";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import { makeStringConsize } from "../../../../../utils/misc";
import styles from "./components.module.css";

const MAX_TITLE_LEN = 25;
const MAX_PARENT_LEN = 35;

function Card(props) {
  console.log("Props", props.priority.color);
  const consizeTitle = makeStringConsize(props.title, MAX_TITLE_LEN);
  const consizeParent = makeStringConsize(props.parent, MAX_PARENT_LEN);
  const priorityColor = props.priority.color;

  return (
    <div className={styles.card}>
      <span className={styles.card_parentName}>{consizeParent}</span>
      <span className={styles.card_title}>{consizeTitle}</span>
      
      <AssistantPhotoIcon sx={{ color: priorityColor }} />
    </div>
  )
}

export default Card;
