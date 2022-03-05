import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from '../SpaceItem/SpaceItem.module.css';
import ListItem from '../ListItem';
import { setActive } from '../../../redux/slices/spaceSlice';
import FolderOptionsDialog from './folderOptionsDialog';
import themeColors from '../../../utils/contexts/themeContext';

function FolderItem({
  id, folderName, contents, nestingLevel = 10,
}) {
  const [revealerVisible, setRevealerVisible] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const isActive = useSelector((state) => state.spaceReducer.activeItem) == id;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

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

  const showRevealer = (event) => {
    setRevealerVisible((prev) => !prev);
  };

  const setCurrentAsActive = (event) => {
    dispatch(setActive({ id }));
  };

  const showOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeOptions = (event) => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className={styles.item__container}
        style={containerStyle}
        onMouseEnter={() => { setShowIcons(true); }}
        onMouseMove={() => { setShowIcons(true); }}
        onMouseLeave={() => { setShowIcons(false); }}
      >

        <div className={styles.item__titleContainer} onClick={setCurrentAsActive}>
          <FolderIcon sx={{ width: '16px', height: '16px', color: themeColors.textBoldColor }} />
          <h5 className={styles.folder__title}>{folderName}</h5>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <MoreHorizIcon
            onClick={showOptions}
            sx={{
              visibility: (showIcons || openMenu) ? 'visible' : 'hidden',
              transform: 'scale(0.7)',
            }}
          />

          <KeyboardArrowDownIcon
            onClick={showRevealer}
            sx={{
              transform: revealerVisible ? 'rotate(180deg) scale(0.7)' : 'scale(0.7)',
              display: showIcons ? 'block' : 'none',
            }}
          />
        </div>

      </div>

      <div style={{ display: revealerVisible ? 'block' : 'none' }}>
        {
          contents && contents.map((item) => {
            if (item.itemType === 'FOLDER') {
              return (
                <FolderItem
                  key={item.id}
                  folderName={item.name}
                  id={item.id}
                  nestingLevel={nestingLevel + 10}
                  contents={item.contents}
                />
              );
            } if (item.itemType === 'LIST') {
              return (
                <ListItem
                  key={item.id}
                  id={item.id}
                  listName={item.name}
                  nestingLevel={nestingLevel + 10}
                />
              );
            }
          })
        }
      </div>

      <FolderOptionsDialog
        anchorEl={anchorEl}
        openMenu={openMenu}
        closeMenu={closeOptions}
        itemId={id}
        itemType="folder"
      />
    </>
  );
}

export default FolderItem;
