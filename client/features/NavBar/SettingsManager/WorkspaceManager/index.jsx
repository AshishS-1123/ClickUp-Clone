import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import styles from './WorkspaceManager.module.css';
import themeColors from '../../../../utils/contexts/themeContext';

const getAbbrev = (name) => {
  const abbrev = name.split(' ').length >= 2
    ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    : name.substr(0, 2);

  return abbrev;
};

const shortenName = (name) => {
  const length = 9;

  let res = name.substr(0, length);
  if (res.length != name.length) {
    res += '...';
  }

  return res;
};

function WorkspaceManager() {
  const workspaceData = useSelector((state) => state.workspaceReducer);
  const activeWorkspace = workspaceData.workspaces[workspaceData.activeWorkspace];
  const workspaceName = shortenName(activeWorkspace.name);

  return (
    <MenuItem sx={{
      overflow: 'wrap',
      height: '100%',
      color: themeColors.textColor,
      padding: '6px 6px',
      '&:hover': {
        background: themeColors.background,
      }
    }}
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
            }}
            children={getAbbrev(activeWorkspace.name)}
          />
          <p>{workspaceName}</p>
        </div>

        <ul>
          <li>Settings</li>
          <li>Import/Export</li>
          <li>Spaces</li>
        </ul>
      </div>
    </MenuItem>
  );
}

export default WorkspaceManager;
