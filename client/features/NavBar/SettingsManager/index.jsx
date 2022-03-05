import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';

import WorkspaceSelector from './WorkspaceSelector';
import WorkspaceManager from './WorkspaceManager';
import UserSettings from './UserSettings';
import themeColors from '../../../utils/contexts/themeContext';

function SettingsManager() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{
      position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)',
    }}
    >
      <Button
        variant="text"
        startIcon={<SettingsIcon />}
        endIcon={<ArrowDropDownIcon />}
        disableRipple
        onClick={handleButtonClick}
        sx={{
          color: themeColors.textColor,
          textTransform: 'capitalize',
        }}
      >
        Settings
      </Button>

      <Menu
        id="Menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          ul: {
            background: themeColors.background,
          },
        }}
        PaperProps={{
          filter: `drop-shadow(0px 2px 8px black)`,
        }}
      >
        <Grid container spacing={1} sx={{ width: '410px', minHeight: '366px' }}>
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
            <WorkspaceSelector />
          </Grid>
          <Divider orientation="vertical" flexItem light sx={{ right: { background: themeColors.backgroundDark } }} variant="middle" />
          <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
            <WorkspaceManager />
          </Grid>
          <Divider orientation="vertical" flexItem light sx={{ right: { background: themeColors.backgroundDark } }} variant="middle" />
          <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
            <UserSettings />
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
}

export default SettingsManager;
