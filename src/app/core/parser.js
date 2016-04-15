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

//returns html for a given body
export default function parse(body) {

  //clean body before we even parse
  body = escapeHTML(body);

  //split by newlines
  let text = body.split(/\r\n|\r|\n/);

  //deliver styles for whole-line styles -- each newline should be a div
  for (let i = 0; i < text.length; i++) {
    if (text[i].trim()[0] === '#') {
      text[i] = `<div class="Body-title">${text[i]}</div>`;
    } else if (text[i].trim()[0] === '>'){
      text[i] = `<div class="Body-green">${text[i]}</div>`;
    } else {
      text[i] = `<div class="Body-normal">${text[i]}</div>`;
    }
  }

  //join into one string
  let htmlbody = text.join('');

  //get safe htmlbody before we transform any other markup
  let safe = htmlbody;

  //set bold text
  htmlbody = htmlbody.replace(bold, '<span class="Body-bold">$1</span>');

  //set underline text
  htmlbody = htmlbody.replace(underline, '<span class="Body-underline">$1</span>');

  //set underline text
  htmlbody = htmlbody.replace(italics, '<span class="Body-italics">$1</span>');

  //set underline text
  htmlbody = htmlbody.replace(code, '<span class="Body-code">$1</span>');

  //set refs
  htmlbody = htmlbody.replace(refs, '<span class="Body-ref">$1</span>');

  //set mentions
  htmlbody = htmlbody.replace(mention, '<span class="Body-mention">$1</span>');

  /*
    validate before sending back
    we won't render invalid html -- if it tries, we'll just return unstyled markup body
  */
  if (!validateHTML(htmlbody)) {
    return safe;
  }

  return htmlbody;
}

//Sould fail for some elements, but use to check generally bad html
function validateHTML(html) {
  if (isNode) {

    //if we're doing this in node, we'll just assume it's OK (validating it client side anyways +it's escaped)
    return true;
  }

  //if we're doing this client-side, then we should try to salvage what we can (by returning safe)
  let el = document.createElement('div');
  el.innerHTML = html;
  return el.innerHTML === html;
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
