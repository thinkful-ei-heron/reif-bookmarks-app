/* eslint-disable no-console */
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
      // console.log(data);
      return data;
    });
};

export const getItems = () => {
  // GET
  console.log('getting');
  return apiFetch(`${BASE_URL}`, 'GET');
};

export const createItem = (body) => {
  // POST
  console.log('posting');
  return apiFetch(`${BASE_URL}`, 'POST', body);
};

export const updateItem = (id, body) => {
  // PATCH
  console.log('patching');
  return apiFetch(`${BASE_URL}/${id}`, 'PATCH', body);
};

export const deleteItem = (id) => {
  // DELETE
  console.log('deleting');
  return apiFetch(`${BASE_URL}/${id}`, 'DELETE');
};