/**
 * dom template helpers
 */

import { threadLength } from '../ajax/thread.js';
import store from './store.js';

// type Post struct {
// 	Id          bson.ObjectId   `bson:"_id,omitempty" json:"-"`
//   SId         string          `bson:"id,omitempty" json:"id"`
//   Thread      bson.ObjectId   `bson:"thread,omitempty" json:"-"`
//   Created     time.Time       `bson:"created" json:"created"`
// 	Author      string          `bson:"author" json:"author"`
//   AuthorId    bson.ObjectId   `bson:"authorId,omitempty" json:"-"`
//   Replies     []bson.ObjectId `bson:"replies" json:"replies"`
//   ResponseTo  []bson.ObjectId `bson:"responseTo" json:"responseTo"`
//   Content     string          `bson:"content,omitempty" json:"content"`
//   ContentType string          `bson:"contentType,omitempty" json:"contentType"`
//   Body        string          `bson:"body" json:"body"`
// }
//creates a post's html
export function generatePost(post) {
  const postID = post.id;

  let headpost = `
    <div id="${postID}" class="HeadPost">
      <header class="Header">
      ${generateHeader(thread.group, thread.author, timestamp, true)}
      </header>
      <div class="Content">
      ${generateContent(post.content, post.contentType)}
      </div>
      <div class="Body">
      ${generateBody(post.body)}
      </div>
      <footer class="Footer">
      ${generatePostHeadFooter(threadID, store.user.anonymous)}
      </footer>
    </div>
  `
  return headpost;
}

//creates a head post's html given we have the data
export function generateHeadPost(thread) {
  const post = thread.head;
  const threadID = thread.thread;
  const timestamp = thread.created;
  const postID = post.id;

  let headpost = `
    <div id="${threadID}" class="HeadPost">
      <header class="Header">
      ${generatePostHeadHeader(thread.group, thread.author, timestamp, true)}
      </header>
      <div class="Content">
      ${generateContent(post.content, post.contentType)}
      </div>
      <div class="Body">
      ${generateBody(post.body)}
      </div>
      <footer class="Footer">
      ${generatePostHeadFooter(threadID, store.user.anonymous)}
      </footer>
    </div>
  `
  return headpost;
}

function generateTimestamp(timestamp) {
  //create & format timestampstring
  let ampm = '';
  let time = new Date(timestamp); // timestamp in minutes
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let minutesString = (minutes < 10) ? `0${minutes}` : `${minutes}`
  let hour = ((hours % 12) == 0) ? 12 : hours % 12;
  hours <= 12 ? ampm = 'AM' : ampm = 'PM';
  let now = new Date();
  let date = [time.getMonth() + 1, time.getDate()].join('/');
  let yr = time.getFullYear()
  let fullyr = now.getFullYear() === yr ? "" : yr.slice(2,4);
  //formatted timestamp
  return `${hour}:${minutesString}${ampm} ${fullyr}`;
}

//generate the header for a post --> don't show replies if head
function generatePostHeadHeader(group, author, created, head) {
  //title for each of the posts, replies should be overflow-x
  return `
    <div class="Head-content">
      <span class="Head-left">
        <span class="Head-author">${author}</span>
        -
        <a class="Head-group">${group}</a>
        -
        <span class="Head-created">${generateTimestamp(created)}</span>
      </span>
      <span class="Head-rm">
        <span class="icon-down-open-big"></span>
      </span>
    </div>
  `;
}

//generate the header for a post --> don't show replies if head
function generatePostHeader(group, author, created, head) {
  //title for each of the posts, replies should be overflow-x
  return `
    <div class="Head-content">
      <span class="Head-left">
        <span class="Head-author">${author}</span>
        -
        <span class="Head-contentType">${post.contentType || 'text'}</span>
        -
        <span class="Head-created">${generateTimestamp(created)}</span>
      </span>
      <span class="Head-rm">
        <span class="icon-down-open-big"></span>
      </span>
    </div>
  `;
}

//return html content section --> video or img
function generateContent(content, contentType) {
  if (!content) return;
  let html;
  if (contentType === 'link') {
    html = `<div class="Content-iframe">${oembed(content)}</div>`
  } else {
    //treat video and images differently
    if (contentType.split('/')[0] === 'video') {
      html = `
      <video loop autoplay class="Content-iv" controls>
        <source src="${content}" type="${contentType}">
      </video>`;
    } else {
      html = `<img class="Content-img" src="${content}">`;
    }
  }

  //if all works out, return proper html
  return `<div class="Content-wrapper"><div class="Content">${html}</div></div>`;
}

//handle body of post
function generateBody(str) {
  return `<div class="Body-content">${parser(str)}</div>`
}

//gets thread's length via ajax
function getThreadLength(thread) {
  let length;
  (async (thread) => {
    try {
      let res = await threadLength(thread);
      let resp = await res.json();
      length = resp.size;
    } catch (e) {
      console.log(e);
    }
  })(thread);
  return length;
}

//handle footer of thread post (head)
function generatePostHeadFooter(thread, loggedIn) {
  let length = getThreadLength(thread);
  let footer = `
  <div class="Footer-content">
    <span class="Footer-left">
      <span class="icon-comment Footer-left-icon"></span>
      <span class="Footer-left-size">${length} posts</span>
    </span>
    <span class="Footer-right">
      ${loggedIn ? `<span class="Footer-right-save">save</span>` : ''}
      <span class="Footer-right-reply">
        <span class="icon-reply"></span>
        reply
      </span>
      <span class="Footer-open">
        open
      </span>
    </span>
  </div>
  `;
  return footer;
}

//handle footer of thread post (head)
function generatePostFooter(replies) {
  //might make calls in here later -> that's why it's a function
  let footer = `
  <div class="Footer-content">
    <span class="Footer-left">
      <span class="icon-comment Footer-left-icon"></span>
      <span class="Footer-left-size">${replies} replies</span>
    </span>
    <span class="Footer-right">
      <span class="report">
        report
      </span>
      <span class="Footer-right-reply">
        <span class="icon-reply"></span>
        reply
      </span>
    </span>
  </div>
  `;
  return footer;
}
