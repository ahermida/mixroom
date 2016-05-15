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
    this.checkAuth = options.checkAuth;

     //setup commands for view actions
 		this.viewCommands = {
      reply: (e) => this._reply(e),
      open: (e) => this._open(e),
      group: (e) => this._goToGroup(e.target.textContent),
      user: (e) => this._goToUser(e),
      savePost: (e) => this._savePost(e),
      report: (e) => this._reportPost(e),
      toggleBody: (e) => this._toggleBody(e),
      nextPage: (e) => this._nextPage(e),
      prevPage: (e) => this._prevPage(e),
      delete: (e) => this._deletePost(e),
      togglePost: (e) => this._togglePost(e)
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
    let $groupinput = $id('GroupNav-input');

    //clicks on listing sections --> reuses _onPostClick for convenience
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($popular, 'click', this._onPostClick.bind(this), false);
    $on($author, 'click', (() => this._goToUser(this.info.author)).bind(this), false);
    $on($groupinput, 'keyup', this._handleGoToGroup.bind(this), false);

    //set up handlers for pagination
    if ($prev) $on($prev, 'click', this.viewCommands.prevPage.bind(this), false);
    if ($next) $on($next, 'click', this.viewCommands.nextPage.bind(this), false);
  }

  _postOwned(id) {
    //checks if we own post (so we can add delete when we render)
    if (this.user.auth.mod) return true;
    let owned = false;
    this.user.owned.forEach((currId) => {
      if (currId === id) owned = true;
    });
    return owned;
  }


  _togglePost(e) {
    //flip icon
    e.target.className = e.target.dataset.open ?  'icon-down-open-big' : 'icon-up-open-big';

    //because it's not initialized in the dom --> switches off
    e.target.dataset.open = e.target.dataset.open ? false : true;

    //move up in the dom until we find the post
    let target = e.target;
    while (target.dataset.type != 'post') {
      target = target.parentNode;
    }

    //toggle post visibility
    target.classList.toggle('Post-Hide');
  }

  //handles the group navigation in the desktop view -- OnKeyUp
  _handleGoToGroup(e) {
    const badresp = (inputEl) => {
      inputEl.placeholder = `Group is unavailable.`
      setTimeout(() => inputEl.placeholder = 'Go to group...',3000);
    }
    if (e.keyCode === 13) {
      const entered = e.target.value;
      let smoothed = `/${entered.replace(/\//g, '')}/`;


      let resp = this.checkAuth(smoothed);

      //reject bad responses
      if (!resp) badresp(e.target);

      //handle json from response
      resp.then(res => {

        //check if allowed, reject if we're not
        if (!res.allowed) {
          badresp(e.target);
        } else {

        //here we are allowed to visit group --> navigate to group
        this._goToGroup(smoothed);
        }
      });
      e.target.value = '';
    }
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
    switch (target.dataset.type) {
      case 'author':
      this._goToUser(target.textContent);
      break;
      case 'group':
      this.viewCommands.group(e);
      break;
      case 'hide':
      this.viewCommands.togglePost(e);
      break;
      case 'body':
      this.viewCommands.toggleBody(e);
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
  _goToGroup(grp) {
    router.navigate(grp);
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
    e.target.style.maxHeight = e.target.style.maxHeight === '500px' ? '1000px' : '500px';
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
          <div class="GroupNav">
            <p></p>
            <input id="GroupNav-input" placeholder="Go to group...">
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
