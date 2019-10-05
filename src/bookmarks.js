/* eslint-disable no-console */
import * as api from './api.js';
import * as store from './store.js';



// Generators
const generateTopButtons = () => {
  let list = `<section id='top-buttons'>
    <button id='new-bookmark'>Create</button>
    <div class='filter-div'>
    <select id="filter" name="rating"">
      <option class='opDefautl' value='filterDefault' selected='selected'>Filter</option>
      <option class='opFive' value="5">5</option>
      <option class='opFour' value="4">4</option>
      <option class='opThree' value="3">3</option>
      <option class='opTwo' value="2">2</option>
      <option class='opOne' value="1">1</option>
    </select>
    </div>
  </section>`;
  return list;
};

const generateBookmarkList = () => {
  let listContainer = document.createElement('ul');
  store.DATA.bookmarks.map(item => {
    if (item.rating >= store.DATA.filter) {
      let listItem = document.createElement('li');
      listItem.innerHTML = `<li class='bookmark-list-item' id='${item.id}' data-bookmark-id='${item.id}'>
          <span class='bookmark-list-title'>${item.title}</span>
          <div class='list-item-right'>
            <span class='bookmark-list-rating'>${item.rating}</span>
            <img class='bookmark-list-trashcan' src='./src/trashCan.svg'>
          </div>
          </li>`;
      listContainer.appendChild(listItem);
    }
  });
  return listContainer;
};

const generateNewBookmarkForm = () => {
  let newForm = `
    <form id='bookmark-form'>
      <div class='input-div'>
        <label>Title:</label>
        <input type="text" id="new-title" required/>
      </div>
      <div class='input-div'>
        <label>URL:</label>
        <input type="url" id="new-url" name="name" required/>
      </div>
      <div class='input-div'>
        <label>Description:</label>
        <input type="text" id="new-desc"/>
      </div>
      <div class='input-div'>
        <label>Rating</label>
        <select id="new-rating" name="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5" selected="selected">5</option>
        </select>
      </div>
      <div id='form-button-container'>
        <button class='form-button' id='new-cancel'>Cancel</button>
        <button class='form-button' type="submit" id="new-submit" >Submit</button>
      </div>
    </form>
  `;
  return newForm;
};

// Renderers
let appBody = document.getElementById('app-body');
export const renderAppBody = (filter) => {
  // console.log(filter);
  const topButtons = generateTopButtons(filter);
  const bookList = generateBookmarkList();
  appBody.innerHTML = topButtons;
  appBody.appendChild(bookList);
  handleFilter();
};

const renderNewBookmarkForm = () => {
  let form = generateNewBookmarkForm();
  appBody.innerHTML = form;
};

const renderExpandedDetails = (target) => {
  let details = document.createElement('section');
  details.id = 'bookmark-details';
  details.innerHTML = `\n
  <button class='bookmark-link' href='${target.url}'><a href='${target.url}' target='_blank' class='bookmark-link'>Visit Site</a></button>
  <span>${target.desc}</span>
  <span>Rating: ${target.rating}</span>`;
  console.log(details);
  return details;
};
export const handleExpand = () => {
  document.addEventListener('click', (event) => {
    // event.preventDefault();
    if (event.target.classList.contains('bookmark-list-title')) {
      if (!document.querySelector('#bookmark-details')) {
        let tar = event.target.parentNode.dataset.bookmarkId;
        let tarBookmark = store.findBookmark(tar);
        tarBookmark.expanded = true;
        console.log(tar);
        // console.log(`clicked on ${tarBookmark}`);
        // let newDet = 
        event.target.parentNode.parentNode.appendChild(renderExpandedDetails(tarBookmark));
      } else {
        document.getElementById('bookmark-details').remove();
        let tar = event.target.parentNode.dataset.bookmarkId;
        let tarBookmark = store.findBookmark(tar);
        tarBookmark.expanded = false;
      }
    }
  });
};

// Event handlers
export const handleNew = () => {
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target === document.getElementById('new-bookmark')) {
      // console.log('cliked on new');
      store.DATA.adding = true;
      renderNewBookmarkForm();
    }
  });
};

export const handleNewSubmit = () => {
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target === document.getElementById('new-submit')) {
      var form = document.querySelector('#bookmark-form');
      var reportButton = document.querySelector('#new-submit');
      reportButton.addEventListener('click', function () {
        form.reportValidity();
      });
      if (form.reportValidity()) {
        let newItem = {
          title: document.getElementById('new-title').value,
          url: document.getElementById('new-url').value,
          desc: document.getElementById('new-desc').value,
          rating: document.getElementById('new-rating').value,
        };
        var reportVal = document.forms['bookmark-form'].reportValidity();
        if (!reportVal) {
          alert('Please check the form fields: ' + reportVal);
        } else {
          api.createItem(newItem);
          store.DATA.adding = false;
          // empty bookmarks and refresh from api after adding new item
          store.DATA.bookmarks = [];
          api.getItems()
            .then((response) => {
              response.forEach((mark) => {
                store.DATA.bookmarks.push(mark);
              });
            })
            .then(() => renderAppBody());
        }
      }
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
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
      let tar = store.findBookmark(event.target.closest('.bookmark-list-item').dataset.bookmarkId).id;
      store.findAndDelete(tar);
      api.deleteItem(tar)
        .then(() => renderAppBody());
    }
  });
};
export const handleFilter = () => {
  const dropDown = document.getElementById('filter');
  dropDown.addEventListener('change', (e) => {
    store.DATA.filter = dropDown.options[dropDown.selectedIndex].text;
    renderAppBody();
  });
};

export const handleLink = () => {
  document.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.className === 'bookmark-link') {
      console.log('clicked link');
      window.open(event.target.getAttribute('href'));
    }
  });
  // window.open(url);
};