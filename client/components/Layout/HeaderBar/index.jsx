import React from 'react';
import ViewForItem from './ViewForItem';
import ViewList from './ViewList';

function HeaderBar() {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    background: "#20262b",
  };

  return (
    <div style={styles}>
      <ViewForItem />
      <ViewList />
    </div>
  )
}

export default HeaderBar;
