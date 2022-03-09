import makeRequest from './request';

export const fetchTask = async (taskId, parentType, parentId, userId, token) => {
  const url = `/tasks/${taskId}?user=${userId}&${parentType}=${parentId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data, status } = await makeRequest(url, 'GET', body, headers);
  return { data, status };
};

export const createTask = async (taskName, taskMeta, parentType, parentId, userId, token) => {
  const url = `/tasks?user=${userId}&${parentType}=${parentId}`;
  const body = {
    taskName,
    priority: taskMeta.priority,
    dueDate: taskMeta.dueDate || (new Date.now()).toISOString().slice(0, 10).replace(/-/g, ""),
    status: taskMeta.status,
    tag: 'dummy-tag',
  };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  const { data, status } = await makeRequest(url, 'POST', body, headers);
  return { data, status };
};
