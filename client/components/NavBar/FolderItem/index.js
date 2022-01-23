import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../SpaceItem/SpaceItem.module.css";
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItem from "../ListItem";
import { setActive } from "../../../redux/slices/spaceSlice";

function FolderItem({ id, folderName, contents, nestingLevel = 10 }) {
  const [revealerVisible, setRevealerVisible] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const isActive = useSelector(state => state.spaceReducer.activeItem) == id;
  const dispatch = useDispatch();

  let containerStyle = {
    paddingLeft: `${nestingLevel}px`,
    color: "white",
  };

  if (isActive) {
    console.log("Folder active");
    containerStyle = {
      ...containerStyle,
      background: "#3c3d39",
      borderLeft: "3px solid #ffa12f"
    }
  }

  const showRevealer = (event) => {
    setRevealerVisible(prev => !prev);
  }

  const setCurrentAsActive = (event) => {
    dispatch(setActive({ id }));
  }

  return (
    <>
      <div
        className={styles.item__container}
        style={containerStyle}
        onMouseEnter={() => { setShowIcons(true) }}
        onMouseLeave={() => { setShowIcons(false) }}
      >

        <div className={styles.item__titleContainer} onClick={setCurrentAsActive}>
          <FolderIcon sx={{ width: "16px", height: "16px", color: "lightgrey" }} />
          <div className={styles.folder__title}>{folderName}</div>
        </div>

        <KeyboardArrowDownIcon
          onClick={showRevealer}
          sx={{
            transform: revealerVisible ? "rotate(180deg)" : "",
            color: "white",
            display: showIcons ? "block" : "none",
          }}
        />

      </div>

      <div style={{ display: revealerVisible ? "block" : "none" }}>
        {
          contents.map(item => {
            if (item.itemType == "FOLDER") {
              return <FolderItem folderName={item.name} key={item.id} id={item.id} nestingLevel={nestingLevel + 10} />
            } else {
              return <ListItem listName={item.name} key={item.id} id={item.id} nestingLevel={nestingLevel + 10} />
            }
          })
        }
      </div>
    </>
  )
}

export default FolderItem;
