export const sortableValues = {
  NAME: 'name',
  STATUS: 'status',
  PRIORITY: 'priority',
  DUE_DATE: 'dueDate',
};

// This function is responsible for sorting tasks by the given key.
function sortTasks(tasks, sortBy) {
  const compareFunction = (first, second) => first[sortBy] > second[sortBy];

  return tasks.slice().sort(compareFunction);
}

export default sortTasks;
