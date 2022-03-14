import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import groupTasks, { groupableValues } from '../../../utils/taskAlgorithms/groupAlgorithm';

const KanbanBoard = dynamic(() => import('./Kanban'), { ssr: false, loading: () => <p>Loading</p> })

function convertToKanbanFormat(taskData, availableStatuses) {
  const lanes = [];

  // console.log("taskData", taskData);
  // console.log("Statuses", availableStatuses);

  availableStatuses.forEach((status, idx) => {
    const currentColumn = {
      id: status._id,
      title: status.status,
      lanes: [],
    };

    const currentCards = [];
    taskData[status._id].tasks.forEach(task => {
      currentCards.push({
        id: task._id,
        title: task.name,
        description: task.name,
      });

    })

    currentColumn.cards = currentCards;
    lanes.push(currentColumn);

    // console.log("Current col", currentColumn);
  })

  return { lanes };
}

function GridView({ data, availableStatuses }) {
  const statuses = useSelector(state => state.metaReducer.statuses);
  const sorted = groupTasks(data, groupableValues.STATUS, statuses);

  const kanbanFormat = convertToKanbanFormat(sorted, availableStatuses);

  return (
    <>
      <KanbanBoard initialBoard={kanbanFormat} />
    </>
  )
}

export default GridView;
