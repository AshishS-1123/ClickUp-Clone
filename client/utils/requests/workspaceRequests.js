import makeRequest from "../request";

export const getAllWorkspaces = async (userId, token) => {
  const url = `/user/${userId}/workspaces`;
  const body = {};

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`)

  const { data, status } = await makeRequest(url, "GET", body, headers);
  return { data, status };
}

export const createNewWorkspace = async (userId, token, workspaceName) => {
  const url = `/user/${userId}/workspaces`;
  const body = { workspaceName };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const { data, status } = await makeRequest(url, "POST", body, headers);
}

export const getWorkspaceData = () => {

}

export const deleteWorkspace = () => {

}

export const modifyWorkspace = () => {

}
