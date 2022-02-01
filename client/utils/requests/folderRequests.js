import makeRequest from "./request";

export const fetchFolder = async (folderId, parentType, parentId, userId, token) => {
  parentType = parentType.toLowerCase();
  const url = `/folders/${folderId}?user=${userId}&${parentType}=${parentId}`;
  const body = {};

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`)

  const { data, status } = await makeRequest(url, "GET", body, headers);
  return { data, status };
}

export const createFolder = async (folderName, parentType, parentId, userId, token) => {
  parentType = parentType.toLowerCase();
  const url = `/folders?user=${userId}&${parentType}=${parentId}`;
  const body = { folderName };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const { data, status } = await makeRequest(url, "POST", body, headers);
  return { data, status };
}
