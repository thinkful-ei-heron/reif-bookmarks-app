import * as bookmarks from './bookmarks.js';
import * as api from './api.js';
import * as store from './store.js';

const startApp = () => {
  bookmarks.handleNew();
  bookmarks.handleExpand();
  bookmarks.handleDelete();
  bookmarks.handleNewSubmit();
  bookmarks.handleNewCancel();
  bookmarks.handleLink();

  api.getItems()
    .then((response) => {
      response.forEach((mark) => {
        mark.expanded = false;
        store.DATA.bookmarks.push(mark);
      });
    })
    .then(() => bookmarks.renderAppBody());
};
startApp();