import React from 'react';
import Board from 'react-trello';
import boardComponents from './components';
import './kanban.module.css';

function KanbanBoard({ initialBoard }) {

  return (
    <Board
      data={initialBoard}
      components={boardComponents}
      cardDragClass=''
      laneDraggable={false}
      collapsibleLanes={true}
      handleDragEnd={() => { console.log("Done"); }}
    />
  );
}

export default KanbanBoard;
