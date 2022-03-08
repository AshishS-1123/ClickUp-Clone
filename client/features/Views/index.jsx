import React from "react";
import HeaderBar from '../../components/Layout/HeaderBar';
import ListView from "./ListView";
import themeColors from "../../utils/contexts/themeContext";

const data = [
  {
    taskName: 'Task 1',
    listName: 'List A',
    priority: { level: 'urgent', color: 'red' },
    taskStatus: { status: 'review', color: 'blue' },
    dueDate: '2 Jan, 2023'
  },
  {
    taskName: 'Task 2',
    listName: 'List A',
    priority: { level: 'low', color: 'grey' },
    taskStatus: { status: 'done', color: 'blue' },
    dueDate: '2 Jan, 2023'
  },
  {
    taskName: 'Task 3',
    listName: 'List A',
    priority: { level: 'urgent', color: 'red' },
    taskStatus: { status: 'review', color: 'blue' },
    dueDate: '2 Jan, 2023'
  },
  {
    taskName: 'Task 4',
    listName: 'List B',
    priority: { level: 'urgent', color: 'red' },
    taskStatus: { status: 'pending', color: 'blue' },
    dueDate: '2 Jan, 2023'
  },
  {
    taskName: 'Task 5',
    listName: 'List B',
    priority: { level: 'urgent', color: 'red' },
    taskStatus: { status: 'todo', color: 'blue' },
    dueDate: '2 Jan, 2023'
  },

]

function Views() {
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
      <ListView data={data} />
    </div>
  )
}

export default Views;
