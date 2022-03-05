import React from 'react';
import ListItem from './List/ListItem';
import ListTitleBar from './List/ListTitleBar';

const sortDataByStatus = (data) => {
  const sortedData = {
    'done': { color: '#7a65ef', tasks: [] },
    'review': { color: '#fec900', tasks: [] },
    'pending': { color: '#e93e79', tasks: [] },
    'todo': { color: 'blue', tasks: [] },
    'archive': { color: 'grey', tasks: [] },
  }

  data.forEach(task => {
    sortedData[task.taskStatus.status].tasks.push(task);
  });

  console.log(sortedData);
  return sortedData;
}

function ListView({ data }) {
  const availableStatuses = ['done', 'review', 'pending', 'todo', 'archive'];
  const listData = sortDataByStatus(data);

  return (
    <>
      {
        availableStatuses.map((statusName, idx) => {
          const statusData = listData[statusName];

          return (
            <React.Fragment key={`${statusName}_${idx}`}>
              <ListTitleBar title={statusName} color={statusData.color} />
              <ListItem tasks={statusData.tasks} color={statusData.color} />
            </React.Fragment>
          )
        })
      }
    </>
  )
}

export default ListView;
