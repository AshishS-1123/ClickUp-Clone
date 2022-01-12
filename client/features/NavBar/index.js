import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import styles from "./NavDrawer.module.css";
import UserManager from "./UserManager";

const DrawerToggler = ({ onClick, rotateBtn }) => {
  const styles = {
    transform: rotateBtn == true ? "rotate(180deg)" : "rotate(0deg)",
    fill: "#ffa12f",
  }
  return (
    <IconButton aria-label="toggle-navbar" onClick={onClick}>
      <DoubleArrowOutlinedIcon style={styles} />
    </IconButton>
  )
}

function NavDrawer() {
  const [drawerState, setDrawerState] = useState(true);
  const toggleDrawer = () => {
    setDrawerState(state => !state);
  };

  return (
    <>
      <DrawerToggler onClick={toggleDrawer} />
      <Drawer
        className={styles.drawer}
        anchor="left"
        open={drawerState}
        variant="persistent"
      >
        <Button
          className={styles.buttonText}
          variant="text"
          disableRipple={true}
          endIcon={<DrawerToggler onClick={toggleDrawer} rotateBtn={true} />}
        >ClickUp Clone</Button>

        <UserManager />
      </Drawer>
    </>
  );
};

export default NavDrawer;
