import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CreateViewDialog from "../../../../Dialogs/CreateViewDialog";
import themeColors from "../../../../../utils/contexts/themeContext";

function AddViewButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  }

  const onClick = () => {

  }

  return (
    <div>
      <Button
        onClick={onClick}
        startIcon={<AddIcon sx={{ width: "20px", height: "20px", color: themeColors.textBoldColor }} />}
        disableRipple
        sx={{
          color: themeColors.textColor,
          textTransform: "capitalize",
          fontSize: "12px",
          marginLeft: "10px",
          fontWeight: "600",
        }}
      >
        view
      </Button>

      <CreateViewDialog open={dialogOpen} closeDialog={closeDialog} />
    </div>
  )
}

export default AddViewButton;
