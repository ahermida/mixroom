/*
  Auth ajax utility functions #touchtips -- all are async functions
*/
import fetch from 'isomorphic-fetch';
import config from '../config.js';
import token from './cookie.js';

//check if we're in a browser or not
const isNode = config.isNode;

//default expects api to be running on localhost:8000
const apihost = config.api

//=============================================================================
//                              /auth/ Routes
//=============================================================================

/**
 * [Async] -- creates a user
 * @example
 * async function doStuffWithThisFunc(email, username, password){
 *   try {
 *     let data = await createUser(email, username, password);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function createUser(email, username, password) {
  let endpoint = "/auth/register";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    })
  });
}

/**
 * [Async] -- logs a user in
 * @example
 * async function doStuffWithThisFunc(email, password) {
 *   try {
 *     let data = await loginUser(email, password);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function loginUser(email, password) {
  let endpoint = "/auth/login";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
}

/**
 * [Async] -- Activates a user based on location
 * @example
 * async function doStuffWithThisFunc(location) {
 *   try {
 *     let data = await activatUser(location);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function activateUser(location = window.location.pathname) {
  let truePath = location.substring(6);
  let endpoint = "/auth/activate";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'GET',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'access_token': truePath
    })
  });
}

/**
 * [Async] -- Deactivate user
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await deactivatUser();
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function deactivateUser() {
  if (!token) {
    return;
  }
  let endpoint = "/auth/remove";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'access_token': token
    })
  });
}

/**
 * [Async] -- sends a recovery email to a user's account
 * @example
 * async function doStuffWithThisFunc(email) {
 *   try {
 *     let data = await recoverUser(email);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function recoverUser(email) {
  let endpoint = "/auth/recover";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      email: email
    })
  });
}

/**
 * [Async] -- change password to a user's account
 * @example
 * async function doStuffWithThisFunc(password, newPassword) {
 *   try {
 *     let data = await changePass(password, newPassword);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function changePass(pass, newPass) {
  if (!token) {
    return;
  }
  let endpoint = "/auth/changepass";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers({
      'Content-Type': 'application/json',
      'access_token': token
    }),
    body: JSON.stringify({
      password: pass,
      newPassword: newPass
    })
  });
}
