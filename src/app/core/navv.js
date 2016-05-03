/**
 * navv.js is the view for the navbar and app-container
 */

import {$id, $on} from './helpers.js';
import router from '../router/router.js';
import {generateWriter, cutoff} from './template.js';

export default class View {

  //pass in top groups and user -- with username, id, notifications
	constructor(groups, user, options) {

    //get functions from options
    this.handleUpload = options.handleUpload;
    this.handleSubmit = options.handleSubmit;

		//set data
		this.groups = groups;
		this.user = user;

		//set base view data -- core to component
		this._openMenu = false;
		this._openWriter = false;
		this._hiddenWriter = false;
		this._openSearch = false;

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

		//account for references to later objects
		this.$writermount = null;
		this.$savebutton = null;
		this.$cancelbutton = null;
		this.$fileSubmit = null;
		this.$submitIcon = null;
		this.$submit = null;
		this.$group = null;
		this.$identity = null;
		this.$body = null;
		this.$link = null;
		this.$writerhead = null;

    //setup commands for view actions
		this.viewCommands = {
			openWriter: (to) => {
				this._showWriter(groups, user, this.handleUpload, this.handleSubmit, to);
			},
      showWriter: (e) => {
       	e.preventDefault();
        this._showWriter(groups, user, this.handleUpload, this.handleSubmit);
      },
      removeWriter: (e) => {
				this._unsetActiveBody();
        e.preventDefault();
        this._removeWriter();
      },
			showSearch: (e) => {
				this._setActiveBody();
        e.preventDefault();
        this._showSearch();
      },
      clearSearch: (e) => {
        e.stopPropagation();
        this._clearSearch()
      },
      hideSearch: (e) => {
				this._unsetActiveBody();
        this._hideSearch(e)
      },
      submitSearch: (e) => this._submitSearch(e),
      showMenu: (e) => {
				//use this so we can see when the writer is open as opposed to menu (desktop view stuff)
				this._setActiveBody();
				this._showMenu(user)
			},
      removeMenu: (e) => {
				this._unsetActiveBody();
				this._removeMenu()
			}
		};
	}

	//body handlers --> this is so Mobile isn't allowed to scroll while Menu items are active
	_setActiveBody(type) {
		document.body.className = `menu-active ${type ? type : ''}`;
	}

	//unset body class which prevents scroll (only on mobile)
	_unsetActiveBody() {
		document.body.className = '';
	}

	//bind all handlers --> we bind them to the 'this' context because that references the class
  bind() {

    //search
    $on(this.$search, 'click', this.viewCommands.showSearch.bind(this), false);

    //hide search on outside click
    $on(this.$searchboxBg, 'click', this.viewCommands.hideSearch.bind(this), false);

		//do nothing on touchmove
		$on(this.$searchboxBg, 'touchmove', e => e.preventDefault(), false);

		//do nothing on searchbox click
		$on(this.$searchbox, 'click', e => e.stopPropagation(), false);

    //hide search from button
    $on(this.$searchboxExit, 'click', this.viewCommands.hideSearch.bind(this), false);

    //clear search
    $on(this.$searchboxClear, 'click', this.viewCommands.clearSearch.bind(this), false);

    //keyup for search (send on enter)
    $on(this.$searchbox, 'keyup', this._handleSearch.bind(this), false);

    //show writer
    $on(this.$pencil, 'click', this.viewCommands.showWriter.bind(this), false);

    //show menu
    $on(this.$menu, 'click', this.viewCommands.showMenu.bind(this), false);
  }

	//Exposes the writer-opening action -- allowing target to be dynamically set
	openWriter(to) {

		//set target to 'to'
    this._showWriter(this.groups, this.user, this.handleUpload, this.handleSubmit, to);
	}

	//show the searchbox
	_showSearch() {

		//set search to open
		this._openSearch = true;

    //remove menu
		if (this._openMenu) this._removeMenu();

		//allows smooth scrolling to top
		const sleep = (ms = 10) => {
  		return new Promise(resolve => setTimeout(resolve, ms));
		};

		//calls the scroll-to-top action
		(async () => {
			if (window.scrollY <= 5) {
				return;
      }
			while (window.scrollY > 6) {
				var Break = -20 - window.scrollY / 5;
				window.scrollBy(0, Break);
				await sleep();
			}
		})();

		//remove hide from element's classname --> show searchbox
		this.$searchboxBg.className = '';

		//focus searchbox after opening it
		this.$searchbox.focus();
  }

