/**
 * Writer class
 */

import {handleUpload, handleSubmit} from '../core/core.js';
import {$id, $on} from '../core/helpers.js';

export default class Writer {
  constructor(isThread, usernames, group) {
    this.isThread = isThread;
    this.usernames = usernames;
    this.group = group
  }
  bind() {
    //get refs
    let $writertoggle = $id('writer-toggle');
    let $writerexit = $id('writer-exit');
    let $writerhide = $id('writer-hide');
    let $writerlink = $id('writer-link-input');
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

    //apply event listeners
    $on($writertoggle, 'click', this._toggleInputSize.bind(this), false);
    $on($writerhide, 'click', this._hideWriter.bind(this), false);
    $on($writerexit, 'click', this._hideWriterOptions.bind(this), false);
    $on($writerlink, 'keyup', this._handleWriterLink.bind(this), false);
    $on($writerupload, 'change', this._writerUpload.bind(this), false);
    $on($writersend, 'click', this._send.bind(this), false);
  }
  _toggleInputSize(e) {
    e.target.parentNode.classList.toggle('Writer-fs');
    e.target.parentNode.classList.contains('Writer-fs') ? e.target.textContent = '–' : e.target.textContent = '+';
    $id('writer-input').focus();
  }
  _writerUpload(e) {
    let res = handleUpload(this.$writerupload.files[0]);
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

  _send(e) {
    this.isThread ? this._sendToThread(e) : this._sendToGroup(e);
  }

  _sendToGroup(e) {
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

    handleSubmit(this.$writerlink.value, this.$writerinput.value, to, this.$writerusername.value);
    this.$writer.classList.toggle('fly');
    if (this.$writer.classList.contains('Writer-fs')) this.$writer.classList.toggle('Writer-fs');
    document.body.classList.toggle('menu-active');
    document.body.classList.toggle('writemode');

    setTimeout(() => this.$writer.classList.remove('fly'), 600);
  }

  _sendToThread(e) {
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

  generateStaticView() {
    return `
      <div id="writer" data-to="local" class="desktop hide">
        <textarea placeholder="..." id="writer-input"></textarea>
        <div id="writer-label">new post</div>
        <div id="writer-exit" class="unselectable">^</div>
        <div id="writer-options" class="desktop hide">
          <div id="writer-link" class="writer-option"><input id="writer-link-input" placeholder="Share a link..."></div>
          <div id="writer-username" class="writer-option">posting as
            <select id="writer-username-option">
              <option>Anonymous</option>
              ${this.usernames.map(username => `<option>${username}</option>`)}
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
  }
}
