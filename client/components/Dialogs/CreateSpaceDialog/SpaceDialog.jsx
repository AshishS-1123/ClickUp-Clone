import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../dialog.module.css";
import themeColors from "../../../utils/contexts/themeContext";

function CreateSpaceDialog({ open, closeDialog, handleCreateSpace }, ref) {
  return (
    <Dialog
      open={open}
      onBackdropClick={closeDialog}
      sx={{
        "& .MuiDialog-paper": {
          width: "550px",
          height: "419px",
          position: "absolute",
          top: "10px",
          background: themeColors.background,
        },
      }}
    >
      <div className={styles.title_bar}>
        <h1 className={styles.title}>Create new space</h1>
        <CloseIcon
          sx={{
            position: "absolute",
            top: "25px",
            right: "25px",
            color: themeColors.textBoldColor,
            width: "32px",
            height: "32px"
          }}
          onClick={closeDialog}
        />
      </div>
      <div className={styles.content}>
        <label htmlFor="spaceDialog_name" id="dialog_nameLabel" style={{ color: themeColors.textBoldColor }}>Space name</label>
        <input type="text" id="spaceDialog_name" placeholder="Enter space name" ref={ref} />
      </div>
      <button
        className={styles.dialog_button}
        onClick={handleCreateSpace}
        style={{
          background: themeColors.accentColor,
          fontWeight: 700,
        }}
      >
        Create space
      </button>
    </Dialog>
  );
}

export default React.forwardRef(CreateSpaceDialog);
