/* eslint-disable no-console */
// import * as api from './api.js';
import * as render from './render.js';

// let currentDb = api.getItems();
// console.log(currentDb);

export const bookmarks = [];
export const adding = false;
export const error = null;
export const filter = 0;

const findById = () => { };

export const handleGet = () => { };

export const handleNew = () => {
  document.getElementById('new-bookmark').onclick = (e) => {
    e.preventDefault();
    console.log('clicked new');
    render.renderN();
  };
};

export const handleFilter = () => {
  document.getElementById('filter').onclick = (e) => {
    e.preventDefault();
    console.log('clicked filter');
  };
};

export const handleEdit = () => { };

export const handleDelete = () => { };

export const handleToggle = () => { };

export const handleError = () => { };