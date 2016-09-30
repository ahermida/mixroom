/**
 * groupv.js is the view for the group
 */
import { $id, $on, qs } from '../core/helpers.js';
import oembed from '../core/oembed.js';
import { generatePost, generateTimestamp } from '../core/template.js';
import { nav } from '../core/core.js';
import router from '../router/router.js';

//view for posts & threads
export default class View {

   //pass in top groups and user -- with username, id, notifications
 	constructor(thread, user, actions, socket) {

    //set thread
    this.thread = thread;

    //unpack actions onto our class
    this.removePost = actions.removePost;
    this.editPost = actions.editPost;

    //set auth
    this.user = user;

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
      scrollToPost: e => this._scrollToPost(e)
 		};

    socket.connection.onmessage = event => {
      let message = JSON.parse(event.data).body;
      this.addPost(message);
    }
 	}

  //binds events --> mostly delegated events up in here
  bind() {

    //get references (as elements are dynamically rendered)
    let $listing = $id('List');
    let $prev = $id('prevpage');

    //might as well keep a reference to the listing because we'll be adding to it
    this.$listing = $listing;

    //clicks on listing section
    $on($listing, 'click', this._onPostClick.bind(this), false);
    $on($listing, 'mousemove', this._onPostHover.bind(this), false);
    $on($prev, 'click', this._back.bind(this), false);
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
      case 'ref':
      //scroll to id of post
      this.viewCommands.scrollToPost(e);
      default:
      this._cancelDelete(e);
    }
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
    nav.openWriterRef(e.target.parentNode.dataset.post);
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

    const buildView = async () => {
      //main header
      const header = `
        <div id="Main-Header">

        </div>
      `;
      //wrapper for listing
      const list = `
      <div id="List" class="List Thread">
      ${await getposts()}
      </div>
      `;

      //pagination controls
      const footer = `
      <div class="Main-Footer">
       <a class="Main-Footer-btn" id="prevpage" href="javascript:;">back</a>
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
      const threadRight = `
        <div id="Main-desktop-thread" class="desktop">
          <div class="PopularList">
            <span id="Main-desktop-title">
              <span id="Main-desktop-title-text">Popular</span>
            </span>
          </div>
        </div>
      `;

      //final template for section
      return `
        <div id="Main-container">
          ${header}
          ${threadInfo}
          ${threadRight}
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
