// /* eslint-disable no-console */
class Bookmark {
  constructor(title, url, desc, rating) {
    this.title = title,
      this.url = url,
      this.desc = desc,
      this.rating = rating;
  }
}

class UI {
  addBookmarkToList(bookmark) {
    const list = document.getElementById('bookmark-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${bookmark.title}</td>
    <td>${bookmark.url}</td>
    <td>${bookmark.rating}</td>
    <td><a href='' class='delete'>X</a></td>
    `;
    list.appendChild(row);

    document.querySelector('.delete').addEventListener('click', e => {
      e.preventDefault();
      const ui = new UI();
      ui.deleteBookmark(e.target);
      Store.removeBookmark(
        e.target.parentElement.previousElementSibling.textContent
      );
      ui.showAlert('Bookmark removed', 'success');

      e.preventDefault();
    });
  }
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#bookmark-form');
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBookmark(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      // need to remove from store/db
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('url').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('rating').value = '';
  }
}



class Store {
  static getBookmarks() {
    let bookmarks;
    if (localStorage.getItem('bookmarks') === null) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    return bookmarks;
  }

  static displayBookmarks() {
    const bookmarks = Store.getBookmarks();
    bookmarks.forEach(function (bookmark) {
      const ui = new UI();
      // add bookmark to ui
      ui.addBookmarkToList(bookmark);
    });
  }

  static addBookmark(bookmark) {
    const bookmarks = Store.getBookmarks();
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  static removeBookmark(title) {
    const bookmarks = Store.getBookmarks();

    bookmarks.forEach(function (bookmark, index) {
      if ((bookmark.title = title)) {
        bookmarks.splice(index, 1);
      }
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBookmarks);

// Event Listener - Add
document.getElementById('bookmark-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get form values
  const title = document.getElementById('title').value,
    url = document.getElementById('url').value,
    desc = document.getElementById('desc').value,
    rating = document.getElementById('rating').value;

  // Instantiate bookmark
  const bookmark = new Bookmark(title, url, desc, rating);

  //   Instantiate UI
  const ui = new UI();
  // Validate
  if (title === '' || url === '' || desc === '' || rating === '') {
    // alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add bookmark to list
    ui.addBookmarkToList(bookmark);
    // add to LS
    Store.addBookmark(bookmark);
    // Show success
    ui.showAlert('Bookmark added', 'success');

    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});