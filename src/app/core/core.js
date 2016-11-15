/**
 * core.js is pretty much the controller for the nav & basic app functionality
 */

import view from './navv.js';
import store from './store.js';
import {createThread, post} from '../ajax/threads.js';
import {getAuth} from '../ajax/groups.js';
import {getUser} from '../ajax/user.js';
import fastclick from 'fastclick';
import fetch from 'isomorphic-fetch';
import {validate} from './oembed.js';
import config from '../config.js';
import socket from '../socket.js';
import router from '../router/router.js';

/**
  AJAX Handlers passed in as view actions
 */

/* checks authorization of a user in a group */
 async function checkAuth(group) {
   try {
     let res = await getAuth(group);
     let resp = res.json();
     return resp;
   } catch (e) {
     //this happens when a group doesn't exist
     return;
   }
 }


/*  Handle File Upload   */
export async function handleUpload(file) {
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
export async function handleSubmit(link = '', body, to, identity = 'Anonymous') {

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

    //reload page if were loading from group view
    router.check();

  } else {
    //is thread

    //get path (thread id)
    let getPath = () => location.pathname.split('/');
    let path = getPath();
    let thread = to === 'this thread' ? path[path.length - 1] : to;

    //get references in body
    const responseTo = getReferences(body);


          //clear upload in store
          store.upload = false;

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

      //lets us know if we're peeking in a room to say something
      let peeking = false;

      //check if we're peeking
      if (!socket.inRoom) {

        //if so, join room so we can say something
        socket.joinRoom(thread);

        //let us know we're peeking
        peeking = true;
      }

      //send the message to the group -- create date because our server usually does that
      socket.send(JSON.stringify({
        thread: thread,
        body: body,
        id: resp.postId,
        author: identity,
        content: cont,
        responseTo: responseTo,
        created: new Date(),
        replies: [],
        anonymous: anon,
        contentType: contentType
      }));

      //get outta there if we were just peeking
      if (peeking) {
        socket.leaveRoom();

        //reload page so we can see the nice reload
        router.check();
      }

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
  'handleSubmit': handleSubmit,
  'checkAuth': checkAuth
};

//handle getting user (usernames, username) data via ajax
//get user data and store it
async function getUserInfo() {
  try {
    //attempt to get user
    let usr = await getUser();

    //in the likely case we're not logged in & have no token, return
    let usrjson = await usr.json();

    if (usrjson) {

      //if token is valid, but user has a problem, we should get an empty user
      if (!usrjson.username) {
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return;
      }

      //else continue
      store.addUser(usrjson);
      nav.updateUser(store.user)
    }

  } catch (err) {

    if (err.statusCode === 401)

    //let ourselves know if there was an error getting the user --> this happens when user doesn't exist
    console.log('Err getting user');
  }
}

//create view obj
export const nav = new view(config.groups, store.user, options);

//export extract references function
export function getReferences(body) {
  //regex for reference
  const ref = /\(post:(.*?)\)/g;
  let idrefs;
  let matches = body.match(ref);
  if (matches) {
    idrefs = matches.map(match => match.slice(6, -1).trim());
  }
  return idrefs || [];
}


//initialize the core app
export default async function start() {

  //adjust click events for mobile taps
  fastclick(document.body);

  //bind handlers for base app
  nav.bind();

  try {
    //attempt to get user
    let usr = await getUser();

    //in the likely case we're not logged in & have no token, return
    let usrjson = await usr.json();

    if (usrjson) {

      //if token is valid, but user has a problem, we should get an empty user
      if (!usrjson.username) {
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

      //else continue
      store.addUser(usrjson);
      return nav.updateUser(store.user)
    }

  } catch (err) {

    if (err.statusCode === 401)

    //let ourselves know if there was an error getting the user --> this happens when user doesn't exist
    console.log('Err getting user');
  }

}
