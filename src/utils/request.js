import fetch from 'dva/fetch';
import queryString from 'query-string';
import { message } from "antd";
import { routerRedux } from 'dva/router';
import cookie from "./cookie";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if (data.status) {
        message.error(data.message)
      }
      if (!data.success) {
        message.error(data.msg.text)
        if (!data.msg.login) {
          cookie.clearCookie()
          routerRedux.push('/login')
        }

      }

      return data
    })
    .catch(err => {
      console.log(err);
      message.error('网络错误')
    });
}

export function post(url, params) {
  return request(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(params)
  })
}

export function get(url, params) {
  return request(url + '?' + queryString.stringify(params));
}

export function download(url, params) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url + '?' + queryString.stringify(params), true);
  oReq.responseType = "blob";
  oReq.onload = function (oEvent) {
    var content = oReq.response;

    var elink = document.createElement('a');
    elink.download = 'info.xlsx';
    elink.style.display = 'none';

    var blob = new Blob([content]);
    elink.href = URL.createObjectURL(blob);

    document.body.appendChild(elink);
    elink.click();

    document.body.removeChild(elink);
  };
  oReq.send();
}
