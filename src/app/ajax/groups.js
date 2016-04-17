/*
  groups ajax utility functions #touchtips -- all are async functions
*/
import fetch from 'isomorphic-fetch';
import config from '../config.js';

let that = that || {};

//check if we're in a browser or not
const isNode = config.isNode;

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


//=============================================================================
//                              /group/ Routes
//=============================================================================

//make header for request
function makeHeaders(token, json) {
  let headers = {};
  if (token) {
    headers['access_token'] = token;
  }
  if (json) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}

/**
 * [Async] -- Get Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getGroup('group', 0);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
 export function getGroup(grp, pg) {
   let endpoint = "/group/";
   return fetch(`http://${apihost}${enpoint}`, {
     method: 'POST',
     mode: 'cors',
     redirect: 'error',
     headers: new Headers(makeHeaders(token, true)),
     body: JSON.stringify({
       group: grp,
       page: pg
     })
   });
 }

/**
 * [Async] -- Make Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await createGroup('group', false);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function createGroup(grp, anon) {
  let endpoint = "/group/modify";
  return fetch(`http://${apihost}${enpoint}`, {
    method: 'POST',
    mode: 'cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      group: grp,
      anonymous: anon
    })
  });
}

/**
 * [Async] -- Delete Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await deleteGroup('group');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function deleteGroup(grp) {
  let endpoint = "/group/modify";
  //Send Request
  return fetch(`http://${apihost}${enpoint}`, {
    method: 'DELETE',
    mode: 'cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({ group: grp})
  });
}

/**
 * [Async] -- Get User Auth for Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await deleteGroup('group');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getAuthGroup(grp) {
  let endpoint = "/group/auth";
  return fetch(`http://${apihost}${enpoint}`, {
    method: 'POST',
    mode: 'cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({ group: grp})
  });
}

/**
 * [Async] -- Add Admin to Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await addAdmin('group', 'userid');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function addAdmin(grp, usr) {
  let endpoint = "/group/modify";
  //Send Request
  return fetch(`http://${apihost}${enpoint}`, {
    method: 'POST',
    mode: 'cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({ group: grp, user: usr })
  });
}

/**
 * [Async] -- Remove Admin from Group
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await rmAdmin('group', 'userid');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function rmAdmin(grp, usr) {
  let endpoint = "/group/modify";
  return fetch(`http://${apihost}${enpoint}`, {
    method: 'PUT',
    mode: 'cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({ group: grp, user: usr })
  });
}
