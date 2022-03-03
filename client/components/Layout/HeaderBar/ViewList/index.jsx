import React, { useState } from "react";
import Divider from '@mui/material/Divider';

// List View Icon
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// Grid View Icon
import DashboardIcon from '@mui/icons-material/Dashboard';
// Calendar View Icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// Gantt View Icon
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// Timeline View
import ClearAllIcon from '@mui/icons-material/ClearAll';

import ViewButton from "./ViewButton";
import AddViewButton from './AddViewButton';

const mapViewToIcon = (view) => {
  switch (view) {
    case 'LIST':
      return FormatListBulletedIcon;
    case 'BOARD':
      return DashboardIcon
    case 'CALENDAR':
      return CalendarTodayIcon;
    case 'GANTT':
      return FormatAlignLeftIcon;
    case 'TIMELINE':
      return ClearAllIcon;
    default:
      return undefined;
  }
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '10px',
  gap: '8px'
}

function ViewList() {
  const enabledViews = ['LIST', 'BOARD'];
  const [activeView, setActiveView] = useState(0);

  const handleViewButtonClick = (newActiveView) => {
    setActiveView(newActiveView);
  }

  return (
    <div style={containerStyles}>
      <Divider orientation="vertical" flexItem sx={{ border: '0.5px solid rgba(0,0,0,0.3)' }} />
      {
        enabledViews.map((viewName, idx) => {
          return <ViewButton
            viewName={viewName.toLowerCase()}
            icon={mapViewToIcon(viewName)}
            onClick={() => handleViewButtonClick(idx)}
            isActive={activeView == idx}
            key={idx}
          />
        })
      }

      <AddViewButton />
    </div>
  )
}

export default ViewList;
