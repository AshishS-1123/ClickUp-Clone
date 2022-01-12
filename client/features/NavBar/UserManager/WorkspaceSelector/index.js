import React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";


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
    <>
      <Stack direction="column" spacing={1}>
        {
          names.map((name, idx) => {
            return <Avatar {...stringAvatar(name, idx)} key={idx} />
          })
        }
      </Stack>
    </>
  );
};

export default WorkspaceSelector;
