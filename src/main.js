/* eslint-disable no-console */

// API.js stuff
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/reif/bookmarks';

const apiFetch = (url, method, body) => {
  let error = false;
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        alert(res.status);
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        alert(error);
        return Promise.reject(error);
      }
      return data;
    });
};

const getItems = () => {
  // GET
  console.log('getting');
  return apiFetch(`${BASE_URL}`, 'GET');
};

const createItem = (body) => {
  // POST
  console.log('posting');
  return apiFetch(`${BASE_URL}`, 'POST', body);
};

const updateItem = (id, body) => {
  // PATCH
  console.log('patching');
  return apiFetch(`${BASE_URL}/${id}`, 'PATCH', body);
};

const deleteItem = (id) => {
  // DELETE
  console.log('deleting');
  return apiFetch(`${BASE_URL}/${id}`, 'DELETE');
};
// End API.js stuff

// store.js stuff
let bookmarks = [];
const adding = false;
const error = null;
const filter = 0;

const addBookmark = function (newBookmark) {
  bookmarks.push(newBookmark);
};

const findBookmark = function (id) {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const deleteBookmark = function (id) {
  bookmarks = bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const toggleExpand = function (id) {

};
// end store.js stuff

// bookmarks.js stuff
let appBody = document.getElementById('app-body');
// const bookmarkList = document.getElementById('bookmark-list');

const renderBookmarkList = () => {
  bookmarks = [];
  getItems()
    .then((response) => {
      response.forEach((mark) => {
        bookmarks.push(mark);
      });
    })
    // .then(() => console.log(bookmarks))
    .then(() => {
      let items = `
        <section id='top-buttons'>
          <button id='new-bookmark'>Create</button>
          <button id="filter">Filter</button>
        </section>
        <section id="bookmark-list"></section>`;
      let markList = bookmarks.map(item => `
        <section class='bookmark-list-item' id='${item.id}' data-bookmark-id='${item.id}'>
          <span class='bookmark-list-title'>${item.title}</span>
          <span class='bookmark-list-rating'>${item.rating}</span>
        </section>
      `);
      items += markList.join('');
      appBody.innerHTML = items;
    });
};

const renderBookmarkForm = () => {
  const formToRender = `
    <form id='bookmark-form' name='new-bookmark-form'>
      <div>
        <label for="new-bookmark-form">Title:</label>
        <input type="text" name="title" required id="new-title" />
      </div>
        <div>
        <label for="new-bookmark-form">URL:</label>
        <input type="url" name="url" id="new-url" required>
      </div>
      <div>
        <label for="new-bookmark-form">Description:</label>
        <input type="text" name="desc" id="new-desc" required>
      </div>
      <div>
        <label for="new-bookmark-form">Rating</label>
        <select id="new-rating" name="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <button type="submit" id="new-submit" name="submit-button">Submit</button>
      </div>
    </form>
  `;
  appBody.innerHTML = formToRender;
  // fix
  // No idea why required does nothing.
};

const handleClickNew = () => {
  document.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target === document.getElementById('new-bookmark')) {
      console.log('cliked on new');
      renderBookmarkForm();
    }
  });
};

const handleClickSubmit = () => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target === document.getElementById('new-submit')) {
      console.log('cliked on submit');
      const validForm = document.getElementById('bookmark-form').checkValidity();
      if (!validForm) {
        console.log('invalid');
        // fix
        // see above in renderBookmarkForm
      } else {
        let newItem = {
          title: document.getElementById('new-title').value,
          url: document.getElementById('new-url').value,
          desc: document.getElementById('new-desc').value,
          rating: document.getElementById('new-rating').value
        };
        createItem(newItem);
        populateStore();
      }
    }
  });
};

// fix
// expand feature
const handleClickBookmark = () => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    let tar;
    if (e.target.classList.contains('bookmark-list-title')) {
      tar = e.target.closest('.bookmark-list-item');
      console.log(`clicked on ${tar.className}`);
    } else {
      return null;
    }
    if (!document.getElementById('bookmark-expanded')) {
      let toggleTarget = findBookmark(tar.dataset.bookmarkId);
      let bookmarkDetails = document.createElement('div');
      bookmarkDetails.id = 'bookmark-expanded';
      bookmarkDetails.innerHTML = `
        <p>Title: ${toggleTarget.title}</p>
        <p>URL: ${toggleTarget.url}</p>
        <p>DESC: ${toggleTarget.desc}</p>
        <p>RATING: ${toggleTarget.rating}</p>
      `;
      tar.appendChild(bookmarkDetails);
    } else {
      tar.lastChild.remove();
    }

  });
};
// end bookmark.js stuff

// start main.js
const populateStore = function () {
  getItems()
    .then((response) => {
      response.forEach((mark) => {
        bookmarks.push(mark);
      });
    })
    .then(() => {
      renderBookmarkList();
    });
};

handleClickNew();
handleClickSubmit();
handleClickBookmark();
populateStore();
// end main.js