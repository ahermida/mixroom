/*
  thread and post functions -- ajax utility functions #touchtips -- all are async functions
*/
import fetch from 'isomorphic-fetch';
import config from '../config.js';

//check if we're in a browser or not
const isNode = config.isNode;

let that = that || {};

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

//=============================================================================
//                              /thread/ Routes
//=============================================================================

/**
 * [Async] -- Get Thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await getThread('thread');
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function getThread(thrd) {
  let endpoint = "/thread/";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      thread: thrd
    })
  });
}

/**
 * [Async] -- make thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await createThread("test","hello","test","linkhere",false);
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function createThread(grp, bdy, authr, cont, contType, anon) {
  let endpoint = "/thread/modify";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      group: grp,
      body: bdy,
      author: authr,
      content: cont,
      contentType: contType,
      anonymous: anon
    })
  });
}

/**
 * [Async] -- remove thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     await rmThread("thread");
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function rmThread(thrd, id) {
  let endpoint = "/thread/modify";
  if (!id) {
    //Send Request
    return fetch(`http://${apihost}${endpoint}`, {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'error',
      headers: new Headers(makeHeaders(token, true)),
      body: JSON.stringify({
        thread: thrd
      })
    });
  } else {
    //Send Request
    return fetch(`http://${apihost}${endpoint}`, {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'error',
      headers: new Headers(makeHeaders(token, true)),
      body: JSON.stringify({
        thread: thrd,
        id: id
      })
    });
  }
}

/**
 * [Async] -- Get Thread's length
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     await threadLength("thread");
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function threadLength(thrd) {
  let endpoint = "/thread/length";
  //Send Request
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      thread: thrd
    })
  });
}


/**
 * [Async] -- Post to thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await post("thread","bdy", "cont", respTo, false, ".mp4");
 *     console.log(data);
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function post(thrd, identity, bdy, cont, respTo, anon, contType) {
  let endpoint = "/thread/post";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      thread: thrd,
      body: bdy,
      author: identity,
      content: cont,
      responseTo: respTo,
      anonymous: anon,
      contentType: contType
    })
  });
}

/**
 * [Async] -- Edit post in thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await editPost("pstid1", "this is a cool new post");
 *     console.log(data);
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function editPost(pst, bdy) {
  let endpoint = "/thread/post";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'PUT',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      post: pst,
      body: bdy
    })
  });
}

/**
 * [Async] -- Delete post in thread
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     await rmPost("pstid1");
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function rmPost(pst) {
  let endpoint = "/thread/post";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'DELETE',
    mode: 'no-cors',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      post: pst
    })
  });
}
