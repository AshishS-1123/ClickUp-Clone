import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListAsync } from "../../../redux/slices/spaceSlice";
import ListDialog from "./ListDialog";

function CreateListDialog({
  open, closeDialog, itemType, itemId,
}) {
  const listNameElement = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer);

  const handleCreateList = () => {
    const listName = listNameElement.current.value;

    const { userId } = userData;
    const { token } = userData;

    dispatch(createListAsync({
      listName, parentType: itemType, parentId: itemId, userId, token,
    }))
      .then((res) => {
        if (res.payload?.data?.success) {
          closeDialog();
        }
      });
  };

  return (
    <ListDialog
      open={open}
      closeDialog={closeDialog}
      handleCreateList={handleCreateList}
      ref={listNameElement}
    />
  );
}

export default CreateListDialog;
