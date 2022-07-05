// const URL = 'http://localhost:5000/api/v1';
const URL = 'https://fathomless-coast-92467.herokuapp.com/api/v1';

async function makeRequest(urlPath, method, body, reqHeaders) {
  // Create the whole url.
  const url = URL + urlPath;

  // Create headers if none present.
  let headers;
  if (!reqHeaders) {
    headers = new Headers();
    headers.append('Content-Type', 'application/json');
  } else {
    headers = reqHeaders;
  }

  // This data defines the request we make.
  const options = {
    method, // GET, POST, UPDATE, DELETE
    mode: 'cors',
    headers,
  };

  // For GET method, we must not provide the body attribute.
  // that's why we are adding the property seperately.
  if (method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  // Get the response.
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Convert the response the json.
    const { status } = response;

    return { data, status };
  } catch (error) {
    return {
      data: { error: error.message },
      status: 501,
    };
  }
}

export default makeRequest;
