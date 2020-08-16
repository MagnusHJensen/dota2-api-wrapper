/* eslint-disable */

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  res.json().then((result) => {
    if (result.error) {
        switch(result.error) {
            case 'Not Found': {
                throw 'Invalid arguments. \n Could not find requested resources.';
            }
            default: {
              throw res.json();
            }
        }
    }
  })
  
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
