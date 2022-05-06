import React, { useEffect, useState } from "react";
import HeaderBar from '../../components/Layout/HeaderBar';
import GridView from "./GridView";
import ListView from "./ListView";
import themeColors from "../../utils/contexts/themeContext";
import { Views } from "../../utils/constants/ViewTypes";
import { useSelector } from "react-redux";

const viewComponentHOC = (activeView, props) => {
  if (activeView == Views.LIST_VIEW) {
    console.log("Set to list view");
    return <ListView {...props} />
  } else if (activeView == Views.GRID_VIEW) {
    console.log("Set to grid view");
    return <GridView {...props} />
  }
}

function ViewsContainer() {
  const data = useSelector(state => state.spaceReducer.taskData);
  const availableStatuses = useSelector(state => state.metaReducer.statuses);
  const [activeView, setActiveView] = useState(Views.GRID_VIEW);

  useEffect(() => {
    console.log("Active", activeView);
  }, [activeView]);

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
      {
        (activeView == Views.LIST_VIEW) && <ListView data={data} availableStatuses={availableStatuses} />
      }
      {
        (activeView == Views.GRID_VIEW) && <GridView data={data} availableStatuses={availableStatuses} /> 
      }
    </div>
  )
}

export default ViewsContainer;
