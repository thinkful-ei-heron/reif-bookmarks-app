/* eslint-disable no-console */

// API stuff
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
// End API stuff

// store stuff

const bookmarks = [];
const adding = false;
const error = null;
const filter = 0;

const addBookmark = function (newBookmark) {
  this.bookmarks.push(newBookmark);
};

const findBookmark = function (id) {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const deleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const updateBookmark = function (id, newData) {
  let currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
};

// fix
// const toggleExpand = function (id) {};

// end store stuff


const populateStore = function () {
  getItems()
    .then((item) => {
      item.forEach((item) => {
        bookmarks.push(item);
      });
    });
};

populateStore();
console.log(bookmarks);