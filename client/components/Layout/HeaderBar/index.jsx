import React from 'react';
import themeColors from '../../../utils/contexts/themeContext';
import ViewForItem from './ViewForItem';
import ViewList from './ViewList';

function HeaderBar({activeView, setActiveView}) {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    background: themeColors.background,
    borderBottom: '1px solid rgba(0,0,0,0.12)'
  };

  return (
    <div style={styles}>
      <ViewForItem />
      <ViewList activeView={activeView} setActiveView={setActiveView} />
    </div>
  )
}

export default HeaderBar;
