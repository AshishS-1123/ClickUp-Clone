import makeRequest from './request';

export const fetchFolder = async (folderId, pType, parentId, userId, token) => {
  const parentType = pType.toLowerCase();
  const url = `/folders/${folderId}?user=${userId}&${parentType}=${parentId}`;
  const body = {};

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  const { data, status } = await makeRequest(url, 'GET', body, headers);
  return { data, status };
};

export const createFolder = async (folderName, pType, parentId, userId, token) => {
  const parentType = pType.toLowerCase();
  const url = `/folders?user=${userId}&${parentType}=${parentId}`;
  const body = { folderName };

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', 'application/json');

  const { data, status } = await makeRequest(url, 'POST', body, headers);
  return { data, status };
};
