/* eslint-disable no-console */
import * as api from './api.js';

export const DATA = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

// Getters 
const findBookmark = function (id) {
  return DATA.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const findAndDelete = function (id) {
  DATA.bookmarks = DATA.bookmarks.filter(currentItem => currentItem.id !== id);
};

// Generators
const generateTopButtons = () => {
  let list = `<section id='top-buttons'>
    <button id='new-bookmark'>Create</button>
    <label>Filter:</label>
    <select id="filter" name="rating"">
      <option class='opOne' value="1">1</option>
      <option class='opTwo' value="2">2</option>
      <option class='opThree' value="3">3</option>
      <option class='opFour' value="4">4</option>
      <option class='opFive' value="5">5</option>
    </select>
  </section>`;
  return list;
};

const generateBookmarkList = () => {
  let output = '';
  // console.log(DATA.bookmarks);
  DATA.bookmarks.map(item => {
    if (item.rating >= DATA.filter) {
      output += `<section class='bookmark-list-item' id='${item.id}' data-bookmark-id='${item.id}'>
          <span class='bookmark-list-title'>${item.title}</span>
          <span class='bookmark-list-rating'>${item.rating}</span>
          <img class='bookmark-list-trashcan' src='./src/trashCan.svg'>
        </section>`;
    }
  });
  return output;
};

const generateNewBookmarkForm = () => {
  let newForm = `
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
        <button type='submit' id='new-cancel' name='cancel-button'>Cancel</button>
        <button type="submit" id="new-submit" name="submit-button">Submit</button>
      </div>
    </form>
  `;
  return newForm;
};

// Renderers
let appBody = document.getElementById('app-body');
export const renderAppBody = () => {
  const topButtons = generateTopButtons();
  const bookList = generateBookmarkList();
  appBody.innerHTML = topButtons;
  appBody.innerHTML += bookList;
  handleFilter();
};

const renderNewBookmarkForm = () => {
  let form = generateNewBookmarkForm();
  appBody.innerHTML = form;
};

const renderExpandedDetails = (target) => {
  let details = `<section id='bookmark-details'>
  <button class='bookmark-link'>Visit Site</button>
  <span>${target.desc}</span>
  <span>Rating: ${target.rating}</span>
  </section>`;
  return details;
};
export const handleExpand = () => {
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('bookmark-list-title')) {
      let tar = event.target.parentNode.dataset.bookmarkId;
      let tarBookmark = findBookmark(tar);
      console.log(tar);
      console.log(`clicked on ${tarBookmark}`);
      // renderExpandedDetails(tarBookmark);
      event.target.parentNode.innerHTML += renderExpandedDetails(tarBookmark);
    }
  });
};

// Event handlers
export const handleNew = () => {
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target === document.getElementById('new-bookmark')) {
      // console.log('cliked on new');
      DATA.adding = true;
      renderNewBookmarkForm();
    }
  });
};

export const handleNewSubmit = () => {
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target === document.getElementById('new-submit')) {
      let newItem = {
        title: document.getElementById('new-title').value,
        url: document.getElementById('new-url').value,
        desc: document.getElementById('new-desc').value,
        rating: document.getElementById('new-rating').value,
      };
      api.createItem(newItem);
      DATA.adding = false;
      // empty bookmarks and refresh from api after adding new item
      DATA.bookmarks = [];
      api.getItems()
        .then((response) => {
          response.forEach((mark) => {
            DATA.bookmarks.push(mark);
          });
        })
        .then(() => renderAppBody());
    }
  });
};

export const handleNewCancel = () => {
  document.addEventListener('click', e => {
    e.preventDefault();
    if (e.target === document.getElementById('new-cancel')) {
      renderAppBody();
    }
  });
};

export const handleDelete = () => {
  // fix
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
      let tar = findBookmark(event.target.closest('.bookmark-list-item').dataset.bookmarkId).id;
      findAndDelete(tar);
      api.deleteItem(tar)
        .then(() => renderAppBody());
    }
  });
};
export const handleFilter = () => {
  const dropDown = document.getElementById('filter');
  dropDown.addEventListener('change', (e) => {
    e.preventDefault();
    console.log('something changed');
    DATA.filter = dropDown.options[dropDown.selectedIndex].text;
    renderAppBody();
  });
};