import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import PriorityButton from "./PropertiesButtons/PriorityButton";
import TagsButton from "./PropertiesButtons/TagsButton";
import DueDatesButton from "./PropertiesButtons/DueDatesButton";
import StatusButton from "./PropertiesButtons/StatusButton";
import styles from "./TaskDialog.module.css";
import themeColors from "../../../utils/contexts/themeContext";

const iconStyles = {
  color: "#8a8d91",
  width: "34px",
  height: "34px",
  border: "1px dashed #d5d6d7",
  borderRadius: "50%",
  padding: "5px",
  margin: "0 5px",
}

const elementStyles = {
  color: themeColors.textColor,
  background: themeColors.background
}

function CreateTaskDialog({ open, closeDialog, handleCreateTask, inList, forWorkspace }) {
  const taskNameRef = useRef(null);
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmitButtonClick = () => {
    handleCreateTask(taskNameRef.current.value, priority, dueDate, status);
  }

  return (
    <Dialog
      open={open}
      onBackdropClick={closeDialog}
      sx={{
        "& .MuiDialog-paper": {
          width: "580px",
          height: "510px",
          position: "absolute",
          bottom: "0px",
          right: "0px",
          background: themeColors.background,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        },
      }}
    >
      <div className={styles.topBar}>
        <input placeholder='Task name' style={elementStyles} ref={taskNameRef} />
        <CloseIcon
          sx={{ fill: themeColors.textBoldColor, width: "32px", height: "32px" }}
          onClick={closeDialog}
        />
      </div>

      <div className={styles.parentInfoBar}>
        <label>In</label>
        <div className={styles.forList} style={elementStyles}>{inList}</div>

        <label>For</label>
        <div className={styles.forWorkspace} style={elementStyles}>{forWorkspace}</div>
      </div>

      <textarea className={styles.descriptionInput} style={{ ...elementStyles, resize: "none" }} />

      <div className={styles.bottomBar}>
        <div className={styles.propertiesBar}>
          <DueDatesButton onDateSelect={setDueDate} />
          <PriorityButton onPrioritySelect={setPriority} />
          <TagsButton />
          <StatusButton onStatusSelect={setStatus} />
        </div>
        <button
          className={styles.button}
          style={{ background: themeColors.accentColor, color: themeColors.background }}
          onClick={handleSubmitButtonClick}
        >
          Create Task
        </button>
      </div>

    </Dialog>
  );
}

export default CreateTaskDialog;
