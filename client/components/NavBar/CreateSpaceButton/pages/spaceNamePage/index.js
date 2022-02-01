import React from "react";
import { useSelector } from "react-redux";
import styles from "../../CreateItemDialog.module.css";

function SpaceNamePage() {
  const error = useSelector(state => state.spaceReducer.error);

  return (
    <>
      <div className={styles.content}>
        <label htmlFor="spaceDialog_name" id="spaceDialog_nameLabel">Space name</label>
        <input type="text" id="spaceDialog_name" placeholder="Enter space name" />
      </div>
      <p className={styles.errorText}>{error}</p>
    </>
  )
}

export default SpaceNamePage;
