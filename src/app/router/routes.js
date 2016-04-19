/**
  Router init function (sets up routes)
*/

export default function setup(router) {

  //route for user view and settings '/user/:username'
  router.add(/user\/(.*)/, (username) => console.log('user'));

  //search '/search/:search'
  router.add(/search\/(.*)/, (search) => console.log('search'));

  //route for threads '/:group/:thread'
  router.add(/(.*)\/(.*)/, (group, thread) => console.log('thread'));

  //route for groups '/:group'
  router.add(/(.*)/, (group) => {
    console.log('group');
  });
}
