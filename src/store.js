import * as store from './store.js';

export const DATA = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 1
};

// Getters 
export const findBookmark = function (id) {
  return store.DATA.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

export const findAndDelete = function (id) {
  store.DATA.bookmarks = store.DATA.bookmarks.filter(currentItem => currentItem.id !== id);
};