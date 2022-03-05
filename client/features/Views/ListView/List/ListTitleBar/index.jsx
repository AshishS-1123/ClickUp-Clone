import React from 'react';
import styles from './ListTitleBar.module.css';
import themeColors from '../../../../../utils/contexts/themeContext';

function ListTitleBar({ title, color }) {
  console.log(color);
  return (
    <div className={styles.titleBar}>
      <div className={styles.title}>
        <span style={{ background: color, color: themeColors.background }}>
          title
        </span>
      </div>
      <div className={styles.titleBar_tags} style={{ color: themeColors.textBoldColor }}>
        <div>Due Date</div>
        <div>List</div>
        <div>Priority</div>
      </div>
    </div>
  )
}

export default ListTitleBar;
