/**
 * core.js is pretty much the controller for the nav & basic app functionality
 */

import view from './navv.js';
import store from './store.js';
import {createThread, post} from '../ajax/threads.js';
import fastclick from 'fastclick';
import fetch from 'isomorphic-fetch';

//handle doing upload via ajax -- should build this one ourselves
async function handleUpload(file) {
  async function uploadFile (file) {
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
    let resp = JSON.parse(res);
    //grab response & set it in store
    store.upload = {
      content: resp.url,
      contentType: file.type
    };
  } catch (e) {
    console.log(e);
  }
}

//handle form submission
async function handleSubmit(link = '', body, to, identity) {
  const anon = identity === 'Anonymous' ? true : false;

  //should return all references to other posts in thread
  const getReferences = (body) => {

    //regex for reference (post: 12312)
    const ref = /\(post:(\S*?)\)/g;
    let matches = body.match(ref);
    let idrefs = matches.map(match => match.slice(6, -1).trim());
    return idrefs || [];
  }

  //if there's no content, shove the link in there and set upload to link
  if (!store.upload.content) {
    store.upload = {
      content: link,
      contentType: 'link'
    }
  } else {

    //if there's both a link and a pic, prioritize pic and show link as part of body
    if (link) {
      body = `${link}\n${body}`;
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

      //since it's a group, remove the for internal use
      to = to.slice(1, -1);

      //attempt to send, should provide us with a json obj with id
      const res = await createThread(to, body, identity, cont, contentType, anon);

      //res isn't in json format
      resp = await res.json();

      //send this on delete or edit if we do so
      store.owned = resp.id;

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
    let thread = path[path.length - 1];

    //get references in body
    const responseTo = getReferences(body);

    //try to send post to thread
    try {

      //actually send post
      const res = await post(thread, identity, body, cont, responseTo, anon, contentType);

      //res isn't in json format
      resp = await res.json();

      //send this on delete or edit if we do so
      store.owned = resp.id;

      //clear upload in store
      store.upload = false;

    } catch(e) {

      //if something went wrong in trying to post it, let ourselves know
      console.log(e);
    }
  }
}

export default function start() {
  //adjust click events for mobile
  fastclick(document.body);

  //options are functions passed into view handlers
  const options = {
    'handleUpload': handleUpload,
    'handleSubmit': handleSubmit
  };

  //create view
  const nav = new view(store.groups, store.user, options);

  //bind handlers
  nav.bind();
}
