import React from "react";
import styles from "../SpaceItem/SpaceItem.module.css";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function ListItem({ isActive, listName, nestingLevel = 10 }) {

  let containerStyle = {
    paddingLeft: `${nestingLevel}px`,
    color: "white",
  };

  if (isActive) {
    containerStyle = {
      ...containerStyle,
      background: "#3c3d39",
      borderLeft: "3px solid #ffa12f"
    }
  }

  return (
    <div className={styles.spaceItem__container} style={containerStyle}>
      <div className={styles.spaceItem__titleContainer}>
        <RadioButtonUncheckedIcon sx={{ width: "12px", height: "12px", color: "lightgrey" }} />
        <div className={styles.spaceItem__title}>{listName}</div>
      </div>
    </div>
  )
}

export default ListItem;
