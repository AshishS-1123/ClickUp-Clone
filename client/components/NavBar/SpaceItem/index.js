import React, { useState } from "react";
import styles from "./SpaceItem.module.css";
import ShieldIcon from '@mui/icons-material/Shield';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FolderItem from "../FolderItem";
import ListItem from "../ListItem";

function SpaceItem({ isActive, spaceName, contents }) {
  const [revealerVisible, setRevealerVisible] = useState(false);

  let containerStyle = {};

  if (isActive) {
    containerStyle = {
      ...containerStyle,
      background: "#3c3d39",
      borderLeft: "3px solid #ffa12f"
    }
  }

  const showRevealer = (event) => {
    setRevealerVisible(prev => !prev);
  }

  return (
    <>
      <div className={styles.spaceItem__container} style={containerStyle}>

        <div className={styles.spaceItem__titleContainer}>
          <ShieldIcon sx={{ width: "20px", height: "20px" }} />
          <div className={styles.spaceItem__title}>{spaceName}</div>
        </div>

        <KeyboardArrowDownIcon
          onClick={showRevealer}
          sx={{
            transform: revealerVisible ? "rotate(180deg)" : "",
          }}
        />

      </div>

      <div style={{ display: revealerVisible ? "block" : "none" }}>
        {
          contents.map(item => {
            if (item.childType == "FOLDER") {
              return <FolderItem folderName={item.id} key={item.id} />
            } else {
              return <ListItem listName={item.id} key={item.id} />
            }
          })
        }
      </div>
    </>
  )
}

export default SpaceItem;
