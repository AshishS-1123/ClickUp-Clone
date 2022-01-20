import React from "react";
import styles from "../SpaceItem/SpaceItem.module.css";
import FolderIcon from '@mui/icons-material/Folder';

function FolderItem({ isActive, folderName, nestingLevel = 10 }) {

  let containerStyle = {
    paddingLeft: `${nestingLevel}px`,
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
      <FolderIcon sx={{ width: "16px", height: "16px", color: "lightgrey" }} />
      <div className={styles.spaceItem__title}>{folderName}</div>
    </div>
  )
}

export default FolderItem;
