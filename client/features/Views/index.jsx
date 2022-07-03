import React, { useState } from "react";
import HeaderBar from '../../components/Layout/HeaderBar';
import GridView from "./GridView";
import themeColors from "../../utils/contexts/themeContext";
import { Views } from "../../utils/constants/ViewTypes";
import { useSelector } from "react-redux";

function ViewsContainer() {
  const data = useSelector(state => state.spaceReducer.taskData);
  const availableStatuses = useSelector(state => state.metaReducer.statuses);
  const [activeView, setActiveView] = useState(Views.BOARD_VIEW);

  const styles = {
    width: 'calc(100vw - 260px)',
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: themeColors.backgroundMedium,
  }

  return (
    <div style={styles}>
      <HeaderBar activeView={activeView} setActiveView={setActiveView}/>
      <GridView data={data} availableStatuses={availableStatuses}/>
    </div>
  )
}

export default ViewsContainer;
