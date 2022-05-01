import React from 'react';
import Board from 'react-trello';
import { useDispatch, useSelector } from 'react-redux';
import boardComponents from './components';
import './kanban.module.css';
import { modifyTaskAsync } from '../../../../redux/slices/spaceSlice';

function KanbanBoard({ initialBoard }) {
  const { userId, token } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const handleTaskDrop = async (taskId, sourceLaneId, targetLaneId, position, cardDetails) => {
    const parentId = cardDetails.parentId;
    const newData = { status: targetLaneId };

    const res = await dispatch(modifyTaskAsync({ taskId, newData, parentId, userId, token }));

    return false;
  }

  return (
    <Board
      data={initialBoard}
      components={boardComponents}
      cardDragClass=''
      laneDraggable={false}
      collapsibleLanes={true}
      handleDragEnd={handleTaskDrop}
    />
  );
}

export default KanbanBoard;
