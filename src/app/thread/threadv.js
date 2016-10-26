/**
 * groupv.js is the view for the group
 */
import { $id, $on, qs } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generatePost, generateTimestamp, generatePopularPost } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';
import {handler, default as term} from '../term.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(thread, user, actions, socket, data) {

    //set thread
    this.thread = thread;

    //unpack actions onto our class
    this.removePost = actions.removePost;
    this.editPost = actions.editPost;
    this.handleSubmit = actions.handleSubmit;
    this.handleUpload = actions.handleUpload;

    //set auth
    this.user = user;

    socket.connection.onmessage = event => {
      let message = JSON.parse(event.data).body;
      this.addPost(message);
    }

    this.popular = data.popular;

    //setup commands for view actions
    this.viewCommands = {
      reply: e => this._reply(e),
      group: e => this._goToGroup(e),
      user: e => this._goToUser(e),
      hidePost: e => this._hidePost(e),
      showPost: e => this._showPost(e),
      report: e => this._reportPost(e),
      toggleBody: e => this._toggleBody(e),
      togglePost: e => this._togglePost(e),
      peek: e => this._peek(e),
      delete: e => this._delete(e),
      scrollToPost: e => this._scrollToPost(e),
      goBack: e => this._goBack(e),
      toggleNM: e => this._toggleNM(e),
      toggleDM: e => this._toggleDM(e),
      openDirectly: e => this._openDirectly(e),
      toggleListSize: e => this._toggleListSize(e)
    };

    //save a ref to app-container (so if we need to switch nightmode we can)
    this.$container = $id('app-container');
    this.$main = $id('Main');
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $listing = $id('List');
    let $prev = $id('prevpage');
    let $popular = $id('Poplisting');
    let $writertoggle = $id('writer-toggle');
    let $writerexit = $id('writer-exit');
    let $writerhide = $id('writer-hide');
    let $writerlink = $id('writer-link-input');
    let $writerupload = $id('writer-upload-input');
    let $writersend = $id('writer-send');
    let $previouspg = $id('previous-pg');
    let $nightmode = $id('nightmode');
    let $devmode = $id('devmode');
    let $listsizetoggle = $id('List-size-switch');

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

    //might as well keep a reference to the listing because we'll be adding to it
    this.$listing = $listing;


    //clicks on listing section
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($listing, 'mousemove', this._onPostHover.bind(this), false);
    $on($popular, 'click', this._onPostClick.bind(this), false);
    $on($prev, 'click', this._back.bind(this), false);
    $on($writertoggle, 'click', this._toggleInputSize.bind(this), false);
    $on($writerhide, 'click', this._hideWriter.bind(this), false);
    $on($writerexit, 'click', this._hideWriterOptions.bind(this), false);
    $on($nightmode, 'click', this.viewCommands.toggleNM.bind(this), false);
    $on($devmode, 'click', this.viewCommands.toggleDM.bind(this), false);
    $on($previouspg, 'click', this.viewCommands.goBack.bind(this), false);
    $on($writerlink, 'keyup', this._handleWriterLink.bind(this), false);
    $on($writerupload, 'change', this._writerUpload.bind(this), false);
    $on($writersend, 'click', this._writerSend.bind(this), false);
    $on($listsizetoggle, 'change', this._toggleListSize.bind(this), false);
  }

  _toggleListSize(e) {
    $id('Main-container').classList.toggle('threadenlarge');
    e.stopPropagation();
  }

  _goBack(e) {
    router.back();
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
    let to = 'this thread';

    //check if they're posting with content
    if (!this.$writerinput.value) {
      return;
    }

    this.handleSubmit(this.$writerlink.value, this.$writerinput.value, to, this.$writerusername.value);
    this.$writer.classList.toggle('fly');
    if (this.$writer.classList.contains('Writer-fs')) this.$writer.classList.toggle('Writer-fs');
    if (document.body.classList.contains('menu-active')) document.body.classList.toggle('menu-active');
    if (document.body.classList.contains('writemode')) document.body.classList.toggle('writemode');
    setTimeout(() => this.$writer.classList.toggle('hide'), 200);
    setTimeout(() => this.$writer.classList.remove('fly'), 600);

    //clear out input
    this.$writerinput.value = '';
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

  _delete(e) {
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

  _scrollToPost(e) {
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

  _cancelDelete() {
    //only one deleteable at a time
    let pending = $id('delete-pending');
    if (pending) {
      pending.innerHTML = 'delete';
      pending.id = '';
    }
  }

  _back() {
    router.back();
  }

  _prevPage(e) {
    if (page <= 1) router.navigate(this.group);
    router.navigate(`${this.group}${--page}`);
  }

  _nextPage(e) {
    router.navigate(`${this.group}${++page}`);
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
    console.log('peek');

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

    console.log(isInView);

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
    newPost.style.left = `${targetDimensions.left + window.scrollX + 92}px`;
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
    router.navigate(`${this.group}t/${e.target.parentNode.dataset.thread}`);
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

  //generate html
  generateStaticView(thread) {
    const getposts = async () => {
      let promises = thread.posts.map(post => generatePost(thread.group, post, this.user));
      let results = await Promise.all(promises);
      return results.join('');
    };

    const getpopularposts = async () => {
      let promises = this.popular.map(post => generatePopularPost(post, this.user));
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
       <a class="Main-Footer-btn mobile" id="prevpage" href="javascript:;">back</a>
      </div>
      `;
      console.log(this.thread);
      //desktop view information about groups --> allows group navigation
      const threadInfo = `
        <div id="Main-desktop-info" class="desktop">
          <div class="GroupAuthor">
            <p class="GroupAuthor-title">Made by:</p>
            <p id="Main-desktop-author" class="GroupAuthor-name">${this.thread.posts[0].author}</p>
          </div>
          <div class="ThreadCreated">
            <p>Created:</p>
            <p>${generateTimestamp(this.thread.created)}</p>
          </div>
          <div class="ThreadNav">
            <a class="Main-Footer-btn" href="http://${location.host}${this.thread.group}">back</a>
            <a class="Main-Footer-btn" href="http://${location.host}${this.thread.group}">next</a>
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

      const tools = `
      <div id="Tools-menu" class="desktop">
        <div id="previous-pg" class="unselectable">
          <span class="Tool-select hide">•</span>previous-pg
        </div>
        <div class="unselectable ${this.$container.classList.contains('nightmode') ? 'Tools-selected' : ''}" id="nightmode">
          <span class="Tool-select hide">•</span>night-mode
        </div>
        <div id="devmode" class="unselectable ${this.$container.classList.contains('devmode') ? 'Tools-selected' : ''}">
          <span class="Tool-select hide">•</span>developers
        </div>
      </div>
      `;

      //user object
      const user = this.user.user;

      //writer for sending posts in desktop mode
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
          <div id="Main-listing-header" class="desktop unselectable">
            <div class="Main-listing-group unselectable">Thread Posts
            <label id="List-size-switch" class="rb-switcher">
              <input type="checkbox">
              <i></i>
            </label></div>
          </div>
          `;

      //final template for section
      return `
        <div id="Main-container">
          ${header}
          ${popularInfo}
          ${listingHeader}
          ${writer}
          ${tools}
          ${list}
          ${footer}
        </div>
        `;
    };

    return buildView();
  }

  //add post to view
  addPost(post) {
    //get the embedded json
    let message = JSON.parse(post);

    //generate post and add it
    let genPostAddIt = async () => {
      let div = document.createElement('div');
      div.innerHTML = await generatePost(this.thread.group, message, this.user);
      this.$listing.appendChild(div);
    };

    //actually generate the post and add it to the DOM
    genPostAddIt();

    //update replies to posts that affect us
    this.addReplies(message.responseTo);
  }

  //increment number of replies post has and
  addReplies(postIds) {
    postIds.forEach(postId => {
      let post = qs(`[id='${postId}'] span.Footer-left-size`);
      ++post.innerHTML;
    });
  }

  //bake html into view
  render() {
    let that = this;
    let tmp = this.generateStaticView(this.thread);
    tmp.then(tmp => {
      $id('main').innerHTML = tmp;
      that.bind();
    });
  }
}
