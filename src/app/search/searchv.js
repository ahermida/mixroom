/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generateHeadPost, generateTimestamp } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(data, user, options) {

    //set users
    this.users = data.users;

    //set group
    this.groups = data.groups;

    //set threads --> catch null threads (like when the page is empty)
    this.threads = data.threads;

    //set user data
    this.user = user;

    //utility functions for thread operations
    this.saveThread = options.saveThread;
    this.unsaveThread = options.unsaveThread;
    this.deleteThread = options.deleteThread;
    this.getGif = options.getGif;

    //save a ref to app-container (so if we need to switch nightmode we can)
    this.$container = $id('app-container');
    this.$main = $id('Main');

    //setup commands for view actions
 		this.viewCommands = {
      reply: (e) => this._reply(e),
      open: (e) => this._open(e),
      openDirectly: (e) => this._openDirectly(e),
      group: (e) => this._goToGroup(e.target.textContent),
      user: (e) => this._goToUser(e),
      goToGroup: (e) => this._goToGroupDirectly(e),
      savePost: (e) => this._savePost(e),
      report: (e) => this._reportPost(e),
      toggleBody: (e) => this._toggleBody(e),
      prevPage: (e) => this._prevPage(e),
      delete: (e) => this._deletePost(e),
      togglePost: (e) => this._togglePost(e),
      toggleNM: (e) => this._toggleNM(e),
      toggleDM: (e) => this._toggleDM(e)
 		};
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $prev = $id('prevpage');
    let $listing = $id('List');
    let $previouspg = $id('previous-pg');
    let $nightmode = $id('nightmode');

    //clicks on listing sections --> reuses _onPostClick for convenience
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($prev, 'click', this.viewCommands.prevPage.bind(this), false);
    $on($nightmode, 'click', this.viewCommands.toggleNM.bind(this), false);
    $on($previouspg, 'click', this.viewCommands.prevPage.bind(this), false);
  }

  _toggleNM(e) {
    this.$container.classList.toggle('nightmode');
    e.target.classList.toggle('Tools-selected');
  }

  _prevPage(e) {
    router.back();
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
    e.target.className = e.target.dataset.open === 'true' ? 'icon-down-open-big' : 'icon-up-open-big';

    //because it's not initialized in the dom --> switches off
    e.target.dataset.open = e.target.dataset.open === 'true' ? 'false' : 'true';

    //move up in the dom until we find the post
    let target = e.target;
    while (target.dataset.type != 'post') {
      target = target.parentNode;
    }

    //toggle post visibility
    target.classList.toggle('Post-Hide');
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
      case 'group':
      //go to group
      this.viewCommands.goToGroup(e);
      break;
      case 'post-link':
      //opens thread
      this.viewCommands.openDirectly(e);
      default:
      this._cancelDelete(e);
    }
  }

  //reply to post
  _reply(e) {
    let thread = e.target.parentNode.dataset.thread;
    let group = e.target.parentNode.dataset.group;
    router.navigate(`${group}t/${thread}`);
    nav.openWriter(e.target.parentNode.dataset.thread);
    this.$writerlabel.textContent = "new post to thread";
    this.$writer.dataset.to = e.target.parentNode.dataset.thread;
    this.$writer.classList.remove('Writer-fs');
  }

  //open thread
  _open(e) {
    nav.removeWriter();
    let thread = e.target.parentNode.dataset.thread;
    let group = e.target.parentNode.dataset.group;
    router.navigate(`${group}t/${thread}`);
  }

  //go to group
  _goToGroup(grp) {
    nav.removeWriter();
    router.navigate(grp);
  }

  //go to user
  _goToUser(username) {
    nav.removeWriter();
    if (username !== 'Anonymous') router.navigate(`/user/${username}`);
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

  //goes to group
  _goToGroupDirectly(e) {
    router.navigate(e.target.dataset.group);
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

  //generate html
  generateStaticView(user, users, threads, groups) {
    const getposts = async () => {
      let promises = threads.map(thread => generateHeadPost(thread, user));
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
      ${users.length ? '' : '<div class="Search-divider">No Users Found</div>'}
      ${users.map(user => `<div class="Search-group" data-type="user" data-group="${group}">${user}</div>`)}
      ${groups.length ? '' : '<div class="Search-divider">No Groups found</div>'}
      ${groups.map(group => `<div class="Search-group" data-type="group" data-group="${group}">${group}</div>`)}
      ${threads.length ? '' : '<div class="Search-divider">No Posts found</div>'}
      ${threads.length ? await getposts() : ''}
      </div>
      `;

      //user has other info catalogued under user, particularly, usernames
      const user = this.user.user;

      const writer = `
        <div id="writer" data-to="local" class="desktop hide">
          <textarea placeholder="..." id="writer-input"></textarea>
          <div id="writer-label">new post</div>
          <div id="writer-exit" class="unselectable">^</div>
          <div id="writer-options" class="desktop hide">
            <div id="writer-link" class="writer-option"><input id="writer-link-input" placeholder="Share a link..."></div>
            <div id="writer-username" class="writer-option">posting as
              <select id="writer-username-option">
                <option>Anonymous</option>
                ${user.usernames.map(username => `<option>${username}</option>`)}
              </select>
            </div>
            <div id="writer-hide" class="writer-option">hide post</div>
          </div>
          <div id="writer-toggle">+</div>
          <span id="writer-buttons">
            <button id="writer-upload">
              <label for="writer-upload-input">
                <span id="writer-upload-text">upload</span>
                <input accept=".webm, .mp4, .gif, .png, .jpeg, .jpg, .mov, .m4v" id="writer-upload-input" class="hide" type="file">
              </label>
            </button>
            <button id="writer-send">send</button>
          </span>
        </div>
        `;

      const listingHeader = `
      <div id="Main-listing-header" class="desktop">
        <div class="Main-listing-group">All Search Results</div>
      </div>
      `;

      //pagination controls
      const footer = `
      <div class="Main-Footer">
       <a class="Main-Footer-btn mobile" id="prevpage" href="javascript:;">back</a>
      </div>
      `;

      let resetimg = async () => {
        try {
          let res = await this.getGif();
          let resJSON = await res.json();
          let url = resJSON.data.image_url;
          let img = $id('rightimg');
          img ? img.src = url : window.clearInterval(resetimg);
        } catch (e) {
          console.log(`Couldn't fetch giphy`);
        }
      }

      window.setInterval(resetimg, 8000);

      let res = await this.getGif();
      let resJSON = await res.json();
      let url = resJSON.data.image_url;


      //desktop view information --> popular posts and stuff like that
      const right = `
        <div id="Poplisting" class="desktop">
          <div class="PopularList">
            <span id="Poplisting-title">...</span>
            <img id="rightimg" src="http://${window.location.host}/static/uploads/yup.gif">
          </div>
          <div class="Mixroom-info" >
            <span><a href="static/placeholder.html">Terms</a></span>
            <span><a href="static/placeholder.html">Privacy</a></span>
            <span><a href="static/placeholder.html">Advertise</a></span>
          </div>
        </div>
      `;

      const tools = `
      <div id="Tools-menu" class="desktop">
        <div id="previous-pg" class="unselectable">
          <span class="Tool-select hide">•</span>previous-pg
        </div>
        <div class="unselectable ${this.$container.classList.contains('nightmode') ? 'Tools-selected' : ''}" id="nightmode">
          <span class="Tool-select hide">•</span>night-mode
        </div>
      </div>
      `;

      //final template for section
      return `
        <div id="Main-container">
          ${listingHeader}
          ${tools}
          ${list}
          ${right}
          ${writer}
          ${footer}
        </div>
        `;
    };

    return buildView();
  }

  //bake html into view
  render() {
    let that = this;
    let tmp = this.generateStaticView(this.user, this.users, this.threads, this.groups);
    tmp.then(tmp => {
      $id('main').innerHTML = tmp;
      that.bind();
    });
  }
}
