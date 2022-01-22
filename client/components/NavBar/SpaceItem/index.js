import React, { useState } from "react";
import styles from "./SpaceItem.module.css";
import ShieldIcon from '@mui/icons-material/Shield';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from "react-redux";
import FolderItem from "../FolderItem";
import ListItem from "../ListItem";
import { setActive } from "../../../redux/slices/spaceSlice";

function SpaceItem({ id, spaceName, contents }) {
  const isActive = useSelector(state => state.spaceReducer.activeItem) == id;
  const dispatch = useDispatch();

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

  const setCurrentAsActive = (event) => {
    dispatch(setActive({ id }));
  }

  return (
    <>
      <div className={styles.spaceItem__container} style={containerStyle}>

        <div className={styles.spaceItem__titleContainer} onClick={setCurrentAsActive}>
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
            if (item.itemType == "FOLDER") {
              return <FolderItem folderName={item.name} contents={item.contents} id={item.id} nestingLevel={20} key={item.id} />
            } else {
              return <ListItem listName={item.name} contents={item.contents} id={item.id} nestingLevel={20} key={item.id} />
            }
          })
        }
      </div>
    </>
  )
}

export default SpaceItem;
