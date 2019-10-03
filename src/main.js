// /* eslint-disable no-console */



// // // store.js stuff
// // let bookmarks = [];
// // let adding = false;
// // const error = null;
// // let filter = 0;

// // const addBookmark = function (newBookmark) {
// //   bookmarks.push(newBookmark);
// // };

// // const findBookmark = function (id) {
// //   return bookmarks.find(currentBookmark => currentBookmark.id === id);
// // };

// // const deleteBookmark = function (id) {
// //   bookmarks = bookmarks.filter(currentBookmark => currentBookmark.id !== id);
// //   deleteItem(id);
// //   renderBookmarkList();
// // };
// // // end store.js stuff

// // // bookmarks.js stuff
// // let appBody = document.getElementById('app-body');
// // let trashCan = '<svg class="trashcan" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>';
// // // const bookmarkList = document.getElementById('bookmark-list');

// // const refreshStore = () => {
// //   bookmarks = [];
// //   filter = 0;
// //   getItems()
// //     .then((response) => {
// //       response.forEach((mark) => {
// //         bookmarks.push(mark);
// //       });
// //     });
// // };

// // const renderTopButtons = () => {
// //   return `<section id='top-buttons'>
// //     <button id='new-bookmark'>Create</button>
// //     <label>Filter:</label>
// //     <select id="filter" name="rating"">
// //       <option class='op1' value="1">1</option>
// //       <option class='op2' value="2">2</option>
// //       <option class='op3' value="3">3</option>
// //       <option class='op4' value="4">4</option>
// //       <option class='op5' value="5">5</option>
// //     </select>
// //   </section>`;
// // };

// // // render full list
// // const renderBookmarkList = () => {
// //   return bookmarks.map(item => {
// //     if (item.rating >= filter) {
// //       return `
// //         <section class='bookmark-list-item' id='${item.id}' data-bookmark-id='${item.id}'>
// //           <span class='bookmark-list-title'>${item.title}</span>
// //           <span class='bookmark-list-rating'>${item.rating}</span>
// //           <span class='bookmark-list-trashcan'>${trashCan}</span>
// //         </section>;
// //       `;
// //     }
// //   });
// // };

// // render new form
// // const renderBookmarkForm = () => {
// //   const formToRender = `
// //     <form id='bookmark-form' name='new-bookmark-form'>
// //       <div>
// //         <label for="new-bookmark-form">Title:</label>
// //         <input type="text" name="title" required id="new-title" />
// //       </div>
// //       <div>
// //         <label for="new-bookmark-form">URL:</label>
// //         <input type="url" name="url" id="new-url" required>
// //       </div>
// //       <div>
// //         <label for="new-bookmark-form">Description:</label>
// //         <input type="text" name="desc" id="new-desc" required>
// //       </div>
// //       <div>
// //         <label for="new-bookmark-form">Rating</label>
// //         <select id="new-rating" name="rating">
// //           <option value="1">1</option>
// //           <option value="2">2</option>
// //           <option value="3">3</option>
// //           <option value="4">4</option>
// //           <option value="5">5</option>
// //         </select>
// //       </div>
// //       <div>
// //         <button type='submit' id='new-cancel' name='cancel-button'>Cancel</button>
// //         <button type="submit" id="new-submit" name="submit-button">Submit</button>
// //       </div>
// //     </form>
// //   `;
// //   appBody.innerHTML = formToRender;
// //   // fix
// //   // No idea why required does nothing.
// // };

// // const handleFilterList = () => {
// //   document.addEventListener('change', function () {
// //     let tar = document.querySelector('#filter');
// //     filter = tar.value;
// //     console.log(filter);
// //     let filteredSection = document.createElement('section');
// //     filteredSection.id = 'filtered-bookmarks';
// //     let filtered = bookmarks.filter(item => item.rating >= filter);
// //     let blah = filtered.map(item => `
// //       <section class='bookmark-list-item' id='${item.id}' data-bookmark-id='${item.id}'>
// //         <span class='bookmark-list-title'>${item.title}</span>
// //         <span class='bookmark-list-rating'>${item.rating}</span>
// //         <span class='bookmark-list-trashcan'>${trashCan}</span>
// //       </section>
// //     `);
// //     filteredSection.innerHTML = blah.join('');
// //     appBody.appendChild(filteredSection);
// //   });
// // };

