const URL = "http://localhost:5000/api/v1"

async function makeRequest(url, method, body) {
  // Create the whole url.
  url = URL + url;

  // This data defines the request we make.
  let init = {
    method: method, // GET, POST, UPDATE, DELETE
    mode: "cors",
    headers: {
      "Content-Type": 'application/json', // type of data we are sending.
    }
  }

  // For GET method, we must not provide the body attribute.
  // that's why we are adding the property seperately.
  if (method != "GET") {
    init.body = JSON.stringify(body);
  }

  // Get the response.
  try {
    const response = await fetch(url, init);
    const data = await response.json();
    // Convert the response the json.
    const status = response.status;

    return { data, status };
  } catch (error) {
    return {
      data: { error: error.message },
      status: 501,
    }
  }
}

export default makeRequest;
