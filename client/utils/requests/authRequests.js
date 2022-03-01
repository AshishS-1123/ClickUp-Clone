import makeRequest from './request';

export const registerUser = async (userEmail, password) => {
  const url = '/auth/register';
  const body = { userEmail, password };

  const { data, status } = await makeRequest(url, 'POST', body);
  return { data, status };
};

export const logInUser = async (userEmail, password) => {
  const url = '/auth/login';
  const body = { userEmail, password };

  const { data, status } = await makeRequest(url, 'POST', body);

  return { data, status };
};
