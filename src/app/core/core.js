/**
 * core.js is pretty much the controller for the nav & basic app functionality
 */

import view from './navv.js';
import store from './store.js';
import {createThread, post} from '../ajax/threads.js';
import fastclick from 'fastclick';
import fetch from 'isomorphic-fetch';
import {validate} from './oembed.js';
import config from '../config.js';

/**
  AJAX Handlers passed in as view actions
 */

/*  Handle File Upload   */
async function handleUpload(file) {
  const uploadFile = file => {
    let data = new FormData();
    data.append('file', file);

    return fetch('/upload', {
      method: 'POST',
      body: data
    });
  }

  //send request
  try {
    let res = await uploadFile(file);
    let resp = await res.json();

    //grab response & set it in store
    store.upload = {
      content: resp.url,
      contentType: file.type
    };
    return true;
  } catch (e) {
    //log error, should only happen if invalid upload - type or large file
    console.log(e);
    return false;
  }
}

/*  Handle Form Submission  */
async function handleSubmit(link = '', body, to, identity = 'Anonymous') {

  const anon = identity === 'Anonymous' ? true : false;

  //if there's no content, shove the link in there and set upload to link
  if (!store.upload.content && link) {
    if (validate(link)) {
      store.upload = {
        content: link,
        contentType: 'link'
      }
    } else {
      store.upload = {
        content: link,
        contentType: 'text'
      }
    }
  }

  const cont = store.upload.content;
  const contentType = store.upload.contentType;

  //sendMentions() --> WS stuff
  const isgrp = store.groups.includes(to);
  if (isgrp) {
    //is group

    //get content from store
    try {

      //attempt to send, should provide us with a json obj with id
      const res = await createThread(to, body, identity, cont, contentType, anon);

      //res isn't in json format
      let resp = await res.json();

      //send this on delete or edit if we do so
      store.addOwned({
        postId: resp.postId,
        id: resp.id
      });

      //clear upload in store
      store.upload = false;

    } catch (e) {

      //if something went wrong, let ourselves know
      console.log(e);
    }
  } else {
    //is thread

    //get path (thread id)
    let getPath = () => location.pathname.split('/');
    let path = getPath();
    let thread = to === 'this thread' ? path[path.length - 1] : to;

    //get references in body
    const responseTo = getReferences(body);

    //try to send post to thread
    try {

      //actually send post
      const res = await post(thread, identity, body, cont, responseTo, anon, contentType);

      //res isn't in json format
      let resp = await res.json();

      //send this on delete or edit if we do so
      store.addOwned({
        postId: resp.postId,
        id: resp.id
      });

      //clear upload in store
      store.upload = false;

    } catch(e) {

      //if something went wrong in trying to post it, let ourselves know
      console.log(e);
    }
  }
}

//options are functions passed into view handlers
const options = {
  'handleUpload': handleUpload,
  'handleSubmit': handleSubmit
};

//create view obj
export const nav = new view(config.groups, store.user, options);

//export extract references function
export function getReferences(body) {
  //regex for reference (post: 12312)
  const ref = /\(post:(.*?)\)/g;
  let idrefs;
  let matches = body.match(ref);
  if (matches) {
    idrefs = matches.map(match => match.slice(6, -1).trim());
  }
  return idrefs || [];
}

//initialize the core app
export default function start() {

  //adjust click events for mobile taps
  fastclick(document.body);

  //bind handlers for base app
  nav.bind();
}
