import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import SettingsManager from './SettingsManager';
import SpaceContainer from './SpaceContainer';

function DrawerToggler({ onClick, rotateBtn }) {
  const styles = {
    transform: rotateBtn === true ? 'rotate(180deg)' : 'rotate(0deg)',
    fill: '#ffa12f',
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
            background: '#20262b',
            width: '199px',
          },
        }}
      >
        <Button
          variant="text"
          disableRipple
          endIcon={<DrawerToggler onClick={toggleDrawer} rotateBtn />}
          sx={{
            color: 'white',
            fontWeight: 900,
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
