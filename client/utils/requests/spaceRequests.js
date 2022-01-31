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
  // TODO: Right now, labels and colors havent been develooped.
  // Hardcoding this part for now.
  const spaceColor = "#f89d2f";
  const spaceAvatar = "avatar";

  const url = `/spaces?user=${userId}&workspace=${workspaceId}`;
  const body = { spaceName, spaceColor, spaceAvatar };

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const { data, status } = await makeRequest(url, "POST", body, headers);
  return { data, status };
}
