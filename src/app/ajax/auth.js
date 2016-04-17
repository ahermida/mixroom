/*
  Auth ajax utility functions #touchtips -- all are async functions
*/
import request from 'request';
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: JSON.stringify({
      email: email,
      password: password
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access_token': truePath
    }
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: JSON.stringify({
      email: email
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': token
    },
    json: true,
    body: JSON.stringify({
      password: pass,
      newPassword: newPass
    })

  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
  });
}
