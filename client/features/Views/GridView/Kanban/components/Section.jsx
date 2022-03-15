import React from 'react';
import AddTaskButton from './AddTaskButton';
import styles from './components.module.css';

function Section({ children }) {
  console.log("Children in section", children);
  return (
    <section className={styles.section}>
      {children}

      <AddTaskButton />
    </section>
  )
}

export default Section;
