/**
 * navv.js is the view for the navbar and app-container
 */

import {$id, $on, getContext} from './helpers.js';
//import router from 'router.js';

export default class View {

  //pass in top groups and user -- with username, id, notifications
	constructor(groups, user, options) {

    //get functions from options
    this.handleUpload = options.handleUpload;
    this.handleSubmit = options.handleSubmit;

    //event.keyCode code for enter is 13
    const ENTER_KEY = 13;

    //get a reference to DOM elements we need
    this.$nav = $id('navbar');
    this.$pencil = $id('TopNav-post');
    this.$search = $id('TopNav-search');
    this.$menu = $id('TopNav-menu');
    this.$menuicon = $id('TopNav-menu-icon');
    this.$searchbox = $id('TopNav-searchbox-box');
    this.$searchboxBg = $id('TopNav-searchbox-bg');
    this.$searchboxExit = $id('TopNav-searchbox-exit');
    this.$searchboxClear = $id('TopNav-searchbox-clear');

		//body handlers
		const setActiveBody = () => {
			document.body.className = 'menu-active';
		};

		const unsetActiveBody = () => {
			document.body.className = '';
		};

    //setup commands for view actions
		this.viewCommands = {
      showWriter: (e) => {
        e.preventDefault();
        this._showWriter(groups, user, this.handleUpload, this.handleSubmit);
      },
      removeWriter: (e) => {
				unsetActiveBody();
        e.preventDefault();
        this._removeWriter();
				document.body.className = '';
      },
			showSearch: (e) => {
				setActiveBody();
        e.preventDefault();
        this._showSearch();
      },
      clearSearch: (e) => {
        e.stopPropagation();
        this._clearSearch()
      },
      hideSearch: (e) => {
				unsetActiveBody();
        this._hideSearch(e)
      },
      submitSearch: (e) => this._submitSearch(e),
      showMenu: (e) => {
				setActiveBody();
				this._showMenu(user)
			},
      removeMenu: (e) => {
				unsetActiveBody();
				this._removeMenu()
			}
		};
	}

  bind() {

    //search
    $on(this.$search, 'click', this.viewCommands.showSearch, false);

    //hide search on outside click
    $on(this.$searchboxBg, 'click', this.viewCommands.hideSearch, false);

		//do nothing on touchmove
		$on(this.$searchboxBg, 'touchmove', e => e.preventDefault(), false);

		//hide search on outside click
		$on(this.$searchbox, 'click', e => e.stopPropagation(), false);

    //hide search from button
    $on(this.$searchboxExit, 'click', this.viewCommands.hideSearch, false);

    //clear search
    $on(this.$searchboxClear, 'click', this.viewCommands.clearSearch, false);

    //keyup for search (send on enter)
    $on(this.$searchbox, 'keyup', this._handleSearch, false);

    //show writer
    $on(this.$pencil, 'click', this.viewCommands.showWriter, false);

    //show menu
    $on(this.$menu, 'click', this.viewCommands.showMenu, false);
  }

	_showSearch() {
    //remove menu
    this._removeMenu();

		const sleep = (ms = 10) => {
  		return new Promise(resolve => setTimeout(resolve, ms));
		};

		const scrollTop = async () => {
			if (window.scrollY <= 5) {
				return;
      }
			while (window.scrollY > 6) {
				var Break = -20 - window.scrollY / 5;
				window.scrollBy(0, Break);
				await sleep();
			}
			return true;
		};

		scrollTop()
			//remove hide from element's classname
			this.$searchboxBg.className = '';
			this.$searchbox.className = 'stay';
			this.$searchbox.focus();
  }

  _submitSearch(e) {
    if (e.keyCode === ENTER_KEY) {
      //transition to search view
      //router.doSearch(e.target.value)
    }
  }

  _clearSearch() {
    //clears the searchbox
    this.$searchbox.value = '';
  }

  _hideSearch(e) {
    /*
     since we don't have an event that we can stop from propating to close form,
     we'll just cut it if the id of the click event target is the box
    */
    if (e.target.id === 'TopNav-searchbox-box') return;
    //add hide to element's classiuhiuasd
    this.$searchboxBg.className = "hide"
  }

