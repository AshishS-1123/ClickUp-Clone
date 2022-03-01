/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './Card.module.css';

export default function createSection(Component) {
  function HOC(props) {
    return (
      <div className={styles.Card}>
        <Component {...props} />
      </div>
    );
  }

  return HOC;
}
