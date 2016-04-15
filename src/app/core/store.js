/**
 * Store for core actions (particularly those caused by nav)
 */

//export appStore, handles general user data
export default let appStore = {
  //initialize user as anon
  _user: {anonymous: true, username:'', usernames: []},

  //initialize groups
  _groups: ['/cs','/music','/vid','/bored'],

  //initialize form data

  //set user data
  set user (user) {
    if (user.anonymous) {
      this._user = {
        anonymous: true,
        username: '',
        usernames: [],
        notifications: 0
      };
    } else {
      this._user = {
        username: user.username,
        anonymous: user.anonymous,
        usernames: user.usernames,
        notifications: user.notifications
      };
    }
  },

  //get user data
  get user() {
    return this._user
  },

  //get groups
  set groups(groups) {

    //loop through array of groups & push them to our internal list
    groups.forEach(grp => this._groups.push());
  },

  //get all groups that have been added so far
  get groups() {

    //get groups from internal store
    return this._groups;
  },

  set

};
