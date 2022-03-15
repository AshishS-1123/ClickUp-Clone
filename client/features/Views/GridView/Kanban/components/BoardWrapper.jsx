import React from 'react';
import styles from './components.module.css';

function BoardWrapper({ children }) {

  return (
    <div className={styles.boardWrapper} >
      {children}
    </div >
  )
}

export default BoardWrapper;
