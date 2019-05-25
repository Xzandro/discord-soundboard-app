import axios from 'axios';
const { remote } = require('electron');
let config = remote.getGlobal('config');

const fs = window.require('fs');

const debug = false;
const baseURL = debug ? 'http://localhost:3100' : 'http://sb.swop.one';

export function requestApi(endpoint, method, qs = {}, data, formData) {
  qs.clientID = config.Config.App.clientID;
  const options = {
    method: method,
    params: qs,
    headers: {
      sbAuth: config.Config.App.token
    },
    url: `${baseURL}${endpoint}`
  };

  if (data) {
    options.body = data;
  }

  if (formData) {
    let form_data = new FormData();

    for (let key in formData) {
      form_data.append(key, formData[key]);
    }

    options.data = form_data;
  }

  return axios(options);
}
