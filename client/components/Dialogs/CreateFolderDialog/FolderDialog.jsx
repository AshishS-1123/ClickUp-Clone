// eslint-disable-file jsx-a11y/label-has-associated-control
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../dialog.module.css";
import themeColors from "../../../utils/contexts/themeContext";

function CreateFolderDialog({ open, closeDialog, handleCreateFolder }, ref) {
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
        <h1 className={styles.title}>Create new folder</h1>
        <CloseIcon
          sx={{
            position: "absolute",
            top: "25px",
            right: "25px",
            color: themeColors.textBoldColor,
            width: "32px",
            height: "32px",
          }}
          onClick={closeDialog}
        />
      </div>
      <div className={styles.content}>
        <label htmlFor="folderDialog_name" id="dialog_nameLabel" style={{ color: themeColors.textBoldColor }}>Folder name</label>
        <input type="text" id="folderDialog_name" placeholder="Enter folder name" ref={ref} />
      </div>
      <button
        type="button"
        className={styles.dialog_button}
        onClick={handleCreateFolder}
        style={{
          background: themeColors.accentColor,
          fontWeight: 700,
        }}
      >
        Create folder
      </button>
    </Dialog>
  );
}

CreateFolderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  handleCreateFolder: PropTypes.func.isRequired,
};

CreateFolderDialog.defaultProps = {
  open: false,
  closeDialog: () => {console.log("Failed to provide close method.");},
  handleCreateFolder: () => {console.log("Failed to provide create method.");},
}

export default React.forwardRef(CreateFolderDialog);
