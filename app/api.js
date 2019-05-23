import request from 'request-promise';
const { remote } = require('electron');
let config = remote.getGlobal('config');

const debug = true;
const baseURL = debug ? 'http://localhost:3100' : 'http://sb.swop.one';

export function requestApi(endpoint, method, qs = {}) {
  qs.clientID = config.Config.App.clientID;
  const options = {
    method: method,
    qs: qs,
    headers: {
      sbAuth: config.Config.App.token
    },
    uri: `${baseURL}${endpoint}`,
    json: true
  };

  return request(options);
}
