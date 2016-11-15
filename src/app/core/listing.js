/**
 *  Class to render and handle listing
 */

import {nav} from './core.js';
import {$id, $on} from './helpers.js';
import {generatePost, generateHeadPost} from './template.js';
import router from '../router/router.js';

export default class Listing {

  constructor(isThread, list, group, user) {
    this.isThread = isThread;
    this.list = list;
    this.group = group;
    this.user = user;

    //keeps track of authors during render
    this.authors = {};

    //setup commands for view actions
    this.viewCommands = {
      reply: (e) => this._reply(e),
      open: (e) => this._open(e),
      openDirectly: (e) => this._openDirectly(e),
      group: (e) => this._goToGroup(e),
      user: (e) => this._goToUser(e),
      savePost: (e) => this._savePost(e),
      report: (e) => this._reportPost(e),
      toggleBody: (e) => this._toggleBody(e),
      delete: (e) => this._delete(e),
      togglePost: (e) => this._togglePost(e),
      scrollToPost: (e) => this._scrollToPost(e)
    };
  }

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $listing = $id('List');

    //might as well keep a reference to the listing because we'll be adding to it
    this.$listing = $listing;
    if (this.isThread) {
      $on($listing, 'mousemove', this._onPostHover.bind(this), false);
    }

    this.$writer = $id('writer');
    this.$writerinput = $id('writer-input');

