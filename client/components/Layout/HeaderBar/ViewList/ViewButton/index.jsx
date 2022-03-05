import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import themeColors from '../../../../../utils/contexts/themeContext';

function ViewButton({ viewName, icon: Icon, onClick, isActive }) {
  return (
    <Button
      onClick={onClick}
      startIcon={<Icon />}
      disableRipple
      sx={{
        color: isActive ? themeColors.accentColor : themeColors.textColor,
        textTransform: 'capitalize',
        fontSize: '12px',
        fontWeight: 400,
      }}
    >
      {viewName}
    </Button>
  )
}

ViewButton.propTypes = {
  viewName: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ViewButton;
