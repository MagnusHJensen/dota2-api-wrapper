/* eslint-disable */

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  throw res.json();
}

const query = (parameters) =>
  '?' +
  Object.keys(parameters)
    .map((key) => {
      parameters[key]
        ? Array.isArray(parameters[key])
          ? parameters[key].forEach((val) => `${key}=${val}`)
          : `${key}=${parameters[keu]}`
        : null;
    })
    .join('&');

module.exports = {
  handleResponse,
  query,
};
