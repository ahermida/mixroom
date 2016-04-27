/**
 oembed module -- a hacky (free) solution to oembed content
 modded for imgur links -- iframe for albums
 ex. oembed(url) -> html
*/

import fetch from 'isomorphic-fetch';
import config from '../config.js';

const isNode = config.isNode;
const apihost = isNode ? "localhost/": window.location.host;
const endpoint = '/embed';

export const validate = (url) => {
  let pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  return pattern.test(url);
};

const extract = (str) => {
    let oembedUrl, patternMatch;

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
      return {
        oembed: false,
        html: `<a href="${str}">${str}</a>`
      };

    } else {

    return {
      oembed: true,
      embed: () => fetch(`http://${apihost}${endpoint}`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({ url: oembedUrl })
        })
    };
  }
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
    "https://embed.spotify.com/oembed/": [
        "^http(?:s)?://open\\.spotify\\.com/.+$",
        "^http(?:s)?://spoti\\.fi/.+$"
    ],
    "http://api.imgur.com/oembed":[
        "^http(?:s)?://(?:i\\.)?imgur\\.com/gallery/([^#?/]+)(?:.+)?$"
    ]
};

//get html
const oembed = async (url) => {
  let html;
  let match;

  //send request to get oembed html
  const embed = async (url) => {
    let extracted = extract(url);
    if (!extracted.oembed) return extracted.html;
    try {
      let followEmbed = extracted.embed;
      //attempt to get user
      let content = await followEmbed(url);
      let resp = await content.json();
      let jresp = JSON.parse(resp.embed);
      return jresp.html || `<a href="${url}">
                              <iframe style="background-image: url(${jresp.url}); min-height: 400px; min-width: 100%; background-size: contain; background-size: cover;">
                              </iframe>
                            </a>`;
    } catch (err) {
      console.log(err);
    }
  }

  return await embed(url);
};

export default oembed;
