import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './List/ListItem';
import ListTitleBar from './List/ListTitleBar';
import groupTasks, { groupableValues } from '../../../utils/taskAlgorithms/groupAlgorithm';

function ListView({ data, availableStatuses }) {
  console.log("Group", data);
  const statuses = useSelector(state => state.metaReducer.statuses);
  const sorted = groupTasks(data, groupableValues.STATUS, statuses);

  return (
    <>
      {
        availableStatuses.map(status => {
          return (
            <React.Fragment key={`${status._id}`}>
              <ListTitleBar title={status.status} color={status.color} />
              <ListItem tasks={sorted[status._id].tasks} color={status.color} />
            </React.Fragment>
          )
        })
      }
    </>
  )
}

export default ListView;
