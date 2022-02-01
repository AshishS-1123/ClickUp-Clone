import React, { useState } from "react";
import styles from "./SpaceItem.module.css";
import ShieldIcon from '@mui/icons-material/Shield';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import FolderItem from "../FolderItem";
import ListItem from "../ListItem";
import { setActive } from "../../../redux/slices/spaceSlice";

function SpaceItem({ id, spaceName, contents }) {
  const isActive = useSelector(state => state.spaceReducer.activeItem) == id;
  const [showIcons, setShowIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const [revealerVisible, setRevealerVisible] = useState(false);

  let containerStyle = {
    color: "white",
  };

  const menuItemStyle = {
    padding: "8px",
    color: "#d5d6d7",
    fontSize: "13px",
  }

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

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closeOptions = (event) => {
    setAnchorEl(null);
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
          <ShieldIcon sx={{ width: "20px", height: "20px", color: "#ffa12f" }} />
          <div className={styles.item__title}>{spaceName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <MoreHorizIcon
            onClick={showOptions}
            sx={{
              visibility: showIcons ? "visible" : "hidden",
              transform: "scale(0.7)"
            }}
          />
          <KeyboardArrowDownIcon
            onClick={showRevealer}
            sx={{
              transform: revealerVisible ? "rotate(180deg) scale(0.7)" : "scale(0.7)",
              display: showIcons ? "block" : "none",
            }}
          />
        </div>


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

      <Menu
        sx={{
          "& .MuiMenu-paper": {
            background: "#384047",
            color: "#979797",
          },
          "& li": {
            fontSize: "13px",
          }
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={closeOptions}
      >
        <h5 style={{ fontWeight: "600", padding: "5px 20px", fontSize: "11px" }}>SPACE SETTINGS</h5>
        <MenuItem style={menuItemStyle}><AddIcon />Add Folder</MenuItem>
        <MenuItem style={menuItemStyle}><AddIcon />Add List</MenuItem>
        <MenuItem style={menuItemStyle}><EditIcon />Edit</MenuItem>
        <MenuItem style={menuItemStyle}><DeleteIcon />Delete</MenuItem>

      </Menu>
    </>
  )
}

export default SpaceItem;
