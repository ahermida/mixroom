/*
 * xterm.js addons condensed into a single file
 */
import xterm from 'xterm';

xterm.prototype.toggleFullscreen = function (fullscreen) {
  var fn;
  if (typeof fullscreen == 'undefined') {
    fn = (this.element.classList.contains('fullscreen')) ? 'remove' : 'add';
  } else if (!fullscreen) {
    fn = 'remove';
  } else {
    fn = 'add';
  }
  this.element.classList[fn]('fullscreen');
};

let proposeGeometry = function (term) {
  var parentElementStyle = window.getComputedStyle(term.element.parentElement),
      parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height')),
      parentElementWidth = parseInt(parentElementStyle.getPropertyValue('width')),
      elementStyle = window.getComputedStyle(term.element),
      elementPaddingVer = parseInt(elementStyle.getPropertyValue('padding-top')) + parseInt(elementStyle.getPropertyValue('padding-bottom')),
      elementPaddingHor = parseInt(elementStyle.getPropertyValue('padding-right')) + parseInt(elementStyle.getPropertyValue('padding-left')),
      availableHeight = parentElementHeight - elementPaddingVer,
      availableWidth = parentElementWidth - elementPaddingHor,
      container = term.rowContainer,
      subjectRow = term.rowContainer.firstElementChild,
      contentBuffer = subjectRow.innerHTML,
      characterHeight,
      rows,
      characterWidth,
      cols,
      geometry;

  subjectRow.style.display = 'inline';
  subjectRow.innerHTML = 'W'; // Common character for measuring width, although on monospace
  characterWidth = subjectRow.getBoundingClientRect().width;
  subjectRow.style.display = ''; // Revert style before calculating height, since they differ.
  characterHeight = parseInt(subjectRow.offsetHeight);
  subjectRow.innerHTML = contentBuffer;

  rows = parseInt(availableHeight / characterHeight);
  cols = parseInt(availableWidth / characterWidth) - 1;

  geometry = {cols: cols, rows: rows};
  return geometry;
};

let fit = function (term) {
    var geometry = proposeGeometry(term);

    term.resize(geometry.cols, geometry.rows);
};

xterm.prototype.proposeGeometry = function () {
  return proposeGeometry(this);
};

xterm.prototype.fit = function () {
  return fit(this);
};

export function handler(terminal) {
  if (terminal._initialized) {
    return;
  }

  terminal._initialized = true;

  var shellprompt = '$ ';

  terminal.prompt = function () {
    terminal.write('\r\n' + shellprompt);
  };

  terminal.writeln('Welcome to Mixroom');
  terminal.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
  terminal.writeln('Type some keys and commands to play around.');
  terminal.writeln('');
  terminal.prompt();

  terminal.on('key', function (key, ev) {
    var printable = (
      !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
    );

    if (ev.keyCode == 13) {
      terminal.prompt();
    } else if (ev.keyCode == 8) {
     // Do not delete the prompt
      if (terminal.x > 2) {
        terminal.write('\b \b');
      }
    } else if (printable) {
      terminal.write(key);
    }
  });

  terminal.on('paste', function (data, ev) {
    terminal.write(data);
  });
}
const term = new xterm();
window.term = term;

export default term;
