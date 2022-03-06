import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import styles from './UserSettings.module.css';
import themeColors from '../../../../utils/contexts/themeContext';

function UserSettings() {
  return (
    <MenuItem
      sx={{
        overflow: 'wrap',
        height: '100%',
        color: themeColors.textaccColor,
        cursor: 'default',
        '&:hover': {
          background: themeColors.background,
        }
      }}
      disableRipple
    >
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Avatar
            sx={{
              bgcolor: themeColors.accentColor,
              width: 32,
              height: 32,
              fontSize: '10px',
              color: themeColors.textColor,
              fontWeight: 400,
            }}
            children="AS"
          />
          <p>Ashish Shevale</p>
        </div>

        <ul>
          <li>My Settings</li>
          <li>Log Out</li>
          <li>Dark Mode</li>
        </ul>
      </div>
    </MenuItem>
  );
}

export default UserSettings;
