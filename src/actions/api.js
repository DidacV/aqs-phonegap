/* global window */

const request = async (url, conf) => {
  const config = conf;
  console.info('CONFIG', config);
  console.info('URL', url);
  const response = await window.fetch(url, config);
  const resbody = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return resbody;
  }
  throw Error(response.message);
  // return Promise.reject(response.message);
};

export const get = async (url) => {
  const config = {
    method: 'GET',
  };
  return request(url, config);
};

export const post = async (url, data) => {
  console.info('DATA TO BE SENT', data);
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
