import React from 'react';
import styles from './components.module.css';

function Section({ children }) {
  console.log("Children in section", children);
  return (
    <section className={styles.section}>
      {children}
    </section>
  )
}

export default Section;
