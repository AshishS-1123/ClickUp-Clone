const URL = "http://localhost:5000/api/v1"

async function makeRequest(url, method, body, headers) {
  console.log("Bofy is :", body);
  // Create the whole url.
  url = URL + url;

  // Create headers if none present.
  if (!headers) {
    headers = new Headers();
    headers.append("Content-Type", "application/json");
  }

  // This data defines the request we make.
  let options = {
    method: method, // GET, POST, UPDATE, DELETE
    mode: "cors",
    headers: headers,
  }

  // For GET method, we must not provide the body attribute.
  // that's why we are adding the property seperately.
  if (method != "GET") {
    options.body = JSON.stringify(body);
  }

  // Get the response.
  try {
    const response = await fetch(url, options);
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
