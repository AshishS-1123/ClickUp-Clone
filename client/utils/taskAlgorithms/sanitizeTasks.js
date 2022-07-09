function sanitizeTask(task, priorities, statuses, lists) {

  const priority = priorities.find(item => item._id == task.priority);
  const status = statuses.find(item => item._id == task.status);
  const parent = lists.find(item => item._id == task.parent.id);

  return { ...task, status, priority, parent };
}

export default sanitizeTask;
