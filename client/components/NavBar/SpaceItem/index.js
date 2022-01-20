import React from "react";
import styles from "./SpaceItem.module.css";
import ShieldIcon from '@mui/icons-material/Shield';

function SpaceItem({ isActive, spaceName }) {

  let containerStyle = {};

  if (!isActive) {
    containerStyle = {
      ...containerStyle,
      background: "#3c3d39",
      borderLeft: "3px solid #ffa12f"
    }
  }

  return (
    <div className={styles.spaceItem__container} style={containerStyle}>
      <ShieldIcon sx={{ width: "20px", height: "20px" }} />
      <div className={styles.spaceItem__title}>{spaceName}</div>
    </div>
  )
}

export default SpaceItem;
