import React from "react";
import styles from "../../CreateSpaceDialog.module.css";

function SpaceNamePage() {
  return (
    <>
      <div className={styles.content}>
        <label htmlFor="spaceDialog_name" id="spaceDialog_nameLabel">Space name</label>
        <input type="text" id="spaceDialog_name" placeholder="Enter space name" />
      </div>
    </>
  )
}

export default SpaceNamePage;
