import * as SessionConstants from './Session.constants';
import { User } from '../../models/User';

/**
 * Class representing a Session stored to the localstorage
 */
export class Session {
  /**
   * Get a singleton session
   */
  constructor() {
    this._db = window.localStorage;
    this._user = new User();
    this._sessionKey = SessionConstants.SESSIONKEY;
    if (this.hasUser()) {
      this.loadUser();
    }
  }

  /**
   * Return true if a user is already stored. False otherwise
   * @returns {boolean}
   */
  hasUser() {
    return !!this.get(this.sessionKey);
  }

  /**
   * Load data user stored to the current user
   * @returns {Session} - the session
   */
  loadUser() {
    const user = this.get(this.sessionKey);
    if (user) {
      this._user = new User(JSON.parse(user));
    }
    return this;
  }

  /**
   * Logout the current user
   */
  logout() {
    this.set(SessionConstants.SESSIONKEY, '{}');
    this.user.logout();
  }

  /**
   * Clear the localstorage
   */
  clear() {
    this.db.clear();
  }

  /**
   * Wrapper to localstorage.getItem()
   * @param key
   * @returns {String} - The value
   */
  get(key) {
    return this.db.getItem(key.toString());
  }

  /**
   * Wrapper to localstorage.setItem()
   * @param key
   * @param value
   * @returns {Session}
   */
  set(key, value) {
    this.db.setItem(key.toString(), value.toString());
    return this;
  }

  /**
   * @returns {LocalStorage}
   */
  get db() {
    return this._db;
  }

  /**
   * current user
   * @returns {User}
   */
  get user() {
    return this._user;
  }

  /**
   * Performs a save user
   * @param {User} value - the user to set
   */
  set user(value) {
    this._user = value;
    this.saveUser();
  }

  /**
   * @returns {String} - the sessionkey
   */
  get sessionKey() {
    return this._sessionKey;
  }

  /**
   * Save the user to localstorage
   */
  saveUser() {
    this.set(this.sessionKey, JSON.stringify(this._user));
  }

  /**
   * Set the access token in localstorage
   * @param {String} token - the access token
   */
  setAccessToken(token) {
    this.set('accessToken', token);
  }

  /**
   * Get the access token from localstorage
   * @returns {String} - the access token
   */
  getAccessToken() {
    return this.get('accessToken');
  }
}

export default new Session();
