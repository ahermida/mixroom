/*
  user functions -- ajax utility functions #touchtips -- all are async functions
*/
import fetch from 'isomorphic-fetch';
import config from '../config.js';
import token from './cookie.js';

//check if we're in a browser or not
const isNode = config.isNode;

//default expects api to be running on localhost:8000
const apihost = config.api

//=============================================================================
//                              All search routes
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
 * [Async] -- search posts
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await searchPosts("test");
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function searchThreads(content) {
  let endpoint = "/thread/search";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      text: content,
      page: 0
    })
  });
}

/**
 * [Async] -- search groups
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await searchUsers("test");
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function searchGroups(content) {
  let endpoint = "/group/search";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      text: content
    })
  });
}

/**
 * [Async] -- search users
 * @example
 * async function doStuffWithThisFunc() {
 *   try {
 *     let data = await searchUsers("test");
 *     console.log(data)
 *   } catch(error) {
 *     console.log(error);
 *   }
 * }
 */
export function searchUsers(content) {
  let endpoint = "/user/search";
  return fetch(`http://${apihost}${endpoint}`, {
    method: 'POST',
    redirect: 'error',
    headers: new Headers(makeHeaders(token, true)),
    body: JSON.stringify({
      text: content
    })
  });
}

export function getGif() {
  let gifKey = 'dc6zaTOxFJmzC';
  // Giphy API URLhttp://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=art&rating=pg-13
  let giphyURL = encodeURI(`http://api.giphy.com/v1/gifs/random?api_key=${gifKey}&tag=art&rating=pg-13`);
  return fetch(giphyURL, {
    method: 'GET'
  });
}
