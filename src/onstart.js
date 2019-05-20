/* eslint-disable import/no-cycle */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import scroll from './scroll';
import touchScroll from './touchscroll';

const container = document.createElement('div');
const searchSection = document.createElement('div');
const itemsSection = document.createElement('div');
const buttonSection = document.createElement('div');
const inputArea = document.createElement('input');
const searchButton = document.createElement('button');
const icon = document.createElement('i');
let size = screen.width;
const next = document.createElement('button');

function pageLoad() {
  container.className = 'container';
  container.id = 'container';
  searchSection.className = 'search';
  inputArea.className = 'input-area';
  inputArea.placeholder = 'Type anything here...';
  inputArea.value = '';
  icon.className = 'fas fa-search';
  searchButton.className = 'search-button';
  searchButton.id = 'searchButton';
  searchButton.type = 'button';
  itemsSection.className = 'itemsSection';
  buttonSection.className = 'buttonSection';
  itemsSection.id = 'itemsSection';
  next.id = 'next';
  next.style.display = 'none';

  document.body.appendChild(container);
  container.appendChild(searchSection);
  container.appendChild(itemsSection);
  container.appendChild(buttonSection);
  searchSection.appendChild(inputArea);
  searchSection.insertBefore(searchButton, inputArea);
  searchButton.appendChild(icon);
  searchSection.appendChild(next);

  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('input-area')) {
      searchSection.classList.add('active-search-box');
    }
    if (!e.target.classList.contains('input-area')) {
      searchSection.classList.remove('active-search-box');
    }
  });

  scroll();
  touchScroll();
}

window.addEventListener('resize', () => {
  size = screen.width;
});

export { size, pageLoad, searchButton, inputArea, itemsSection, buttonSection };
