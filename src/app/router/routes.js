/**
  Router init function (sets up routes)

  layout:
          / --> home (pg 0 for /main/)
          /:group --> grp
          /t/:thread --> front page threads
          /:group/:page --> group view for page
          /:group/t/:thread --> thread view for group
*/

import {getAuth} from '../ajax/groups.js';
import config from '../config.js';
import grp from '../group/group.js';
import thrd from '../thread/thread.js';
import socket from '../socket.js';

//group gotten when hitting '/' route
const main = config.groups.main;

//this is where views are set up
export default function setup(router) {

  //middleware for routing
  router.onNavigate((path) => {
    
    //leave real time connection in thread
    if (socket.inRoom) socket.leaveRoom();

    //clear view on route change --> maybe put an animation
    document.getElementById('main').innerHTML = "";
  });

  //set up root handler '/'
  router.onRoot(async () => {
    let res = await getAuth(main);
    let resp = await res.json();
    grp(main, 0, resp);
  });

  //route for user view and settings '/user/:username'
  router.add(/user\/(.*)/, (username) => {

    //user view
    console.log('user');
  });

  //search '/search/:search'
  router.add(/search\/(.*)/, (search) => {

    //search view
    console.log('search');
  });

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/t\/(.*)/, async (group, thread) => {
    socket.joinRoom(thread);
    group = group ? group : '/';
    let res = await getAuth(`/${group}/`);
    let resp = await res.json();
    if (!resp.allowed && group != "/404/") return router.navigate('/404');
    //setup thread view
    thrd(thread);
  });

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/(.*)/, async (group, page) => {
    group = `/${group}/`;
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "/404/") return router.navigate('/404');

    //setup group once again -- squiggles are a string -> int type conversion
    grp(group, ~~page, resp);
  });

  //route for group (page:0) '/:group' || if integer --> pagination for FP
  router.add(/(.*)/, async (group) => {
    group = `/${group}/`;
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "/404/") return router.navigate('/404');
    //setup group
    grp(group, 0, resp);
  });
}
