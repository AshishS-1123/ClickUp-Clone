import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import themeColors from "../../../utils/contexts/themeContext";
import ColorChooserWidget from "../../Misc/ColorChooserWidget";

function PrioritiesDialog({ open, closeDialog, handleCreatePriority, existingPriorities }) {
  const [priorityColor, setPriorityColor] = useState("");

  // const priorities = [
  //   { _id: '0', level: 'urgent', color: 'darkred' },
  //   { _id: '1', level: 'high', color: 'orange' },
  //   { _id: '2', level: 'medium', color: 'green' },
  //   { _id: '3', level: 'low', color: 'blue' },
  // ]

  const priorityItemStyle = {
    background: themeColors.accentColorFaded,
    margin: "5px 0",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
    fontSize: "14px",
    borderRadius: "5px",
  }

  const handleCreateButtonClick = () => {
    const inputRef = document.getElementById("priorityName");
    const priorityName = inputRef.value;

    if (priorityName == "") {
      return;
    }

    handleCreatePriority(priorityColor, priorityName);
  }

  return (
    <Dialog
      open={open}
      onBackdropClick={closeDialog}
      sx={{
        "& .MuiDialog-paper": {
          width: "550px",
          position: "absolute",
          top: "10px",
          background: themeColors.background,
          display: "flex",
          flexDirection: "row",
        },
      }}
    >
      <Box sx={{
        height: "100%",
        width: "35%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        background: themeColors.accentColor,
      }}>
        <span
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: themeColors.background,
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >Priorities</span>

        {
          existingPriorities.map(item => {
            return (
              <div key={item._id} style={priorityItemStyle}>
                <AssistantPhotoIcon sx={{ color: item.color }} />
                <span>{item.level}</span>
              </div>
            )
          })
        }
      </Box>

      <Box sx={{
        height: "100%",
        width: "65%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        marginTop: "40px"
      }}>
        <ColorChooserWidget onColorSelect={(color) => { setPriorityColor(color) }} />

        <TextField
          id="priorityName"
          label="Priority Name"
          variant="standard"
          sx={{
            marginTop: "15px",
            "& input": {
              fontSize: "14px",
            },
            "& label": {
              fontSize: "14px",
            }
          }}
        />

        <Button
          onClick={handleCreateButtonClick}
          sx={{
            background: themeColors.accentColor,
            color: themeColors.background,
            fontWeight: 500,
            textTransform: "capitalize",
            marginTop: "35px",
            "&:hover": {
              background: themeColors.accentColor
            }
          }}
        >
          Create Priority
        </Button>
      </Box>
    </Dialog>
  )
}

export default PrioritiesDialog;
