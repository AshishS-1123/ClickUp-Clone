import React from 'react';

function ScrollableLane({ children }, ref) {
  return (
    <div style={{ width: '257px' }}>
      {children}
    </div>
  )
}

export const ProjectMenuItem = React.forwardRef(({ onClick, iconComponent, text }, ref) => (
  <MenuItem onClick={onClick} ref={ref}>
    <ListItemIcon>{iconComponent}</ListItemIcon>
    <ListItemText primary={text} />
  </MenuItem>
));

export default React.forwardRef(ScrollableLane);
