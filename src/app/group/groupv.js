/**
 * groupv.js is the view for the group
 */
import { $id, $on } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generateHeadPost, generatePopularPost, generateTimestamp } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';
import {handler, default as term} from '../term.js';

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

    //infinite scroll
    this.infiniteScroll = false;

    //loading more
    this.loadingMore = false;

    //if we can load more
    this.doneLoading = false;

    //scroll function reference
    this.scrollFunc = null;

    //set target post
    this.postTarget = '';

    //utility functions for thread operations
    this.getGroup = options.getGroup;
    this.saveThread = options.saveThread;
    this.unsaveThread = options.unsaveThread;
    this.deleteThread = options.deleteThread;
    this.handleSubmit = options.handleSubmit;
    this.handleUpload = options.handleUpload;

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
      savePost: (e) => this._savePost(e),
      report: (e) => this._reportPost(e),
      toggleBody: (e) => this._toggleBody(e),
      nextPage: (e) => this._nextPage(e),
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
    let $listing = $id('List');
    let $prev = $id('prevpage');
    let $next = $id('nextpage');
    let $author = $id('Main-desktop-author');
    let $popular = $id('Poplisting');
    let $writertoggle = $id('writer-toggle');
    let $writerexit = $id('writer-exit');
    let $writerhide = $id('writer-hide');
    let $writerlink = $id('writer-link-input');
    let $loadmore = $id('load-more');
    let $nightmode = $id('nightmode');
    let $devmode = $id('devmode');
    let $writerupload = $id('writer-upload-input');
    let $writersend = $id('writer-send');

    //save a ref to writer & to options of it
    this.$writer = $id('writer');
    this.$writeroptions = $id('writer-options');
    this.$writercontent = $id('writer-upload-text');
    this.$writerinput = $id('writer-input'); //body
    this.$writerusername = $id('writer-username-option'); //anon or name
    this.$writerlink = $id('writer-link-input'); //link
    this.$writerlabel = $id('writer-label');
    this.$writerupload = $writerupload;
    this.$writerexit = $writerexit;



    //clicks on listing sections --> reuses _onPostClick for convenience
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($popular, 'click', this._onPostClick.bind(this), false);
    $on($loadmore, 'click', this._toggleLoadMore.bind(this), false);
    $on($writertoggle, 'click', this._toggleInputSize.bind(this), false);
    $on($writerhide, 'click', this._hideWriter.bind(this), false);
    $on($writerexit, 'click', this._hideWriterOptions.bind(this), false);
    $on($nightmode, 'click', this.viewCommands.toggleNM.bind(this), false);
    $on($devmode, 'click', this.viewCommands.toggleDM.bind(this), false);
    $on($writerlink, 'keyup', this._handleWriterLink.bind(this), false);
    $on($writerupload, 'change', this._writerUpload.bind(this), false);
    $on($writersend, 'click', this._writerSend.bind(this), false);

    //set up handlers for pagination
    if ($prev) $on($prev, 'click', this.viewCommands.prevPage.bind(this), false);
    if ($next) $on($next, 'click', this.viewCommands.nextPage.bind(this), false);
  }

  _writerUpload(e) {
    let res = this.handleUpload(this.$writerupload.files[0]);
    res.then(success => {
      if (success) {
        this.$writercontent.textContent = 'done';
        return;
      }

      this.$writercontent.textContent = 'failed';

      window.setTimeout(() => {
        this.$writercontent.textContent = 'upload';
      }, 3000);
    });
  }

  _writerSend(e) {
    //(link = '', body, to, identity = 'Anonymous') params
    let to;

    //for this function i'm just gonna grab the necessary items from the dom
    if (this.$writer.dataset.to === 'local') {
      to = this.group;
    } else {
      to = this.$writer.dataset.to;
    }

    //check if they're posting with content
    if (!this.$writerinput.value) {
      return;
    }

    this.handleSubmit(this.$writerlink.value, this.$writerinput.value, to, this.$writerusername.value);
    this.$writer.classList.toggle('fly');
    if (this.$writer.classList.contains('Writer-fs')) this.$writer.classList.toggle('Writer-fs');
    document.body.classList.toggle('menu-active');
    document.body.classList.toggle('writemode');

    setTimeout(() => this.$writer.classList.remove('fly'), 600);
  }

  _hideWriter(e) {
    this.$writer.classList.toggle('hide');
    this.$writeroptions.classList.toggle('hide');
    this.$writerexit.classList.toggle('flip');
    this.$writerexit.classList.toggle('writer-selected');
    if (this.$writer.classList.contains('Writer-fs')) {
      this.$writer.classList.toggle('Writer-fs');
      $id('writer-toggle').textContent = '+';
    }
    document.body.classList.toggle('menu-active');
    document.body.classList.toggle('writemode');
  }

  _hideWriterOptions(e) {
    e.target.classList.toggle('writer-selected');
    e.target.classList.toggle('flip');
    this.$writeroptions.classList.toggle('hide');
    if (!this.$writeroptions.classList.contains('hide')){
      $id('writer-link-input').focus();
    }
  }

  _handleWriterLink(e) {
    if (e.keyCode === 13) {
      this.$writeroptions.classList.toggle('hide');
      let exit = $id('writer-exit')
      exit.classList.toggle('flip');
      exit.classList.toggle('writer-selected');
    }
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

  _toggleNM(e) {
    this.$container.classList.toggle('nightmode');
    e.target.classList.toggle('Tools-selected');
  }

  _toggleDM(e) {
    this.$container.classList.toggle('devmode');
    e.target.classList.toggle('Tools-selected');
    let termMount = $id('term');

    //if there's no terminal mounted, mount it.
    if (!termMount.firstChild) {
      term.open($id('term'));
      handler(term);
    }

    if (this.$container.classList.contains('devmode')) {
      term.fit();

    }
  }

  _toggleInputSize(e) {
    e.target.parentNode.classList.toggle('Writer-fs');
    e.target.parentNode.classList.contains('Writer-fs') ? e.target.textContent = '–' : e.target.textContent = '+';
    $id('writer-input').focus();
  }

  _toggleLoadMore(e) {

    //show little dot for a clicked option
    e.target.classList.toggle('Tools-selected');

    //hide next button
    document.getElementById('nextpage').classList.toggle('hide');
    if (this.infiniteScroll) {
      this.infiniteScroll = false;
      document.removeEventListener('scroll', this.scrollFunc, false);
    } else {
      this.scrollFunc = this._handleScroll.bind(this);
      this.infiniteScroll = true;
      $on(document, 'scroll', this.scrollFunc, false);
    }
  }

  _handleScroll(e) {
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    if (!this.doneLoading && window.pageYOffset >= (height * .6 + 100 * this.page) && !this.loadingMore) {
      this._addMore(this.user, this.group, ++this.page);
      this.loadingMore = true;
      //give it a second to load more
      setTimeout(() => this.loadingMore = false, 1000);
    }
  }

  _addMore(user, group, page) {

    const getposts = async () => {
      let res = await this.getGroup(group, page);
      let jres = await res.json();
      if (!jres.threads || jres.threads.length != 30) {

        //if there are less threads than there should be, we just stop endless scroll
        this.loadingMore = true;
        this.doneLoading = true;
      }
      let promises = jres.threads.map(thread => generateHeadPost(thread, user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    //wrapper for listing
    const addThem = async () => {
      let list = await getposts(page);
      let nextPage = document.createElement('div');
      nextPage.innerHTML = list;
      document.getElementById('List').appendChild(nextPage);
    }

    //put the new posts in the dom
    addThem();

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

  _prevPage(e) {
    if (this.page <= 1) return router.navigate(this.group);
    router.navigate(`${this.group}${--this.page}`);
    console.log(this.page);
    window.scrollTo(0, 0);
  }

  _nextPage(e) {
    router.navigate(`${this.group}${++this.page}`);
    window.scrollTo(0, 0);
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
      case 'post-link':
      //opens thread
      this.viewCommands.openDirectly(e);
      default:
      this._cancelDelete(e);
    }
  }

  //reply to post
  _reply(e) {
    nav.openWriter(e.target.parentNode.dataset.thread);
    this.$writerlabel.textContent = "new post to thread";
    this.$writer.dataset.to = e.target.parentNode.dataset.thread;
    this.$writer.classList.remove('Writer-fs');
  }

  //open thread
  _open(e) {
    nav.removeWriter();
    router.navigate(`${this.group}t/${e.target.parentNode.dataset.thread}`);
  }

  //open thread directly from element's thread id
  _openDirectly(e) {
    nav.removeWriter();
    router.navigate(`${e.target.dataset.group}t/${e.target.dataset.thread}`);
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
    console.log(e.target);
    e.target.style.maxHeight = e.target.style.maxHeight === '500px' ? 'none' : '500px';
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

      //pagination controls
      const footer = `
      <div class="Main-Footer">
      ${this.page > 0 ? '<a class="Main-Footer-btn" id="prevpage" href="javascript:;">prev</a>' : ''}
      ${this.threads.length === 30 ? '<a class="Main-Footer-btn" id="nextpage" href="javascript:;">next</a>' : ''}
      </div>
      `;

      //desktop view information about groups --> allows group navigation
      const groupInfo = `
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
            <input id="GroupNav-input" placeholder="Go to group...">
          </div>
        </div>
      `;

      //desktop view information --> popular posts and stuff like that
      const popularInfo = `
        <div id="Poplisting" class="desktop">
          <div class="PopularList">
            <span id="Poplisting-title">
              Popular Today
            </span>
            <span id="Poplisting-title-label">replies</span>
            ${await getpopularposts()}
          </div>
          <div class="Mixroom-info" >
            <span><a href="static/placeholder.html">Terms</a></span>
            <span><a href="static/placeholder.html">Privacy</a></span>
            <span><a href="static/placeholder.html">Advertise</a></span>
          </div>
        </div>
      `;

      const listingHeader = `
      <div id="Main-listing-header" class="desktop">
        <div class="Main-listing-group">Recent Posts ${this.page > 0 ? `<span id="Main-listing-pg">[page ${this.page + 1}]</span>` : ''}</div>
      </div>
      `;

      const tools = `
      <div id="Tools-menu" class="desktop">
        <div id="load-more" class="unselectable">
          <span class="Tool-select hide">•</span>infinite-scroll
        </div>
        <div class="unselectable ${this.$container.classList.contains('nightmode') ? 'Tools-selected' : ''}" id="nightmode">
          <span class="Tool-select hide">•</span>night-mode
        </div>
        <div id="devmode" class="unselectable ${this.$container.classList.contains('devmode') ? 'Tools-selected' : ''}">
          <span class="Tool-select hide">•</span>developers
        </div>
      </div>
      `;

      //final template for section
      return `
        <div id="Main-container">
          ${header}
          ${listingHeader}
          ${popularInfo}
          ${tools}
          ${list}
          ${footer}
          ${writer}
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
