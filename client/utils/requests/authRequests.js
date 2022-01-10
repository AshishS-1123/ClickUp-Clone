import makeRequest from "../request";

export const registerUser = async (userEmail, password) => {
  const url = "/auth/register";
  const body = { userEmail, password };

  const { data, status } = await makeRequest(url, "POST", body);
  console.log("In request", data, status);
  return { data, status };
}

export const signInUser = async (userEmail, password) => {
  const url = "/auth/login";
  const body = { userEmail, password };

  const { data, status } = await makeRequest(url, "POST", body);

  return { data, status };
}
