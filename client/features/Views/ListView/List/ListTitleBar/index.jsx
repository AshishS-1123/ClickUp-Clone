import React from 'react';
import styles from './ListTitleBar.module.css';
import themeColors from '../../../../../utils/contexts/themeContext';

function ListTitleBar({ title, color }) {

  return (
    <div className={styles.titleBar}>
      <div className={styles.title}>
        <span style={{
          background: color, color: themeColors.background,
          boxShadow: `0px 0px 2px 1px ${color}`
        }}>
          {title}
        </span>
      </div>
      <div className={styles.titleBar_tags} style={{ color: 'grey' }}>
        <div>Due Date</div>
        <div>List</div>
        <div>Priority</div>
      </div>
    </div>
  )
}

export default ListTitleBar;
