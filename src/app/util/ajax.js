/*
  ajax utility functions #touchtips -- all are async functions
*/
import request from 'request';
import config from '../config.js';

//check if we're in a browser or not
const isNode = module !== 'undefined' && module.exports;

//get cookie passed in by config
function getCookie(cname) {

  //cookie string from source
  let cookie = "";
  if (isNode) {
    if (that && that.headers && that.headers.cookie) {
      cookie = that.headers.cookie;
    }
  } else {
    cookie = document.cookie;
  }

  var name = cname + "=";
  var ca = cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return cookie;
}

//default expects api to be running on localhost:8000
const apihost = config.api

//get access_token from cookie
const token = getCookie('access_token');

/**
 * [Async] -- gets a user's data
 * @example
 * async function doStuffWithThisFunc() {
 *   let data = yield getUser();
 *   return data;
 * }
 */
export function getUser() {
  let endpoint = "/user/"
  if (!token) {
    return;
  } else {
    let options = {
      url: `http://${apihost}${enpoint}`,
      method: 'GET'
      headers: {
        'Content-Type': 'application/json',
        'access_token': token
      }
    };

    //Send Request
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        error ? reject(error) : resolve(body);
      });
    });
 }
}
