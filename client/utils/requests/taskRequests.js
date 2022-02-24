import makeRequest from "./request";

export const fetchTask = async (taskId, parentType, parentId, userId, token) => {
  const url = `/tasks/${taskId}?user=${userId}&${parentType}=${parentId}`;
  const body = {}

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const { data, status } = await makeRequest(url, "GET", body, headers);
  return { data, status };
}

export const createTask = async (taskName, parentType, parentId, userId, token) => {
  const url = `/tasks?user=${userId}&${parentType}=${parentId}`;
  const body = { taskName };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const { data, status } = await makeRequest(url, "POST", body, headers);
  return { data, status };
}
