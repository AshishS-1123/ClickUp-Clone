import React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from '@mui/icons-material/Add';

const stringAvatar = (name, id) => {
  const colors = [
    "#7b68ee",
    "#ffa12f",
    "#ff5722",
    "#f42c2c",
    "#f8306d",
    "#4169e1",
    "#0ab4ff",
    "#5f81ff",
    "#07ao92",
    "#1db954",
    "#2ea52c",
    "#757380",
  ]

  return {
    sx: {
      bgcolor: colors[id],
      width: 32,
      height: 32,
      fontSize: "12px",
      outline: `1px dashed ${colors[id]}`,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function WorkspaceSelector() {
  const names = [
    "Workspace 1",
    "Workspace 2",
    "Workspace 3",
    "Workspace 4",
  ]
  return (
    <MenuItem>
      <Stack direction="column" spacing={1}>
        {
          names.map((name, idx) => {
            return <Avatar {...stringAvatar(name, idx)} key={idx} />
          })
        }

        <Avatar sx={{ outline: "1px dashed red", width: 32, height: 32, bgcolor: "white", color: "black" }}>
          <AddIcon />
        </Avatar>
      </Stack>
    </MenuItem>
  );
};

export default WorkspaceSelector;
