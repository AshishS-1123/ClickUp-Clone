import React from "react";
import styles from "../../CreateSpaceDialog.module.css";
import ListWidget from "./widgets/listWidget";

function ViewSelectorPage() {
  return (
    <>
      <div className={styles.listWidgetContainer}>
        <ListWidget />
        <ListWidget />
        <ListWidget />
        <ListWidget />
        <ListWidget />
        <ListWidget />
        <ListWidget />
        <ListWidget />

      </div>
    </>
  );
}

export default ViewSelectorPage;
