import React from 'react';
import themeColors from '../../../utils/contexts/themeContext';
import ViewForItem from './ViewForItem';
import ViewList from './ViewList';

function HeaderBar() {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    background: themeColors.background,
    borderBottom: '1px solid lightgrey'
  };

  return (
    <div style={styles}>
      <ViewForItem />
      <ViewList />
    </div>
  )
}

export default HeaderBar;
