const ui = document.getElementById('app-body');
const uiList = document.getElementById('bookmark-list');
const topButtons = document.getElementById('top-buttons');

export const renderN = () => {
  uiList.style.display = 'none';
  topButtons.style.display = 'none';
  let newForm = document.createElement('div', 'id="newBookDiv"');
  newForm.innerHTML = `
    <section id='newBookmarkName'>
      <h3>Name:</h3>
      <input type='text' id='newName' name='newName'/>
      <h3>URL:</h3>
      <input type='url' id='newUrl' name='newUrl'/>
      <span>*****</span>
      <h3>Description:</h3>
      <input type='text' id='newDesc' name='newDesc'/>
      <button type='submit' id='newSubmit'>Submit</submit>
    </section>
  `;
  ui.appendChild(newForm);
  document.getElementById('app-body').onclick = (e) => {
    e.preventDefault();
    if (e.target === document.getElementById('newSubmit')) {
      console.log('clicked submit');
      renderD();
    }
  };
};

export const renderD = () => {
  ui.lastChild.remove();
  uiList.style.display = 'block';
  topButtons.style.display = 'block';
};