  _showWriter(groups, user, handleUpload, handleSubmit) {
    //remove menu
    this._removeMenu();
		const wm = $id("TopNav-writer-mount")
    if (!wm) {
			//stop scroll on body
			document.body.className = 'menu-active';

      //element that we'll use to get the writer
      const writerMount = document.createElement('div');
      writerMount.id = "TopNav-writer-mount";

      const getTopOptions = (groups) => {
        return groups.map((grp) => `<option>${grp}</option>`).join(" ");
      };

      const getUsernames = (usernames) => {
        return usernames.map((username) => `<option>${username}</option>`).join(" ");
      };

      //show post submission form
      const writer = `
        <div id="TopNav-writer-top">
          <span id="TopNav-writer-save" class="icon icon-left-open-big"></span>
          <span id="TopNav-writer-head">new post</span>
          <span id="TopNav-writer-cancel" class="icon icon-cancel"></span>
        </div>
        <div id="TopNav-writer-link">
          <input placeholder="submit a link (or don't)" id="TopNav-writer-link-box"/>
          <span id="TopNav-writer-content">
            <label id="TopNav-writer-submit-label" for="TopNav-writer-content-submit">
              <span id="TopNav-writer-submit-icon" class="icon icon-camera"></span>
							<input id="TopNav-writer-content-submit" type="file"/>
            </label>
          </span>
        </div>
        <div id="TopNav-writer-main">
          <textarea id="TopNav-writer-input" placeholder="Write something here"></textarea>
        </div>
        <div id="TopNav-writer-identity">
          <span>posting as</span>
          <select id="TopNav-writer-identity-select"><option>Anonymous</option>${getUsernames(user.usernames)}</select></span>
        </div>
        <div id="TopNav-writer-foot">
          <span id="TopNav-writer-group">Posting to:
            <select id="TopNav-writer-select"><option>${getContext()}</option>${getTopOptions(groups)}</select></span>
          <span id="TopNav-writer-send">send</span>
        </div>
      `;

      //set div's contents to the above
      writerMount.innerHTML = writer;

      //append writer
      this.$nav.appendChild(writerMount);

      //gonna want to add events to it as well here
      let $savebutton = $id('TopNav-writer-save');
      let $cancelbutton = $id('TopNav-writer-cancel');
      let $fileSubmit = $id('TopNav-writer-content-submit');
			let $submitIcon = $id('TopNav-writer-submit-icon');
      let $submit = $id('TopNav-writer-send');
      let $group = $id('TopNav-writer-select');
      let $identity = $id('TopNav-writer-identity-select');
      let $body = $id('TopNav-writer-input');
      let $link = $id('TopNav-writer-link-box');

      //handle sending the form
      const handleSend = () => handleSubmit($link.value, $body.value, $group.value, $identity.value);
			const handleHide = () => {
				writerMount.className = "hide";
				document.body.className = "";
			}

			function handleContent(e) {
				this.handleUpload($fileSubmit.files[0]);
				$submitIcon.className = 'icon icon-check';
			}

			this.handleUpload = handleUpload;

			handleContent = handleContent.bind(this);

      $on($cancelbutton, 'click', this._removeWriter, false);
			$on($savebutton, 'click', handleHide, false);
      $on($fileSubmit, 'change', handleContent, false);
      $on($submit, 'click', handleSend, false);
			$on(writerMount, 'touchmove', e => e.preventDefault(), false);

    } else {
			wm.className = ""
    }
  }

  _removeWriter() {
		document.body.className = '';
    //remove writer from view
    let writer = $id('TopNav-writer-mount');
    writer.parentNode.removeChild(writer);
  }

