import React from "react";
import HeaderBar from '../../components/Layout/HeaderBar';
import ListView from "./ListView";
import themeColors from "../../utils/contexts/themeContext";
import { useSelector } from "react-redux";

function Views() {
  const data = useSelector(state => state.spaceReducer.taskData);
  const availableStatuses = useSelector(state => state.metaReducer.statuses);

  const styles = {
    width: 'calc(100vw - 250px)',
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: themeColors.backgroundMedium,
  }

  return (
    <div style={styles}>
      <HeaderBar />
      <ListView data={data} availableStatuses={availableStatuses} />
    </div>
  )
}

export default Views;
