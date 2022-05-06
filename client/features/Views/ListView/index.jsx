import React from 'react';
import ListGroupItem from './List/ListGroupItem';

const convertToListFormat = (taskData, availableStatuses) => {
  const returnValue = [];

  availableStatuses.forEach(status => {
    let taskWithThisStatus = [];

    taskData.forEach(task => {
      if (task.status._id == status._id) {
        taskWithThisStatus.push (task);
      }

    });

    returnValue.push (taskWithThisStatus);
  });

  return returnValue;
}


function ListView({ data, availableStatuses }) {
  const group = convertToListFormat(data, availableStatuses);

  return (
    <div style={{width: "90%", margin: "30px auto"}}>

      {
        group.map ((group, idx) => {
          const status = availableStatuses[idx];
          return (
            <ListGroupItem group={group} groupTitle={status.status} groupColor={status.color} key={status._id} />
          )
        })
      }
    </div>
  )
}

export default ListView;
