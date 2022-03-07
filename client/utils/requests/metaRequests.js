import makeRequest from "./request";

export async function getPriorities(userId, workspaceId, token) {
  console.log("In getting prio, ", userId, workspaceId, token);
  const url = `/meta/priorities?user=${userId}&workspace=${workspaceId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data, status } = await makeRequest(url, 'GET', body, headers);
  return { data, status };
}

export async function createNewPriority(priority, userId, workspaceId, token) {
  const url = `/meta/priorities?user=${userId}&workspace=${workspaceId}`;
  const body = { ...priority };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  const { data, status } = await makeRequest(url, 'PUT', body, headers);
  return { data, status };
}

export async function getStatuses(userId, workspaceId, token) {
  const url = `/meta/statuses?user=${userId}&workspace=${workspaceId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data, status } = await makeRequest(url, 'GET', body, headers);
  return { data, status };
}

export async function createNewStatus(statusName, userId, workspaceId, token) {
  const url = `/meta/statuses?user=${userId}&workspace=${workspaceId}`;
  const body = { status: statusName };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  const { data, status } = await makeRequest(url, 'PUT', body, headers);
  return { data, status };
}

export async function getViews(userId, workspaceId, token) {
  const url = `/meta/views?user=${userId}&workspace=${workspaceId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data, status } = await makeRequest(url, 'GET', body, headers);
  return { data, status };
}

export async function createNewView(view, userId, workspaceId, token) {
  const url = `/meta/views?user=${userId}&workspace=${workspaceId}`;
  const body = { view };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  const { data, status } = await makeRequest(url, 'PUT', body, headers);
  return { data, status };
}
