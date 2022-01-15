import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import { makeStyles } from "@mui/styles";
import UserManager from "./UserManager";

//////////////////
const useDrawerStyles = makeStyles({
  paper: {
    background: "#20262b",
    width: "199px",
  }
});

const useButtonStyles = makeStyles({
  root: {
    color: "white",
    fontWeight: 900,
    fontSize: "16px",
    textTransform: "capitalize"
  }
})
//////////////////

const DrawerToggler = ({ onClick, rotateBtn }) => {
  const styles = {
    transform: rotateBtn == true ? "rotate(180deg)" : "rotate(0deg)",
    fill: "#ffa12f",
    marginTop: "9px"
  }
  return (
    <div aria-label="toggle-navbar" onClick={onClick}>
      <DoubleArrowOutlinedIcon style={styles} />
    </div>
  )
}

function NavDrawer() {
  const [drawerState, setDrawerState] = useState(true);
  const toggleDrawer = () => {
    setDrawerState(state => !state);
  };

  const drawerClasses = useDrawerStyles();
  const buttonClasses = useButtonStyles();

  return (
    <>
      <DrawerToggler onClick={toggleDrawer} />
      <Drawer
        anchor="left"
        open={drawerState}
        variant="persistent"
        classes={{ paper: drawerClasses.paper }}
      >
        <Button
          variant="text"
          disableRipple={true}
          endIcon={<DrawerToggler onClick={toggleDrawer} rotateBtn={true} />}
          classes={{ root: buttonClasses.root }}
        >ClickUp Clone</Button>

        <UserManager />
      </Drawer>
    </>
  );
};

export default NavDrawer;
