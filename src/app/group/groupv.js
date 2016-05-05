/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generateHeadPost, generatePopularPost, generateTimestamp } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(group, data, user, page, options) {

    //set group
    this.group = group;

    //set threads --> catch null threads (like when the page is empty)
    this.threads = data.threads || [];

    //set group info
    this.info = data.info;

    //set threads
    this.popular = data.popular || [];

    //set user data
    this.user = user;

    //set page
    this.page = page;

    //utility functions for thread operations
    this.saveThread = options.saveThread;
    this.unsaveThread = options.unsaveThread;
    this.deleteThread = options.deleteThread;

     //setup commands for view actions
 		this.viewCommands = {
      reply: (e) => this._reply(e),
      open: (e) => this._open(e),
      group: (e) => this._goToGroup(e),
      user: (e) => this._goToUser(e),
      savePost: (e) => this._savePost(e),
      hidePost: (e) => this._hidePost(e),
      showPost: (e) => this._showPost(e),
      report: (e) => this._reportPost(e),
      toggleBody: (e) => this._toggleBody(e),
      nextPage: (e) => this._nextPage(e),
      prevPage: (e) => this._prevPage(e),
      delete: (e) => this._deletePost(e)
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $listing = $id('List');
    let $prev = $id('prevpage');
    let $next = $id('nextpage');
    let $popular = $id('Main-desktop-group');
    let $author = $id('Main-desktop-author');

    //clicks on listing sections --> reuses _onPostClick for convenience
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($popular, 'click', this._onPostClick.bind(this), false);
    $on($author, 'click', (() => this._goToUser(this.info.author)).bind(this), false);

    //set up handlers for pagination
    if ($prev) $on($prev, 'click', this.viewCommands.prevPage.bind(this), false);
    if ($next) $on($next, 'click', this.viewCommands.nextPage.bind(this), false);
  }

  _postOwned(id) {
    //checks if we own post (so we can add delete when we render)
    if (this.user.auth.mod) return true;
    this.user.owned.forEach((currId) => {
      if (currId === id) return
    });
  }

  _hidePost(e) {
    e.target.className = 'icon-up-open-big';
    let target = e.target.parentNode;
    while(target.className != 'HeadPost') {
      //get headpost & remove the children we want
      target = target.parentNode;
    }
    Array.prototype.forEach.call(target.childNodes, node => {
      if (node.className === 'Body' || node.className === 'Content') {
        node.style.display = 'none';
      }
    });
  }

  _showPost(e) {
    e.target.className = 'icon-down-open-big';
    let target = e.target.parentNode;
    while(target.className != 'HeadPost') {
      target = target.parentNode;
    }
    //get headpost & show the children we want
    Array.prototype.forEach.call(target.childNodes, node => {
      if (node.className === 'Body' || node.className === 'Content') {
        node.style.display = 'block';
      }
    });
  }

  _prevPage(e) {
    if (this.page <= 1) return router.navigate(this.group);
    router.navigate(`${this.group}${--this.page}`);
  }

  _nextPage(e) {
    router.navigate(`${this.group}${++this.page}`);
  }

  //handle post clicks
  _onPostClick(e) {
    let target = e.target;
    switch (target.className) {
      case 'Head-author':
      this._goToUser(target.textContent);
      break;
      case 'Head-group':
      this.viewCommands.group(e);
      break;
      case 'icon-down-open-big':
      //hacky solution to delegation tactics
      this.viewCommands.hidePost(e);
      break;
      case 'icon-up-open-big':
      //hacky solution to delegation tactics
      this.viewCommands.showPost(e);
      break;
      case 'Body':
      this.viewCommands.toggleBody(e);
      break;
      case 'report space':
      //sends request off to dev server
      this.viewCommands.report(e);
      break;
      case 'Footer-right-save space':
      //saves and unsaves posts
      this.viewCommands.savePost(e);
      break;
      case 'Footer-right-reply space':
      //opens writer with thread as target
      this.viewCommands.reply(e);
      break;
      case 'Footer-open space':
      //opens thread
      this.viewCommands.open(e);
      break;
      case 'Footer-right-delete space':
      //deletes thread
      this.viewCommands.delete(e);
      break;
      default:
      this._cancelDelete(e);
    }
  }

  //reply to post
  _reply(e) {
    nav.openWriter(e.target.parentNode.dataset.thread);
  }

  //open thread
  _open(e) {
    router.navigate(`${this.group}t/${e.target.parentNode.dataset.thread}`);
  }

  //go to group
  _goToGroup(e) {
    router.navigate(e.target.textContent);
  }

  //go to user
  _goToUser(username) {
    if (username !== 'Anonymous') router.navigate('/user/${username}');
  }

  //save post
  _savePost(e) {
    if (e.target.style.color === '#6879FF') {
      //unlike
      e.target.style.color = '#3b5998';
      let thread = e.target.parentNode.dataset.thread;
      unsavePost(thread);
    } else {
      //like
      e.target.style.color = '#6879FF';
      let thread = e.target.parentNode.dataset.thread;
      savePost(thread);
    }
  }

  //report post
  _reportPost(e) {

    //TODO: set up dev server and shoot off requests here
    if (e.target.textContent === 'report') return e.target.innerHTML = 'unreport';
    e.target.innerHTML = 'report';
  }

  //cancel delete
  _cancelDelete() {
    //only one deleteable at a time
    let pending = $id('delete-pending');
    if (pending) {
      pending.innerHTML = 'delete';
      pending.id = '';
    }
  }

  //delete post
  _deletePost(e) {
    let content = e.target.innerHTML;
    if (content === 'delete') {
      this._cancelDelete();
      e.target.innerHTML = "sure?"
      e.target.id = 'delete-pending';
      return;
    }
    let thread = e.target.parentNode.dataset.thread;
    let post = e.target.parentNode.dataset.post;
    console.log(thread);
    let match;
    let owned = Object.keys(this.user.owned);
    for (let i = 0; i < owned.length; i++) {
      if (post === owned[i]) {
        match = owned[i];
      }
    }
    console.log(match);
    if (match) this.deleteThread(thread, this.user.owned[match]);

    //reload this page (but not refresh)
    router.check();
  }

  _toggleBody(e) {
    e.target.maxHeight = e.target.maxHeight === '400px' ? '1000px' : '400px';
  }

  //generate html
  generateStaticView(threads, info, popular, user) {
    const getposts = async () => {
      let promises = threads.map(thread => generateHeadPost(thread, user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const getpopularposts = async () => {
      let promises = popular.map(post => generatePopularPost(post, user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const buildView = async () => {
      //main header
      const header = `
        <div id="Main-Header">

        </div>
      `;
      //wrapper for listing
      const list = `
      <div id="List" class="List">
      ${await getposts()}
      </div>
      `;

      //pagination controls
      const footer = `
      <div class="Main-Footer">
      ${this.page > 0 ? '<a class="Main-Footer-btn" id="prevpage" href="javascript:;">prev</a>' : ''}
      ${this.threads.length === 30 ? '<a class="Main-Footer-btn" id="nextpage" href="javascript:;">next</a>' : ''}
      </div>
      `;

      //desktop view information
      const desktopright = `
        <div id="Main-desktop-group" class="desktop">
          <div class="PopularList">
            <span id="Main-desktop-title">
              <span id="Main-desktop-title-text">Popular</span>
            </span>
            ${await getpopularposts()}
          </div>
        </div>
      `;

      const desktopleft = `
        <div id="Main-desktop-info" class="desktop">
          <div class="GroupName">${info.name}</div>
          <div class="GroupAuthor">
            <p class="GroupAuthor-title">Made by:</p>
            <p id="Main-desktop-author" class="GroupAuthor-name">${info.author}</p>
          </div>
          <div class="GroupPage">
            <p class="GroupPage-page">Page:</p>
            <p class="GroupPage-num">${this.page}</p>
          </div>
          <div class="Created">
            <p>Created</p>
            <p>${generateTimestamp(info.created)}</p>
          </div>
        </div>
      `;

      //final template for section
      return `
        <div id="Main-container">
          ${header}
          ${desktopleft}
          ${desktopright}
          ${list}
          ${footer}
        </div>
        `;
    };

    return buildView();
  }

  //bake html into view
  render() {
    let that = this;
    let tmp = this.generateStaticView(this.threads, this.info,this.popular, this.user);
    tmp.then(tmp => {
      $id('main').innerHTML = tmp;
      that.bind();
    });
  }
}
