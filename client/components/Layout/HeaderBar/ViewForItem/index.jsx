import React from 'react';
import { useSelector } from 'react-redux';
import ShieldIcon from '@mui/icons-material/Shield';
import themeColors from '../../../../utils/contexts/themeContext';

const containerStyles = {
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginLeft: '10px',
  paddingRight: '10px',
  borderRight: `1px solid lightgrey`
};

const textStyles = {
  fontSize: '16px',
  color: themeColors.textBoldColor,
  fontWeight: 500,
}

function ViewForItem() {
  const { activeItemName } = useSelector(state => state.spaceReducer.activeItemName);

  return (
    <div style={containerStyles}>
      <ShieldIcon sx={{ width: '32px', height: '32px', color: themeColors.accentColor }} />
      <p style={textStyles}>{activeItemName || "Space 1"}</p>
    </div>
  )
}

export default ViewForItem;
