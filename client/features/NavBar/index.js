import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import UserManager from "./UserManager";

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

  return (
    <>
      <DrawerToggler onClick={toggleDrawer} />
      <Drawer
        anchor="left"
        open={drawerState}
        variant="persistent"
        sx={{
          "> .MuiPaper-root": {
            background: "#20262b",
            width: "199px",
          }
        }}
      >
        <Button
          variant="text"
          disableRipple={true}
          endIcon={<DrawerToggler onClick={toggleDrawer} rotateBtn={true} />}
          sx={{
            color: "white",
            fontWeight: 900,
            fontSize: "16px",
            textTransform: "capitalize"
          }}
        >ClickUp Clone</Button>

        <UserManager />
      </Drawer>
    </>
  );
};

export default NavDrawer;
