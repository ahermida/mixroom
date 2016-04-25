/*
  parser.js is a function which replaces strings with markup by our particular styles

  >this would be greentext
  #this would be a title line (big text / bold)
  *bold*
  __underline__
  (post:1231231) -- ref another post (automatic on hit reply)
  @username -- mention a user by username (only)
  ~italics~
  [code]code![/code]
*/
import config from '../config.js';

//important for when considering DOM methods
const isNode = config.isNode;

//regex for bold text
const bold = /\*(\S*?)\*/g;
//regex for underline
const underline = /__(\S*?)__/g;
//regex for italics
const italics = /~(\S*?)~/g;
//regex for code
const code = /\[code](.*?)\[\/code]/g;
//regex for reference
const ref = /\(post:(\S*?)\)/g;
//regex for mentions
const mention = /@(\S*?)\s/g
//regex for getting links back into place
const links = /`l`i`n`k`/g
//regex for links ('holy grail' via Matthew O'Riordan)
const url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;

//returns html for a given body
export default function parse(body) {
  //array of links that we'll keep for later
  let matches = [];
  //set urls -- fails for javascript protocol (important) --> this way links won't be broken
  body = body.replace(url, (match, $1) => {
    matches.push(`<a class="Body-url" href="${$1}">${$1}</a>`)
    return '`l`i`n`k`';
  });

  //clean body before we even parse
  body = escapeHTML(body);

  /*remove newlines between mutiline
  body.replace(code, (match) => {
    match.indexO
  });*/

  //split by newlines
  let text = body.split(/\r\n|\r|\n/);

  //don't generate title or greentext inside of code
  let wait = false;

  //deliver styles for whole-line styles -- each newline should be a p
  for (let i = 0; i < text.length; i++) {
    let txt = text[i].trim();
    if (txt.indexOf('[code]') != -1) {
      wait = !wait;
    }

    if (txt[0] === '#' && !wait) {
      text[i] = `<p class="Body-title">${text[i]}</p>`;
    } else if (txt.indexOf('&gt;') === 0 && !wait) {
      text[i] = `<p class="Body-green">${text[i]}</p>`;
    } else {
      text[i] = `<p>${text[i]}`;
    }

    if (txt.indexOf('[/code]') != -1) {
      wait = !wait;
    }
  }

  //join into one string
  let htmlbody = text.join('');

  //get safe htmlbody before we transform any other markup
  let safe = htmlbody;

  //set bold text
  htmlbody = htmlbody.replace(bold, '<b class="Body-bold">$1</b>');

  //set underline text
  htmlbody = htmlbody.replace(underline, '<em class="Body-underline">$1</em>');

  //set underline text
  htmlbody = htmlbody.replace(italics, '<i class="Body-italics">$1</i>');

  //set underline text
  htmlbody = htmlbody.replace(code, '<code class="Body-code">$1</code>');

  //set refs
  htmlbody = htmlbody.replace(ref, '<span class="Body-ref">$1</span>');

  //set mentions
  htmlbody = htmlbody.replace(mention, '<span class="Body-mention">$1</span>');

  //set links
  htmlbody = htmlbody.replace(links, match => {
    let mat = matches.shift();
    let rematch = mat ? mat : '';
    return rematch;
  });

  //return html wrapped in parent div
  return `<div class="Body-content">${htmlbody}</div>`;
}

//precompile regex
const amp = /&/g;
const lt = /</g;
const gt = />/g;
const sq = /'/g;
const dq = /"/g;
const sl = /\//g;

//escape unhealthy characters in html -- SO ftw
function escapeHTML(html) {
  if (isNode) {

    //filter out bad chars
    return html.replace(amp, '&amp;')
               .replace(lt, '&lt;')
               .replace(gt, '&gt;')
               .replace(sq, '&#x27')
               .replace(dq, '&quot')
               .replace(sl, '&#x2F');
  } else {
    let element = document.createElement('textarea');
    element.textContent = html;
    return element.innerHTML;
  }
}
