/**
 * Store for core actions (particularly those caused by nav)
 */

import config from '../config.js';

const auto = config.groups.auto;
const isNode = config.isNode;

//export appStore, handles general user data
const store = {
  //initialize user as anon
  _user: {anonymous: true, username:'', usernames: []},

  //initialize groups
  _groups: auto,

  //initialized owned data -- by id -- ONLY HEAD POSTS & POSTS
  _owned: (() => {
   let owned = window.localStorage.getItem('_owned');
   if (owned) return JSON.parse(owned);
   return {};
  })(),

  //initialize upload data
  _uploadData: {
    contentType: "",
    content: ''
  },

  //set user data
  addUser: user => {
    if (user.anonymous) {
      store._user = {
        anonymous: true,
        username: '',
        usernames: [],
        notifications: 0
      };
    } else {
      store._user = {
        username: user.username,
        anonymous: false,
        usernames: user.usernames,
        notifications: user.notifications,
        saved: user.saved
      };
      store.loggedIn = true;
    }
  },
  get user() {
    return this._user
  },
  addGroups: groups => {

    //loop through array of groups & push them to our internal list
    groups.forEach(grp => this._groups.push());
  },
  get groups() {

    //get groups from internal store
    return this._groups;
  },

  //push data to owned ids
  addOwned: opts => {
    store._owned[opts.postId] = opts.id;

    if (!isNode) {
      //set owned in localStorage (the cheap way)
      window.localStorage._owned = JSON.stringify(store._owned);
    }
  },
  get owned() {
    //get owned ids
    return this._owned;
  },
  set upload(c) {
    if (!c) {
      this._uploadData.content = '';
      this._uploadData.contentType = '';
    } else {
      this._uploadData.content = c.content;
      this._uploadData.contentType = c.contentType;
    }
  },
  get upload() {
    return this._uploadData;
  },
  loggedIn: false
};

export default store;
