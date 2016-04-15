/**
 * navc.js is pretty much the controller for the nav
 */

import view from './navv.js';
import store from './store.js';
import {getUser} from '../ajax/user.js';
import {createThread, post} from '../ajax/threads.js';

//handle getting user (usernames, username) data via ajax
async function getUser() {
  try {
    //attempt to get user
    store.user = await getUser();
  } catch (err) {
    //let ourselves know if there was an error
    console.log(err);
  }
}

//handle doing upload via ajax -- should build this one ourselves
async function handleUpload(file) {
  const uploadFile = (file) => {
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
    };
    try {
      let data = await uploadFile(`http://localhost:8080/upload`, file);
      return data;
      //should set in form data
    } catch (e) {
      console.log(e);
    }
  });
}

//should return all references to other posts in thread
function getReferences(body) {
  //regex for reference (post: )
  const ref = /\(post:(\S*?)\)/g;
  matches = body.match(ref);
  let idrefs = matches.map(match => match.slice(6, -1).trim());
  return idrefs;
}

//handle form submission
async function handleSubmit(link, body, to, identity) {
  const anon = identity === 'Anonymous' ? true : false;

  //sendMentions() --> WS stuff
  const isgrp = store.groups.includes(to);
  if (isgrp) {
    //is group

    //get content from store -- check link
    const resp = await createThread(to, body, identity, cont, anon);
  } else {
    //is thread
    const responseTo = getReferences(body);
    const resp = await post(to, bdy, cont, respTo, anon, contType);
  }
}