    //clicks on listing section
    $on($listing, 'click', this._onPostClick.bind(this), false);
  }


  //add post to view
  addPost(post) {
    //get the embedded json
    let message = JSON.parse(post);

    //inser id to authors
    this.authors[message.id] = message.author;

    //generate post and add it
    let genPostAddIt = async () => {
      let div = document.createElement('div');
      div.innerHTML = await generatePost(this.group, message, this.user, this.authors);
      return div;
    };

    //actually generate the post and add it to the DOM
    genPostAddIt().then(div => {
      this.$listing.appendChild(div);

      //update replies to posts that affect us
      this.addReplies(message.responseTo);
    });
  }

  //increment number of replies post has and
  addReplies(postIds) {
    postIds.forEach(postId => {
      let post = qs(`[id='${postId}'] span.Footer-left-size`);
      ++post.innerHTML;
    });
  }

  _delete(e) {
    this.isThread ? this.deletePost(e) : this.deleteThread(e);
  }

  //just exposes _onPostClick (just want to preserve private _onPostClick)
  handlePostClick(e) {
    this._onPostClick(e);
  }

  //handle post clicks
  _onPostClick(e) {
    let target = e.target;
    switch (target.dataset.type) {
      case 'author':
      this._goToUser(e);
      break;
      case 'group':
      this.viewCommands.group(e);
      break;
      case 'hide':
      this.viewCommands.togglePost(e);
      break;
      case 'report':
      //sends request off to dev server
      this.viewCommands.report(e);
      break;
      case 'save':
      //saves and unsaves posts
      this.viewCommands.savePost(e);
      break;
      case 'reply':
      //opens writer with thread as target
      this.viewCommands.reply(e);
      break;
      case 'open':
      //opens thread
      this.viewCommands.open(e);
      break;
      case 'delete':
      //deletes thread
      this.viewCommands.delete(e);
      break;
      case 'ref':
      //scroll to id of post
      this.viewCommands.scrollToPost(e);
      break;
      case 'post-link':
      //opens thread
      this.viewCommands.openDirectly(e);
      break;
      default:
      this._cancelDelete(e);
    }
  }

  //open thread directly from element's thread id
  _openDirectly(e) {
    nav.removeWriter();
    router.navigate(`${e.target.dataset.group}t/${e.target.dataset.thread}`);
    window.scroll(0,0);
  }

  _removePeek() {
    let post = $id('peek-post');
    if (post) {
      post.parentNode.removeChild(post);
    }
  }

  _deletePost(e) {
    let content = e.target.innerHTML;
    if (content === 'delete') {
      this._cancelDelete();
      e.target.innerHTML = "sure?"
      e.target.id = 'delete-pending';
      return;
    }

    let post = e.target.parentNode.dataset.post;
    let match;
    let owned = Object.keys(this.user.owned);
    for (let i = 0; i < owned.length; i++) {
      if (post === owned[i]) {
        match = owned[i];
      }
    }
    console.log(match);
    if (match) this.removePost(post, this.user.owned[match]);

    //reload this page (but not refresh)
    router.check();
  }

  //delete post
  _deleteThread(e) {
    let content = e.target.innerHTML;
    if (content === 'delete') {
      this._cancelDelete();
      e.target.innerHTML = "sure?"
      e.target.id = 'delete-pending';
      return;
    }
    let thread = e.target.parentNode.dataset.thread;
    let post = e.target.parentNode.dataset.post;
    let match;
    let owned = Object.keys(this.user.owned);
    for (let i = 0; i < owned.length; i++) {
      if (post === owned[i]) {
        match = owned[i];
      }
    }
    if (match) this.deleteThread(thread, this.user.owned[match]);

    //reload this page (but not refresh)
    router.check();
  }

  _scrollToPost(e) {
    this._removePeek();
    let post = $id(e.target.dataset.post.trim());

    //if we don't get the post, add a strikethrough
    if (!post) {
      e.target.style.setProperty("text-decoration", "line-through");
      return;
    }

    //else scroll into post-view
    post.scrollIntoView();
    window.scrollBy(0, -48);
    post.classList.remove('enter-animation');

    //hacky way to reset animation, but a must if we don't want to have to clone the element and replace it
    window.setTimeout(() => post.classList.add('enter-animation', 0));
  }

  //handle post clicks
  _onPostHover(e) {
    let target = e.target;
    switch (target.dataset.type) {
      case 'body':
      this._removePeek();
      break;
      case 'content':
      this._removePeek();
      break;
      case 'ref':
      this._peekIntoPost(e);
      break;
    }
  }

  //lets us look at a post on reference hover
  _peekIntoPost(e) {

    this._removePeek();
    let post = $id(e.target.dataset.post.trim());

    //if we don't get the post, add a strikethrough
    if (!post) {
    //  e.target.style.setProperty("text-decoration", "line-through");
      return;
    }

    let newPost = post.cloneNode(true);

    let dimensions = post.getBoundingClientRect();

    //check if dom element is in view on Y axis
    let isInView = dimensions.bottom > 42 &&
        dimensions.top < (window.innerHeight || document.documentElement.clientHeight);

    if (isInView) {
      post.style.backgroundColor = "#ffffba";
      //handler to remove highlight from post on mouseout
      let removeSpotlight = (e) => {
        post.style.backgroundColor = "white";
        e.target.removeEventListener('mouseout', removeSpotlight, false);
      }

      //add spotlight, add mouseout listener, on mouseout we remove the spotlight
      $on(e.target, 'mouseout', removeSpotlight, false);
      return;
    }

    newPost.id = 'peek-post';
    newPost.className = 'peeking-post';

    //grab target bounding rectangle
    let targetDimensions = e.target.getBoundingClientRect();

    //else lets grab the post and bring it here
    newPost.style.left = `${targetDimensions.right + window.scrollX + 10}px`;
    newPost.style.top = `${targetDimensions.top + window.scrollY - 36}px`;
    newPost.style.backgroundColor = 'white';
    this.$listing.appendChild(newPost);
  }

  //reply to post
  _reply(e) {
    if (window.matchMedia('(min-width : 900px)').matches) {
      if (this.$writer.classList.contains('hide')) {
          this.$writer.classList.remove('hide');
      }
      let id = e.target.parentNode.dataset.post;
      document.body.classList.add('writemode');

      //now since it's open, we append the content (presumably an id)
      this.$writerinput.value += this.$writerinput.value ? `\n(post: ${id})\n` : `(post: ${id})\n`;
      this.$writerinput.focus();
    } else {
      nav.openWriterRef(e.target.parentNode.dataset.post);
    }
  }

  //open thread
  _open(e) {
    document.body.classList.remove('writemode');
    if (this.group) {
      router.navigate(`${this.group}t/${e.target.parentNode.dataset.thread}`);
    } else {
      nav.removeWriter();
      let thread = e.target.parentNode.dataset.thread;
      let group = e.target.parentNode.dataset.group;
      router.navigate(`${group}t/${thread}`);
    }
  }

  //go to group
  _goToGroup(e) {
    router.navigate(e.target.textContent);
  }

  //go to user
  _goToUser(e) {
    if (e.target.textContent !== 'Anonymous') router.navigate(`/user/${e.target.textContent}`);
  }

  //save post -- does nothing yet
  _savePost(e) {
    e.target.style.color = e.target.style.color === '#6879FF' ? '#6879FF' : '#3b5998';
  }

  //report post -- does nothing yet
  _reportPost(e) {
    if (e.target.textContent === 'report') return e.target.innerHTML = 'unreport';
    e.target.innerHTML = 'report';
  }

  _toggleBody(e) {
    e.target.maxHeight = e.target.maxHeight === '400px' ? '1000px' : '400px';
  }

  _cancelDelete() {
    //only one deleteable at a time
    let pending = $id('delete-pending');
    if (pending) {
      pending.innerHTML = 'delete';
      pending.id = '';
    }
  }

  _generatePosts() {
    let getPosts;

    //decide whether our function will produce head posts or regular posts
    if (this.isThread) {
      getPosts = async () => {
        let promises = this.list.map(post => {
          this.authors[post.id] = post.author;
          return generatePost(this.group, post, this.user, this.authors);
        });
        let results = await Promise.all(promises);
        return results.join('');
      };
    } else {
      getPosts = async () => {
        let promises = this.list.map(thread => generateHeadPost(thread, this.user));
        let results = await Promise.all(promises);
        return results.join('');
      };
    }
    //get the html for html
    return (async () => await getPosts())();
  }

  //generate html
  generateStaticView() {

    //get the html for html
    return (async () => `<div id="List" class="List">${ await this._generatePosts()}</div>`)();
  }

  //generate only the posts
  generatePosts() {
    return (async () => await this._generatePosts())();
  }

}
