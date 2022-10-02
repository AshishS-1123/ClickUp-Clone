import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ViewTypes, { Views } from "../../../utils/constants/ViewTypes";
import { mapViewToIcon } from "../../Layout/HeaderBar/ViewList";
import themeColors from "../../../utils/contexts/themeContext";

const mapViewToDescription = (viewName) => {
  switch (viewName.toUpperCase()) {
  case Views.LIST_VIEW: return "Use List view to organize your tasks in any way imaginable";
  case Views.BOARD_VIEW: return "Use List view to organize your tasks in anyway imaginable";
  case Views.CALENDAR_VIEW: return "Use List view to organize your tasks in anyway imaginable";
  case Views.GANTT_VIEW: return "Use List view to organize your tasks in anyway imaginable";
  case Views.TIMELINE_VIEW: return "Use List view to organize your tasks in anyway imaginable";
  default:
    return "";
  }
}

function ViewDialog({ open, closeDialog, handleCreateView, existingViews }) {
  const [selectedView, setSelectedView] = useState(ViewTypes[0]);

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
        background: themeColors.backgroundDark,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}>
        <span
          style={{
            textAlign: "center",
            fontSize: "14px",
            color: themeColors.textBoldColor,
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >Task Views</span>

        {
          ViewTypes.map((viewName, idx) => {
            const Icon = mapViewToIcon(viewName.toUpperCase());

            return (
              <Button
                onClick={() => { setSelectedView(viewName) }}
                key={idx}
                startIcon={<Icon />}
                fullWidth={true}
                variant='text'
                sx={{
                  color: themeColors.textColor,
                  display: "flex",
                  justifyContent: "flex-start",
                  textTransform: "capitalize",
                  marginBottom: "10px",
                  paddingLeft: "20px",
                  background: viewName == selectedView ? themeColors.accentColor : themeColors.backgroundDark,
                  "&:hover": {
                    background: viewName == selectedView ? themeColors.accentColor : themeColors.backgroundDark,
                  }
                }}
              >
                {viewName.substring(0, viewName.indexOf("_")).toLowerCase()}
              </Button>
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
      }}>
        <span
          style={{
            color: themeColors.textColor,
            textTransform: "capitalize",
            fontWeight: 600,
            marginBottom: "30px",
            marginTop: "40px",
          }}
        >
          {selectedView.substring(0, selectedView.indexOf("_")).toLowerCase()}
        </span>
        <span
          style={{ textAlign: "justify", padding: "10px" }}
        >
          {mapViewToDescription(selectedView)}
        </span>

        <Button
          onClick={() => { handleCreateView(selectedView) }}
          disabled={existingViews.includes(selectedView)}
          sx={{
            color: themeColors.textColor,
            textTransform: "capitalize",
            marginTop: "20px",
            background: themeColors.accentColor,
            "&:hover": {
              background: themeColors.accentColor,
            }
          }}
        >Add View</Button>
      </Box>
    </Dialog>
  )
}

export default ViewDialog;
