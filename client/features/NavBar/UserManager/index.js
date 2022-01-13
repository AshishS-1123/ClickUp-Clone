import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';

import WorkspaceSelector from "./WorkspaceSelector";
import WorkspaceManager from "./WorkspaceManager";
import UserSettings from "./UserSettings";

function UserManager() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  return (
    <div style={{ position: "absolute", bottom: "5px", left: "50%", transform: "translateX(-50%)" }}>
      <Button
        variant="text"
        startIcon={<SettingsIcon />}
        endIcon={<ArrowDropDownIcon />}
        disableRipple={true}
        onClick={handleButtonClick}
        sx={{
          color: "white",
          textTransform: "capitalize"
        }}
      >Settings</Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "ul": {
            background: "#384047"
          }
        }}
        PaperProps={{
          filter: 'drop-shadow(0px 2px 8px #384047)',
        }}
      >
        <Grid container spacing={1} sx={{ width: "600px" }} >
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
            <WorkspaceSelector />
          </Grid>
          <Divider orientation="vertical" flexItem={true} light={true} sx={{ right: { background: "#20262b" } }} variant="middle" />
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <WorkspaceManager />
          </Grid>
          <Divider orientation="vertical" flexItem={true} light={true} sx={{ right: { background: "#20262b" } }} variant="middle" />
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <UserSettings />
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
};

export default UserManager;
