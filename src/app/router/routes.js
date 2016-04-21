/**
  Router init function (sets up routes)

  layout:
          / --> home (pg 0 for /random/)
          /:group --> grp
          /t/:thread --> front page threads
          /:group/:page --> group view for page
          /:group/t/:thread --> thread view for group
*/

import {getAuth} from '../ajax/groups.js';

//this is where views are set up
export default function setup(router) {

  //middleware for routing
  router.onNavigate((path) => {

    //clear view on route change
    document.getElementById('main').innerHTML = "";
  });

  //set up root handler '/'
  router.onRoot(() => {
    console.log('get fp ---> /random/');
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
    console.log('thread');
    group = group ? group : '/';
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "404") return router.navigate('/404');
    //setup group once again
  });

  //route for pagination on groups '/:group/:page'
  router.add(/(.*)\/(.*)/, async (group, page) => {
    group = group ? group : '/';
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "404") return router.navigate('/404');
    //setup group once again
  });

  //route for group (page:0) '/:group' || if integer --> pagination for FP
  router.add(/(.*)/, async (group) => {
    group = group ? group : '/';
    console.log('group');
    let res = await getAuth(group);
    let resp = await res.json();
    if (!resp.allowed && group != "404") return router.navigate('/404');
    //setup group
  });
}
