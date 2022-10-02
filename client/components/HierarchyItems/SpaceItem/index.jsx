import React, { useState } from "react";
import ShieldIcon from "@mui/icons-material/Shield";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SpaceItem.module.css";
import FolderItem from "../FolderItem";
import ListItem from "../ListItem";
import { setActive } from "../../../redux/slices/spaceSlice";
import SpaceOptionsDialog from "./spaceOptionsDialog";
import themeColors from "../../../utils/contexts/themeContext";

function SpaceItem({ id, spaceName, contents }) {
  const activeSpace = useSelector((state) => state.spaceReducer.activeItem);
  const isActive = Boolean(activeSpace == id);
  const [showIcons, setShowIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const [revealerVisible, setRevealerVisible] = useState(false);

  let containerStyle = {
    color: themeColors.textBoldColor,
  };

  if (isActive) {
    containerStyle = {
      ...containerStyle,
      background: themeColors.accentColorFaded,
      borderLeft: `3px solid ${themeColors.accentColor}`,
    };
  }

  const showRevealer = (event) => {
    setRevealerVisible((prev) => !prev);
  };

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeOptions = (event) => {
    setAnchorEl(null);
  };

  const setCurrentAsActive = (event) => {
    dispatch(setActive({ id }));
  };

  return (
    <>
      <div
        className={styles.item__container}
        style={containerStyle}
        onMouseEnter={() => { setShowIcons(true); }}
        onMouseLeave={() => { setShowIcons(false); }}
      >

        <div className={styles.item__titleContainer} onClick={setCurrentAsActive}>
          <ShieldIcon sx={{ width: "20px", height: "20px", color: themeColors.accentColor }} />
          <div className={styles.item__title}>{spaceName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <MoreHorizIcon
            onClick={showOptions}
            sx={{
              visibility: (showIcons || openMenu) ? "visible" : "hidden",
              transform: "scale(0.7)",
            }}
          />
          <KeyboardArrowDownIcon
            onClick={showRevealer}
            sx={{
              transform: revealerVisible ? "rotate(180deg) scale(0.7)" : "scale(0.7)",
              display: (showIcons || openMenu) ? "block" : "none",
            }}
          />
        </div>

      </div>

      <div style={{ display: revealerVisible ? "block" : "none", marginTop: "0" }}>
        {
          contents.map((item) => {
            if (item.itemType == "FOLDER") {
              return <FolderItem folderName={item.name} contents={item.contents} id={item.id} nestingLevel={20} key={item.id} />;
            }
            return <ListItem listName={item.name} contents={item.contents} id={item.id} nestingLevel={20} key={item.id} />;
          })
        }
      </div>

      <SpaceOptionsDialog anchorEl={anchorEl} openMenu={openMenu} closeMenu={closeOptions} id={id} />
    </>
  );
}

export default SpaceItem;
