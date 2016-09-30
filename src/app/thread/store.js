/**
 * Store for thread -- helps to model posts
 */

import config from '../config.js';

const isNode = config.isNode;

//export appStore, handles general user data
export default {
  //initialize user as anon
  _posts: [],

  //set user data
  get posts() {
    return this._posts;
  },

  addPosts: posts => {
    posts.forEach(post => this._posts.push(post));
  },

  addPost: post => {
    
    this._posts.push(post);
  }

};
