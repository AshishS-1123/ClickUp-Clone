import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import styles from './UserSettings.module.css';

function UserSettings() {
  return (
    <MenuItem sx={{ overflow: 'wrap', height: '100%', color: 'white' }}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Avatar
            sx={{
              bgcolor: '#ffa12f',
              width: 32,
              height: 32,
              fontSize: '10px',
              color: 'black',
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
