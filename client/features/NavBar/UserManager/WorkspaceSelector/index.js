import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkspacesAsync } from "../../../../redux/slices/workspaceSlice";

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

  const children = name.split(" ").length >= 2
    ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
    : name.substr(0, 2);

  return {
    sx: {
      bgcolor: colors[id],
      width: 32,
      height: 32,
      fontSize: "12px",
      outline: `1px dashed ${colors[id]}`,
    },
    children: children,
  };
}

function WorkspaceSelector() {
  const dispatch = useDispatch();
  const workspaces = useSelector(state => state.workspaceReducer.workspaces);
  const userId = useSelector(state => state.authReducer.userId);
  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    // Dispatch request to fetch workspaces.
    dispatch(getAllWorkspacesAsync({ userId, token }))
  }, []);

  useEffect(() => {
  }, [workspaces])

  return (
    <>
      <Stack direction="column" spacing={1.5} alignItems="center" justifyContent="center">
        {
          workspaces.map((item, idx) => {
            return <Avatar {...stringAvatar(item.name, idx)} key={item.id} />
          })
        }

        <Avatar sx={{ outline: "1px dashed red", width: 32, height: 32, bgcolor: "white", color: "black" }}>
          <AddIcon onClick={() => { console.log("Clicked"); }} />
        </Avatar>
      </Stack>
    </>
  );
};

export default WorkspaceSelector;
