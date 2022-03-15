import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import SettingsManager from './SettingsManager';
import SpaceContainer from './SpaceContainer';
import themeColors from '../../utils/contexts/themeContext';

function DrawerToggler({ onClick, rotateBtn }) {
  const styles = {
    transform: rotateBtn === true ? 'rotate(180deg)' : 'rotate(0deg)',
    fill: themeColors.accentColor,
    marginTop: '9px',
  };
  return (
    <div
      aria-label="toggle-navbar"
      type='submit'
      onClick={onClick}
    >
      <DoubleArrowOutlinedIcon style={styles} />
    </div>
  );
}

function NavDrawer() {
  const [drawerState, setDrawerState] = useState(true);
  const toggleDrawer = (event) => {
    event.preventDefault();
    setDrawerState((state) => !state);
  };

  return (
    <>
      <DrawerToggler onClick={toggleDrawer} />
      <Drawer
        anchor="left"
        open={drawerState}
        variant="persistent"
        sx={{
          '> .MuiPaper-root': {
            background: themeColors.background,
            width: '250px',
          },
        }}
      >
        <Button
          variant="text"
          disableRipple
          // endIcon={<DrawerToggler onClick={toggleDrawer} rotateBtn />}
          sx={{
            color: themeColors.textColor,
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'capitalize',
          }}
        >
          ClickUp Clone
        </Button>

        <SpaceContainer />
        <SettingsManager />
      </Drawer>
    </>
  );
}

DrawerToggler.propTypes = {
  onClick: PropTypes.func,
  rotateBtn: PropTypes.bool,
};

DrawerToggler.defaultProps = {
  onClick: (e) => { e.preventDefault() },
  rotateBtn: false,
}

export default NavDrawer;
