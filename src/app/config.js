//outline groups
const groups = {
  '/cs/': 'computer science board',
  '/music/': 'music discussion',
  '/vid/': 'webms, gifs, and videos',
  '/bored/': 'entertainment',
  '/random/': 'random posts'
}

//for convenience, keep an array of group names
const auto = Object.keys(groups);


//this is config
export default {
  api: `${window.location.host}/api`,
  isNode: typeof window === 'undefined',
  groups: {
    main: '/random/',
    descriptions: groups,

    //just for convenience
    auto: auto
  }
}
