import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateSpaceDialog from "../../Dialogs/CreateSpaceDialog";
import themeColors from "../../../utils/contexts/themeContext";

function CreateSpaceButton() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateNewSpace = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleCreateNewSpace}
        sx={{
          width: "80%",
          height: "24px",
          margin: "0 auto",
          fontSize: "11px",
          color: themeColors.textColor,
          background: themeColors.backgroundDark,
          "&:hover": {
            color: themeColors.textColor,
            background: themeColors.backgroundDark,
          },
        }}
      >
        New Space
      </Button>
      <CreateSpaceDialog open={openDialog} closeDialog={closeDialog} />
    </>
  );
}

export default CreateSpaceButton;
