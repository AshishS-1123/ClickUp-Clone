import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { setActive } from "../../../redux/slices/spaceSlice";
import styles from "../SpaceItem/SpaceItem.module.css";
import ListOptionsDialog from "./listOptionsDialog";
import themeColors from "../../../utils/contexts/themeContext";

function ListItem({ id, listName, nestingLevel = 10 }) {
  const isActive = useSelector((state) => state.spaceReducer.activeItem) == id;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [revealerVisible, setRevealerVisible] = useState(false);

  let containerStyle = {
    paddingLeft: `${nestingLevel}px`,
    color: themeColors.textBoldColor,
  };

  if (isActive) {
    containerStyle = {
      ...containerStyle,
      background: themeColors.accentColorFaded,
      borderLeft: `3px solid ${themeColors.accentColor}`,
    };
  }

  const closeOptions = (event) => {
    setAnchorEl(null);
  };

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const setCurrentAsActive = (event) => {
    dispatch(setActive({ id }));
  };

  return (
    <div
      className={styles.item__container}
      style={containerStyle}
      onMouseEnter={() => { setRevealerVisible(true); }}
      onMouseLeave={() => { setRevealerVisible(false); }}
    >
      <div className={styles.item__titleContainer} onClick={setCurrentAsActive}>
        <RadioButtonUncheckedIcon sx={{ width: "10px", height: "10px", color: themeColors.textBoldColor }} />
        <div className={styles.list__title}>{listName}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <MoreHorizIcon
          onClick={showOptions}
          sx={{
            visibility: (revealerVisible || openMenu) ? "visible" : "hidden",
            transform: "scale(0.7)",
            marginLeft: "15px",
          }}
        />
      </div>

      <ListOptionsDialog
        anchorEl={anchorEl}
        openMenu={openMenu}
        closeMenu={closeOptions}
        itemId={id}
        itemType="list"
        listName={listName}
      />
    </div>
  );
}

export default ListItem;
