import React from 'react';
import { useSelector } from 'react-redux';
import ShieldIcon from '@mui/icons-material/Shield';

const containerStyles = {
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginLeft: '10px',
};

const textStyles = {
  fontSize: '16px',
  color: '#d5d6d7',
  fontWeight: '500',
}

function ViewForItem() {
  const { activeItemName } = useSelector(state => state.spaceReducer.activeItemName);

  return (
    <div style={containerStyles}>
      <ShieldIcon sx={{ width: '32px', height: '32px', color: '#ffa12f' }} />
      <p style={textStyles}>{activeItemName || "Space 1"}</p>
    </div>
  )
}

export default ViewForItem;
