import React from 'react';
import themeColors from '../../../../../utils/contexts/themeContext';
import styles from './ListItem.module.css';

function ListItem({ tasks, color }) {
  return (
    <>
      {
        tasks.map((item, idx) => {
          return (
            <div className={styles.itemBar}>
              <div className={styles.title}>
                {item.taskName}
              </div>
              <div className={styles.itemData} style={{ color: themeColors.textBoldColor }}>
                <div>{item.dueDate}</div>
                <div>{item.listName}</div>
                <div>{item.priority.level}</div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default ListItem;
