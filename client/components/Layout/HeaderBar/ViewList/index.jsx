import React, { useState } from "react";

// List View Icon
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// Grid View Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
// Calendar View Icon
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// Gantt View Icon
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// Timeline View
import ClearAllIcon from "@mui/icons-material/ClearAll";

import ViewButton from "./ViewButton";
import AddViewButton from "./AddViewButton";
import { Views } from "../../../../utils/constants/ViewTypes";

export const mapViewToIcon = (view) => {
  switch (view) {
  case Views.LIST_VIEW:
    return FormatListBulletedIcon;
  case Views.BOARD_VIEW:
    return DashboardIcon
  case Views.CALENDAR_VIEW:
    return CalendarTodayIcon;
  case Views.GANTT_VIEW:
    return FormatAlignLeftIcon;
  case Views.TIMELINE_VIEW:
    return ClearAllIcon;
  default: return undefined;
  }
}

const containerStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginLeft: "10px",
  gap: "8px"
}

function ViewList({activeView, setActiveView}) {
  const enabledViews = [Views.BOARD_VIEW];

  const handleViewButtonClick = (newActiveView) => {
    setActiveView(newActiveView);
  }

  return (
    <div style={containerStyles}>
      {
        enabledViews.map((viewName) => {
          return <ViewButton
            viewName={viewName.split("_").join(" ").toLocaleLowerCase()}
            icon={mapViewToIcon(viewName)}
            onClick={() => handleViewButtonClick(viewName)}
            isActive={activeView == viewName}
            key={viewName}
          />
        })
      }

      <AddViewButton />
    </div>
  )
}

export default ViewList;
