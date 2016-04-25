/**
 * Store for thread -- helps to model posts
 */

import config from '../config.js';

const isNode = config.isNode;

//export appStore, handles general user data
export default {
  //initialize user as anon
  _posts: []

  //set user data
  set threads (thrds) {
    if (user.anonymous) {
      this._user = {
        anonymous: true,
        username: '',
        usernames: [],
        notifications: 0
      };
    } else {
      this._user = {
        username: user.username,
        anonymous: user.anonymous,
        usernames: user.usernames,
        notifications: user.notifications
      };
    }
  },

  //get user data
  get user() {
    return this._user
  },

  //get groups
  set groups(groups) {

    //loop through array of groups & push them to our internal list
    groups.forEach(grp => this._groups.push());
  },

  //get all groups that have been added so far
  get groups() {

    //get groups from internal store
    return this._groups;
  },

  //push data to owned ids
  set owned(id) {
    this._owned.push(id);
    if (!this.isNode) {

      //set owned in localStorage (the cheap way)
      localStorage._owned = this._owned;
    }
  },

  //retrieve owned ids
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
  }
};
