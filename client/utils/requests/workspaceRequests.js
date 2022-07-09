import makeRequest from './request';

export const getAllWorkspaces = async (userId, token) => {
  const url = `/workspaces?user=${userId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data, status } = await makeRequest(url, 'GET', body, headers);
  return { data, status };
};

export const createNewWorkspace = async (userId, token, workspaceName) => {
  const url = `/workspaces?user=${userId}`;
  const body = { workspaceName };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  const { data, status } = await makeRequest(url, 'POST', body, headers);
  return { data, status };
};

export const getWorkspaceData = async (userId, token, workspaceId) => {
  const url = `/workspaces/${workspaceId}?user=${userId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data } = await makeRequest(url, 'GET', body, headers);
  return data;
};

export const deleteWorkspace = () => {

};

export const modifyWorkspace = () => {

};
