/**
 oembed module -- a hacky (free) solution to oembed content
 modded for imgur links -- iframe for albums
 ex. oembed(url) -> html
*/

import fetch from 'isomorphic-fetch';
import config from '../config.js';

const isNode = config.isNode;
const apihost = `localhost`;
const endpoint = '/embed';

const validate = (url) => {
  let pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  return pattern.test(url);
};

const extract = (str) => {
    let oembedUrl, patternMatch;
    if (!validate(str)) {
      return `<p class="Content-broken-link">${str}</p>`;
    }
    //tried not to touch this block
    let urls = Object.keys(providers);
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i];
      patternMatch = false;
      let ref = providers[url];
      for (let j = 0; j < ref.length; j++) {
        let re = new RegExp(ref[j]);
        if (re.test(str)) {
          patternMatch = true;
          break;
        }
      }
      if (patternMatch) {
        let estr = encodeURI(str);
        oembedUrl = `${url}?url=${estr}&format=json`;
        break;
      }
    }
    
    if (!oembedUrl) {
      //still a legitimate url, so let's fetch the title
      return fetch(`http://${apihost}${endpoint}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ url: str, title: true })
      });
    }

    return fetch(`http://${apihost}${endpoint}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ url: oembedUrl })
    });
};

//whietlisted oembed providers
const providers = {
    "https://www.youtube.com/oembed": [
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/watch.+$",
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/v/.+$",
        "^http(?:s)?://youtu\\.be/.+$",
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/user/.+$",
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/[^#?/]+#[^#?/]+/.+$",
        "^http(?:s)?://m\\.youtube\\.com/index.+$",
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/profile.+$",
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/view_play_list.+$",
        "^http(?:s)?://(?:[-\\w]+\\.)?youtube\\.com/playlist.+$"
    ],
    "http://backend.deviantart.com/oembed": [
        "^http://(?:[-\\w]+\\.)?deviantart\\.com/art/.+$",
        "^http://fav\\.me/.+$",
        "^http://sta\\.sh/.+$",
        "^http://(?:[-\\w]+\\.)?deviantart\\.com/[^#?/]+#/d.+$"
    ],
    "http://www.dailymotion.com/api/oembed/": [
        "^http://[-\\w]+\\.dailymotion\\.com/.+$"
    ],
    "http://www.flickr.com/services/oembed/": [
        "^http://[-\\w]+\\.flickr\\.com/photos/.+$",
        "^http://flic\\.kr\\.com/.+$"
    ],
    "http://www.vimeo.com/api/oembed.json": [
        "^http(?:s)?://(?:www\\.)?vimeo\\.com/.+$",
        "^http(?:s)?://player\\.vimeo\\.com/.+$"
    ],
    "https://photobucket.com/oembed": [
        "^http://(?:[-\\w]+\\.)?photobucket\\.com/albums/.+$",
        "^http://(?:[-\\w]+\\.)?photobucket\\.com/groups/.+$"
    ],
    "https://www.slideshare.net/api/oembed/2": [
        "^http://www\\.slideshare\\.net/.+$"
    ],
    "https://api.twitter.com/1/statuses/oembed.json": [
        "^http(?:s)?://twitter\\.com/(?:#!)?[^#?/]+/status/.+$"
    ],
    "https://soundcloud.com/oembed": [
        "^https://soundcloud\\.com/[^#?/]+/.+$"
    ],
    "https://github.com/api/oembed": [
        "^http(?:s)?://gist\\.github\\.com/.+$"
    ],
    "https://embed.spotify.com/oembed/": [
        "^http(?:s)?://open\\.spotify\\.com/.+$",
        "^http(?:s)?://spoti\\.fi/.+$"
    ],
    "http://api.imgur.com/oembed":[
        "^http(?:s)?://(?:i\\.)?imgur\\.com/gallery/([^#?/]+)(?:.+)?$"
    ]
};

//non-oembed links
const special = {
  "imgur":[
      "^http(?:s)?://(?:www\\.)?imgur\\.com/gallery/([^#?/]+)(?:.+)?$"
  ]
};

//throws if page gets 404 -- checks if it's a single img vs album
const imgur = (url) => {
  let valid = false;
  const check = async (url) => {
    try {
      //translated to a GET Server Side --> only do this for whitelist
      let im = await fetch(`http://${apihost}${endpoint}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ url: `${url}.jpg` })
      });
      if (im.status != 200) {
        valid = false;
      }
      valid = true;
    } catch (e) {
      valid = false;
    }
  }
  check(url);
  return valid;
}

//get html
const oembed = (url) => {
  let html;
  let match;
  let specials = Object.keys(special);

  //get match
  for (let i = 0; i < specials.length; i++) {
    let spec = specials[i];
    let ref = special[spec];
    for (let j = 0; j < ref.length; j++) {
      let re = new RegExp(ref[j]);
      if (re.test(url)) {
        match = url[i];
        break;
      }
    }
    if (match) break;
  }

  //if it's a special case, treat it as such -- imgur is a total hack
  if (match) {
    switch (match) {
      //if it's a single image or vid, return this, otherwise oembed the player (kinda ugly)
      case 'imgur':
      if (imgur(url)) return `
        <video loop autoplay poster="${url}.jpg" class="Content-iv" controls>
          <source src="${url}.webm" type="video/webm">
          <source src="${url}.mp4" type="video/mp4">
        </video>`;
      break;
    }
  }

  //send request to get oembed html
  (async (url) => {
    try {
      //attempt to get user
      let content = await extract(url);
      let jresp = await content.json();
      html = jresp.html;
    } catch (err) {
      console.log(err);
    }
  })(url);

  //we'll run embedded scripts inside iframe after load -- here we're just getting some html
  return html;
};

export default oembed;
