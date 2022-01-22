import React, { useState } from "react";
import styles from "../SpaceItem/SpaceItem.module.css";
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItem from "../ListItem";

function FolderItem({ isActive, folderName, contents, nestingLevel = 10 }) {
  const [revealerVisible, setRevealerVisible] = useState(false);

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

  const showRevealer = (event) => {
    setRevealerVisible(prev => !prev);
  }

  return (
    <>
    <div className={styles.spaceItem__container} style={containerStyle}>

        <div className={styles.spaceItem__titleContainer}>
          <FolderIcon sx={{ width: "16px", height: "16px", color: "lightgrey" }} />
          <div className={styles.spaceItem__title}>{folderName}</div>
        </div>

        <KeyboardArrowDownIcon
          onClick={showRevealer}
          sx={{
            transform: revealerVisible ? "rotate(180deg)" : "",
            color: "white",
          }}
        />

      </div>

      <div style={{ display: revealerVisible ? "block" : "none" }}>
        {
          contents.map(item => {
            if (item.itemType == "FOLDER") {
              return <FolderItem folderName={item.name} key={item.id} nestingLevel={nestingLevel + 10} />
            } else {
              return <ListItem listName={item.name} key={item.id} nestingLevel={nestingLevel + 10} />
            }
          })
        }
      </div>
    </>
  )
}

export default FolderItem;