// // // var e = document.getElementById("ddlViewBy");
// // // var strUser = e.options[e.selectedIndex].text;

// // new button clicked
// // const handleClickNew = () => {
// //   document.addEventListener('click', function (e) {
// //     e.preventDefault();
// //     if (e.target === document.getElementById('new-bookmark')) {
// //       console.log('cliked on new');
// //       adding = true;
// //       renderBookmarkForm();
// //     }
// //   });
// // };

// // submit new bookmark
// // const handleClickSubmit = () => {
// //   document.addEventListener('click', (e) => {
// //     e.preventDefault();
// //     if (e.target === document.getElementById('new-submit')) {
// //       console.log('cliked on submit');
// //       const validForm = document.getElementById('bookmark-form').checkValidity();
// //       if (!validForm) {
// //         console.log('invalid');
// //         // fix
// //         // see above in renderBookmarkForm
// //       } else {
// //         let newItem = {
// //           title: document.getElementById('new-title').value,
// //           url: document.getElementById('new-url').value,
// //           desc: document.getElementById('new-desc').value,
// //           rating: document.getElementById('new-rating').value,
// //         };
// //         createItem(newItem);
// //         adding = false;
// //         populateStore();
// //       }
// //     }
// //   });
// // };
// // const handleClickCancel = () => {
// //   document.addEventListener('click', e => {
// //     e.preventDefault();
// //     if (e.target === document.getElementById('new-cancel')) {
// //       populateStore();
// //     }
// //   });
// // };

// // expand feature
// const handleClickBookmark = () => {
//   document.addEventListener('click', (e) => {
//     e.preventDefault();
//     let tar;
//     if (e.target.classList.contains('bookmark-list-title')) {
//       tar = e.target.closest('.bookmark-list-item');
//       console.log(`clicked on ${tar.className}`);
//     } else {
//       return null;
//     }
//     if (!document.getElementById('bookmark-expanded')) {
//       let toggleTarget = findBookmark(tar.dataset.bookmarkId);
//       let bookmarkDetails = document.createElement('div');
//       bookmarkDetails.id = 'bookmark-expanded';
//       bookmarkDetails.innerHTML = `
//         <button class='bookmark-link'>Visit Site</button>
//         <p>Description: ${toggleTarget.desc}</p>
//         <p>Rating: ${toggleTarget.rating}</p>
//       `;
//       toggleTarget.expanded = true;
//       tar.appendChild(bookmarkDetails);
//       document.addEventListener('click', (e) => {
//         if (e.target.classList.contains('bookmark-link')) {
//           window.open(toggleTarget.url);
//         }
//       });
//     } else {
//       tar.lastChild.remove();
//     }
//   });
// };

// const handleClickDelete = () => {
//   document.addEventListener('click', e => {
//     e.preventDefault();
//     if (e.target.classList.contains('trashcan')) {
//       console.log('trashcan clicked');
//       if (confirm('Are you sure you want to delete this bookmark?')) {
//         console.log('clicked yes');
//         let tar = e.target.closest('.bookmark-list-item');
//         tar = tar.dataset.bookmarkId;
//         let delTar = findBookmark(tar);
//         deleteItem(delTar.id);
//         populateStore();
//       } else {
//         console.log('clicked no');
//       }
//     }
//   });
// };


// // // end bookmark.js stuff

// // start main.js
// const populateStore = function () {
//   getItems()
//     .then((response) => {
//       response.forEach((mark) => {
//         bookmarks.push(mark);
//       });
//     })
//     .then(() => {
//       bookmarks.forEach(item => item.expanded = false);
//     })
//     .then(() => {
//       // console.log(bookmarks);
//       refreshStore();
//     })
//     .then(() => {
//       renderBookmarkList();
//     });
// };

// // // handleClickNew();
// // // handleClickSubmit();
// // // handleClickBookmark();
// // // handleClickDelete();
// // // handleClickCancel();
// // // handleFilterList();
// // populateStore();
// // // end main.js