	//submit search on enter key hit
  _handleSearch(e) {
    if (e.keyCode === this.ENTER_KEY) {
      //transition to search view
      //router.doSearch(e.target.value)

    }
  }

	//clears searchbox on click
  _clearSearch() {

    //clears the searchbox
    this.$searchbox.value = '';
  }

	//hide the searchbox once more
  _hideSearch(e) {

		//set unset openSearch
		this._openSearch = false;

    /*
     since we don't have an event that we can stop from propating to close form,
     we'll just cut it if the id of the click event target is the box
    */
    //if (e.target.id === 'TopNav-searchbox-box') return;

    //add hide to element's class (back to normal)
    this.$searchboxBg.className = "hide"
  }

	//show the writer box, created dynamically
  _showWriter(groups, user, handleUpload, handleSubmit, to = '') {

    //remove menu if it's open
    if (this._openMenu) this._removeMenu();

		//if writer isn't in the DOM
    if (!this._openWriter && !this._hiddenWriter) {

			//set writer to open
			this._openWriter = true;

			//stop scroll on body
			this._setActiveBody('writemode');

      //element that we'll use to get the writer
      const writerMount = document.createElement('div');

			//set new element's id
      writerMount.id = "TopNav-writer-mount";

			//generate writer from the template
			let writer = generateWriter(groups, user.usernames, to);

      //set div's contents to the above
      writerMount.innerHTML = writer;

      //append writer
      this.$nav.appendChild(writerMount);

			//set reference
			this.$writermount = writerMount;

      //set references to DOM elements generated by writer
      this.$savebutton = $id('TopNav-writer-save');
      this.$cancelbutton = $id('TopNav-writer-cancel');
      this.$fileSubmit = $id('TopNav-writer-content-submit');
			this.$submitIcon = $id('TopNav-writer-submit-icon');
      this.$submit = $id('TopNav-writer-send');
      this.$group = $id('TopNav-writer-select');
      this.$identity = $id('TopNav-writer-identity-select');
      this.$body = $id('TopNav-writer-input');
      this.$link = $id('TopNav-writer-link-box');
			this.$writerhead = $id('TopNav-writer-head');

      //handle sending the form -- slightly wrapped AJAX version
      function handleSend() {

				//no empty posts
				if (!this.$body.value.length && !this.$link.value) return;

				//set the targeted group to the full 'to' value, as opposed to the cutoff version
				const grp = this.$group.value === cutoff(to) ? to : this.$group.value;

				//send request
				handleSubmit(this.$link.value, this.$body.value, grp, this.$identity.value);

				//remove writer from view entirely
				this._removeWriter();

				//reload the location --> feels more like it's doing something IMO
				router.check();
			}

			//handle hiding the writer
			function handleHide() {
				this._hiddenWriter = true;
				writerMount.className = 'hide';
				this._unsetActiveBody();
			}

			//let ourselves know that we uploaded a file successfully
			function handleContent(e) {
				handleUpload($fileSubmit.files[0]);
				$submitIcon.className = 'icon icon-check';
			}

			//handle hover event for fullscreen writer
			function onTitleClick(e) {
				this.$writermount.classList.contains('originalWriter') ? this.$writermount.classList.remove('originalWriter'):
																																 this.$writermount.classList.add('originalWriter');
			}

      $on(this.$cancelbutton, 'click', this._removeWriter.bind(this), false);
			$on(this.$savebutton, 'click', handleHide.bind(this), false);
      $on(this.$fileSubmit, 'change', handleContent.bind(this), false);
      $on(this.$submit, 'click', handleSend.bind(this), false);
			$on(this.$writermount, 'touchmove', e => e.preventDefault(), false);
			$on(this.$writerhead, 'click', onTitleClick.bind(this), false);

    } else {
			if (this._hiddenWriter) {
				this._hiddenWriter = false;
				this._openWriter = true;
				this._setActiveBody('writemode');
				this.$writermount.className = '';
			} else {
				this._hiddenWriter = true;
				this.$writermount.className = 'hide';
				this._unsetActiveBody();
			}
    }
  }

  _removeWriter() {
		this._openWriter = false;
		this._unsetActiveBody();

    //remove writer from view
    let writer = this.$writermount;
		if (writer) writer.parentNode.removeChild(writer);
  }

	//this opens & closes menu!
  _showMenu(user) {

    //check if menu exists
    if ($id('TopNav-menu-bg')) {
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
    };

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
