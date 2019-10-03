import * as bookmarks from './bookmarks.js';
import * as api from './api.js';

const startApp = () => {
  bookmarks.handleNew();
  bookmarks.handleExpand();
  bookmarks.handleDelete();
  bookmarks.handleNewSubmit();
  bookmarks.handleNewCancel();
  bookmarks.handleExpand();
  bookmarks.handleDelete();

  api.getItems()
    .then((response) => {
      response.forEach((mark) => {
        mark.expanded = false;
        bookmarks.DATA.bookmarks.push(mark);
      });
    })
    .then(() => bookmarks.renderAppBody());
};

startApp();