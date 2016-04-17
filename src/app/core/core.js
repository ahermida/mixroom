/**
 * navc.js is pretty much the controller for the nav
 */

import view from './navv.js';
import store from './store.js';
import {createThread, post} from '../ajax/threads.js';
import fastclick from 'fastclick';

//handle doing upload via ajax -- should build this one ourselves
async function handleUpload(file) {
  async function uploadFile (file) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.onreadystatechange = () => {
          if (req.status !== 200) {
            console.log('Error uploading file');
            reject(false);
          }
          resolve(JSON.parse(request.responseText));
      };
      request.open("post", uploadUrl, true);
      request.setRequestHeader("Content-Type", "multipart/form-data");
      request.setRequestHeader("X-File-Name", file.name);
      request.setRequestHeader("X-File-Type", file.type);
      request.setRequestHeader("X-File-Size", file.size);
      request.send(file);
    });
  }

  //send request
  try {
    let resp = await uploadFile(`http://localhost:8080/upload`, file);

    //grab response & set it in store
    store.upload = {
      content: resp,
      contentType: file.type
    };
  } catch (e) {
    console.log(e);
  }
}

//handle form submission
async function handleSubmit(link, body, to, identity) {
  const anon = identity === 'Anonymous' ? true : false;

  const contentType = store.upload.contentType;
  const cont = store.upload.content;

  //should return all references to other posts in thread
  const getReferences = (body) => {

    //regex for reference (post: 12312)
    const ref = /\(post:(\S*?)\)/g;
    matches = body.match(ref);
    let idrefs = matches.map(match => match.slice(6, -1).trim());
    return idrefs;
  }

  //sendMentions() --> WS stuff
  const isgrp = store.groups.includes(to);
  if (isgrp) {
    //is group

    //get content from store
    try {

      //attempt to send, should provide us with a json obj with id
      const resp = await createThread(to, body, identity, cont, contentType, anon);

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
    let path = location.pathname.split('/');
    let thread = path[path.length - 1];

    //get references in body
    const responseTo = getReferences(body);

    //try to send post to thread
    try {

      //actually send post
      const resp = await post(thread, identity, body, cont, responseTo, anon, contentType);

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
  const nav = new view(store.groups, store.user, handleUpload, handleSubmit);

  //bind handlers
  nav.bind();
}