  _showMenu(user) {
    //check if menu exists
    if ($id("TopNav-menu-bg")) {
      this.$menuicon.className = "icon icon-menu";
      this._removeMenu();
      return;
    }

    //set color of menu button and add menu
    //element that we'll use to get the menu
    const menuMount = document.createElement('nav');
    menuMount.id = "TopNav-menu-bg";

    this.$menuicon.className = "icon icon-menu active";

    //get template for either user logged in or not logged in
    const getUserMenu = (user) => {
      if (user.anonymous) {
          return `
          <li id="TopNav-menu-signup" class="TopNav-menu-dropdown-row ddtop">
            <span id="dd-icon-signup" class="icon icon-book ddicon">
            </span>
            <span class="ddtext">Signup for an account</span>
          </li>
          <li id="TopNav-menu-login" class="TopNav-menu-dropdown-row">
            <span id="dd-icon-login" class="icon icon-book-open ddicon">
            </span>
            <span class="ddtext">Log in to your account</span>
          </li>`;
        } else {
          return`
          <li id="TopNav-menu-username" class="TopNav-menu-dropdown-row ddtop">
            <span id="dd-icon-user" class="icon icon-cog ddicon">
            </span>
            <span class="ddtext">${user.username}</span>
          </li>
					<span id="TopNav-dropdown-logout">logout</span>
					`;
        }
    }

    //show menu -- submenu simply has class hide
    const menu = `
      <ul id="TopNav-menu-list" class="dropdown">
				${getUserMenu(user)}
        <li id="TopNav-menu-about" class="TopNav-menu-dropdown-row">
          <span id="dd-icon-about" class="icon icon-info ddicon"></span>
          <span class="ddtext">About</span>
        </li>
        <li id="TopNav-menu-privacy" class="TopNav-menu-dropdown-row">
          <span id="dd-icon-privacy" class="icon icon-chat ddicon"></span>
          <span class="ddtext">Privacy</span>
        </li>
				<li id="TopNav-menu-secret" class="TopNav-menu-dropdown-row">
					<span id="dd-icon-secret" class="icon icon-comment ddicon"></span>
					<span class="ddtext">Secret Menu</span>
					<span id="TopNav-dropdown-down" class="icon icon-down-open-big"></span>
				</li>
				<ul id="TopNav-menu-secretmenu" class="dropdown hide">
					<li id="TopNav-menu-faq" class="TopNav-menu-dropdown-row ddnested">
						<span id="dd-icon-faq" class="icon icon-help ddicon">
						</span>
						<span class="ddtext">How do I use this?</span>
					</li>
					<li id="TopNav-menu-dragons" class="TopNav-menu-dropdown-row ddnested">
						<span id="dd-icon-dragons" class="icon icon-plus-squared ddicon">
						</span>
						<span class="ddtext">Dragon or Wyvern?</span>
					</li>
				</ul>
        <li id="TopNav-menu-relevant" class="TopNav-menu-dropdown-row">
          <span id="dd-icon-relevant" class="icon icon-check ddicon"></span>
          <span class="ddtext">Rules for Posting</span>
        </li>
      </ul>
    `;

    //set div's contents to the above
    menuMount.innerHTML = menu;

    //append menu
    this.$nav.appendChild(menuMount);

    //get important dom elements
    let $dropdownBg = $id('TopNav-menu-bg');
    let $dropdown = $id('TopNav-menu-list');
    let $down = $id('TopNav-dropdown-down');
    let $secret = $id('TopNav-menu-secretmenu');

    //handle dropdown click
    const handleDropdown = (e) => {
      e.stopPropagation();
      const el = e.target.id ? e.target.id : e.target.parentNode.id;
      switch (el) {
        case 'TopNav-menu-about':
          console.log('About Hit');
          break;
        case 'TopNav-menu-username':
          console.log('Hit username');
          break;
        case 'TopNav-menu-signup':
          console.log('Hit signup');
          break;
        case 'TopNav-menu-login':
          console.log('Hit login');
          break;
        case 'TopNav-menu-faq':
          console.log('Hit faq');
          break;
				case 'TopNav-dropdown-down':
				case 'TopNav-menu-secret':
					console.log('Hit Secret');
					const hidden = $secret.className === "dropdown hide";
					hidden ? $secret.className = "dropdown" : $secret.className = "dropdown hide";
					hidden ? $down.className = "icon icon-up-open-big" : $down.className = "icon icon-down-open-big";
					break;
        case 'TopNav-menu-dragons':
          console.log('Hit dragons');
          break;
        case 'TopNav-menu-privacy':
          console.log('Hit privacy');
          break;
        case 'TopNav-menu-relevant':
          console.log('Hit relevant')
          break;
      }
    };

    //bind events here
    $on($dropdown, 'click', handleDropdown, false);
    $on($dropdownBg, 'click', this._removeMenu, false);
		$on($dropdownBg, 'touchmove', e => e.preventDefault(), false);
  }

  _removeMenu() {
    //unset color of menu button & remove menu
    let menu = $id('TopNav-menu-bg');
    if (menu) {
      //get $menuicon which is here too deep to reference by class
			document.body.className = '';
      let $menuicon = $id('TopNav-menu-icon');
      $menuicon.className = "icon icon-menu";
      menu.className = "";
      menu.parentNode.removeChild(menu);
    }
  }

}
