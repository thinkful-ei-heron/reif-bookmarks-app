import * as api from './api.js';

api.createItem(
  { "title": "t Title", "url": "https://www.test.com", "desc": "gsae", "rating": 5 }
);

let currentStore = api.getItems();
console.log(currentStore);
