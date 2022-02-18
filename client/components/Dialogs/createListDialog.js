import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./dialog.module.css";
import { createListAsync } from "../../redux/slices/spaceSlice";

function CreateListDialog({ open, closeDialog, itemType, itemId }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer);

  const onBackdropClick = () => {
    closeDialog();
  }

  const handleCreateList = () => {
    const inputEl = document.getElementById("listDialog_name");
    const listName = inputEl.value;

    const userId = userData.userId;
    const token = userData.token;

    dispatch(createListAsync({ listName, parentType: itemType, parentId: itemId, userId, token }))
      .then((res) => {
        console.log("RES", res);
        if (res.payload.data.success) {
          closeDialog();
        }
      })
  }

  return (
    <>
      <Dialog
        open={open}
        onBackdropClick={onBackdropClick}
        sx={{
          "& .MuiDialog-paper": {
            width: "550px",
            height: "419px",
            position: "absolute",
            top: "10px",
            background: "#2b343b",
          }
        }}
      >
        <div className={styles.title_bar}>
          <h1 className={styles.title}>Create new list</h1>
          <CloseIcon
            sx={{
              position: "absolute",
              top: "25px",
              right: "25px",
              color: "white",
            }}
            onClick={closeDialog}
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="listDialog_name" id="dialog_nameLabel">List name</label>
          <input type="text" id="listDialog_name" placeholder="Enter list name" />
        </div>
        <button
          className={styles.dialog_button}
          onClick={handleCreateList}
        >Create list</button>
      </Dialog>
    </>
  )
}

export default CreateListDialog;
