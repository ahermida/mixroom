/*
  thread and post functions -- ajax utility functions #touchtips -- all are async functions
*/
import request from 'request';
import config from '../config.js';

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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({ thread: thrd})
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
     error ? reject(error) : resolve(body);
    });
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
export function createThread(grp, bdy, authr, cont, anon) {
  let endpoint = "/thread/modify";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      group: grp,
      body: body,
      author: authr,
      content: cont,
      anonymous: anon
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
export function rmThread(thrd) {
  let endpoint = "/thread/modify";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      thread: thrd
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
export function post(thrd, bdy, cont, respTo, anon, contType) {
  let endpoint = "/thread/post";
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'POST',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      thread: thrd,
      body: bdy,
      content: cont,
      responseTo: respTo,
      anonymous: anon,
      contentType: contType
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'PUT',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      post: pst,
      body: bdy
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
  let options = {
    url: `http://${apihost}${enpoint}`,
    method: 'DELETE',
    headers: makeHeaders(token, true),
    json: true,
    body: JSON.stringify({
      post: pst,
    })
  };

  //Send Request
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(body);
    });
  });
}
