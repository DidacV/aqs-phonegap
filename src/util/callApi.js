// Wrappers for fetch API
export const get = async (url) => {
  const response = await fetch(url);
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};

export const post = async (url, data) => {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors',
    headers: {
      // Accept: '*/*',
      'Content-Type': 'application/json',
      // 'Access-Control-Origin': '*',
    },
  };
  return request(url, config);
};

export const put = async (url, body) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
    body,
  });

  // if (response.status !== 200) throw Error(response.text())
};

const request = async (url, conf) => {
  const config = conf;
  console.log('URL', url);
  console.log('CONFIG', JSON.stringify(config));
  const response = await window.fetch(url, config);
  const resbody = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return resbody;
  }
  throw Error(response.message);
  // return Promise.reject(response.message);
};
