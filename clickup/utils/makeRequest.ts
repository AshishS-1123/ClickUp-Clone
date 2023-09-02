export type REQUEST_TYPES = 'GET' | 'POST' | 'DELETE' | 'PATCH';
export type REQUEST_BODY_TYPE = Record<string, string | number | boolean>;


export default async function makeRequest(route: string, method: REQUEST_TYPES = 'GET', body: REQUEST_BODY_TYPE = {}) {
  const response = await fetch(
    route,
    {
      method,
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return data;
}