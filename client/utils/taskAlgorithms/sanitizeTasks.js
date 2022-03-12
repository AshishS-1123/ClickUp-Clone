function sanitizeTask(tasks, priorities, statuses) {

  return tasks.map(task => {
    const priority = priorities.find(item => item._id == task.priority);
    const status = statuses.find(item => item._id == task.status);

    return { ...task, status: status, priority: priority };
  })
}

export default sanitizeTask;
