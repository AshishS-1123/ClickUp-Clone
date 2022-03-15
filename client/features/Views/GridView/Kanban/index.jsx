import React from 'react';
import Board from 'react-trello';
import boardComponents from './components';

function KanbanBoard({ initialBoard }) {

  return (
    <Board
      data={initialBoard}
      components={boardComponents}
    />
  );
}

export default KanbanBoard;

/**
 * Components to customize

  GlobalStyle,
  BoardWrapper,
  Loader,
  ScrollableLane,
  LaneHeader,
  LaneFooter,
  Section,
  NewLaneForm,
  NewLaneSection,
  NewCardForm,
  Card,
  AddCardLink,

 */
