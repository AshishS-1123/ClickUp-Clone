import React, { useRef } from 'react';
import styles from './spaceStatusesPage.module.css';

function StatusContainer({ statusType, statuses, addStatus }) {
  const colorRef = useRef(null);
  const nameRef = useRef(null);

  const handleCreateStatus = () => {
    const color = colorRef.current.value;
    const name = nameRef.current.value;

    addStatus({ color, name });
  };

  return (
    <>
      <h6>{statusType}</h6>
      {
        statuses.map((status) => (
          <div className={styles.statusItem}>
            <input
              type="color"
              className={styles.colorInput}
              value={status.color}
              ref={colorRef}
            />

            <input
              type="text"
              className={styles.nameInput}
              value={status.name}
              ref={nameRef}
            />
          </div>
        ))
      }
      <button
        className={styles.createStatusButton}
        onClick={handleCreateStatus}
      >
        Add Status
      </button>
    </>
  );
}

function SpaceStatusPage() {
  const activeStatuses = [];
  const closedStatuses = [];

  const addActiveStatus = (status) => {
    activeStatuses = [...activeStatuses, status];
  };

  const addClosedStatus = (status) => {
    closedStatuses = [...closedStatuses, status];
  };

  return (
    <div className={styles.statusPage__container}>
      <StatusContainer statusType="active status" statuses={activeStatuses} addStatus={addActiveStatus} />
      <StatusContainer statusType="closed status" statuses={closedStatuses} addStatus={addClosedStatus} />
    </div>
  );
}

export default SpaceStatusPage;
