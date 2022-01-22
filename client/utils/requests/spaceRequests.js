import makeRequest from "./request";

export const fetchSpace = async (spaceId, workspaceId, userId, token) => {
  const url = `/spaces/${spaceId}?user=${userId}&workspace=${workspaceId}`;
  const body = {};

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`)

  const { data, status } = await makeRequest(url, "GET", body, headers);
  return { data, status };
}

export const createSpace = async (spaceName, workspaceId, userId, token) => {
  const url = `/spaces?user=${userId}&workspace=${workspaceId}`;
  const body = { spaceName };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`)

  const { data, status } = await makeRequest(url, "POST", body, headers);
  return { data, status };
}
