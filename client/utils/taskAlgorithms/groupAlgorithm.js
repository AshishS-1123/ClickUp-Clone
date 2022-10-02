export const groupableValues = {
  PRIORITY: "priority",
  STATUS: "status",
}

function getInitialValueFromKeys(possibleKeys) {
  const initialValue = {};

  possibleKeys.forEach(key => {
    initialValue[key._id] = { tasks: [] };
  })

  return initialValue;
}

function groupTasks(tasks, groupBy, possibleKeys) {
  const initialValue = getInitialValueFromKeys(possibleKeys);

  tasks.forEach(task => {
    const thisKey = task[groupBy]._id;
    initialValue[thisKey].tasks.push(task);
  })

  return initialValue;
}

export default groupTasks;
