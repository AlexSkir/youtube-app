"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageLoad = pageLoad;
exports.searchSection = exports.buttonSection = exports.itemsSection = exports.inputArea = exports.searchButton = exports.size = void 0;

var _scroll = _interopRequireDefault(require("./scroll"));

var _touchscroll = _interopRequireDefault(require("./touchscroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
const container = document.createElement('div');
const searchSection = document.createElement('div');
exports.searchSection = searchSection;
const itemsSection = document.createElement('div');
exports.itemsSection = itemsSection;
const buttonSection = document.createElement('div');
exports.buttonSection = buttonSection;
const inputArea = document.createElement('input');
exports.inputArea = inputArea;
const searchButton = document.createElement('button');
exports.searchButton = searchButton;
const icon = document.createElement('i');
let size = screen.width;
exports.size = size;

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
  document.body.appendChild(container);
  container.appendChild(searchSection);
  container.appendChild(itemsSection);
  container.appendChild(buttonSection);
  searchSection.appendChild(inputArea);
  searchSection.insertBefore(searchButton, inputArea);
  searchButton.appendChild(icon);
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('input-area')) {
      searchSection.classList.add('active-search-box');
    }

    if (!e.target.classList.contains('input-area')) {
      searchSection.classList.remove('active-search-box');
    }
  });
  (0, _scroll.default)();
  (0, _touchscroll.default)();
}

window.addEventListener('resize', () => {
  exports.size = size = screen.width;
});