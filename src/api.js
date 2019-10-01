const BASE_URL = 'https://thinkful-list-api.herokuapp.com/reif';

const apiFetch = function (url, method, body) {
  let error = false;
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
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

export const getItems = () => {
  return apiFetch(`${BASE_URL}/bookmarks`);
};

export const createItem = () => {
}

export const updateItem = () => {
}

export const deleteItem = () => {
}