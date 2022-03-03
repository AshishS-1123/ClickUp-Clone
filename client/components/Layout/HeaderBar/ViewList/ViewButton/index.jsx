import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function ViewButton({ viewName, icon: Icon, onClick, isActive }) {
  return (
    <Button
      onClick={onClick}
      startIcon={<Icon />}
      disableRipple
      sx={{
        color: isActive ? '#ffa12f' : '#cfd2d5',
        textTransform: 'capitalize',
        fontSize: '13px',
        fontWeight: '500',
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
