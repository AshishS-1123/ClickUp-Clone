import React from 'react';
import themeColors from '../../../../../utils/contexts/themeContext';
import styles from './ListItem.module.css';

function ListItem({ tasks, color }) {
  return (
    <ul className={styles.listContainer}>
      {
        tasks.map((item, idx) => {
          return (
            <>
              <li key={`${idx}__${Math.random() * 100}`} className={styles.listItem}>
                <span
                  className={styles.icon}
                  style={{
                    background: color,
                    boxShadow: `0px 0px 2px 1px ${color}`
                  }}
                >
                </span>
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
              </li>
              {
                idx != tasks.length - 1 && <hr />
              }
            </>
          )
        })
      }
    </ul>
  )
}

export default ListItem;
