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
const header = document.createElement('div');
const logoSection = document.createElement('div');
const youtubeIcon = document.createElement('i');
const logoText = document.createElement('span');
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
const searchIcon = document.createElement('i');
let size = screen.width;
exports.size = size;
const slider = document.createElement('ul');
const slide1 = document.createElement('li');
const slide2 = document.createElement('li');
const slide3 = document.createElement('li');
const slide4 = document.createElement('li'); //* create layout for search request

function pageLoad() {
  container.className = 'container';
  container.id = 'container';
  header.className = 'header';
  logoSection.className = 'logo-block';
  youtubeIcon.className = 'fab fa-youtube';
  logoText.innerText = 'YouTube';
  searchSection.className = 'search';
  inputArea.className = 'input-area';
  inputArea.placeholder = 'YouTube video search';
  inputArea.value = '';
  searchIcon.className = 'fas fa-search';
  searchButton.className = 'search-button';
  searchButton.id = 'searchButton';
  searchButton.type = 'button';
  itemsSection.className = 'itemsSection';
  buttonSection.className = 'buttonSection';
  itemsSection.id = 'itemsSection';
  slider.className = 'slider';
  slide1.className = 'slide showing';
  slide2.className = 'slide';
  slide3.className = 'slide';
  slide4.className = 'slide';
  slide1.innerText = 'Simple app, designed for quick easy search for video clips on YouTube by key-words';
  slide2.innerText = 'The block with clips is scrollable, which simplifies observation of the search result';
  slide3.innerText = 'Sufficient information about video clips: channel, description, statistics, link to the clip';
  slide4.innerHTML = 'No annoying advertising!!!</br> Enjoy your searching!';
  document.body.appendChild(container);
  container.appendChild(header);
  container.appendChild(itemsSection);
  container.appendChild(buttonSection);
  header.appendChild(logoSection);
  header.appendChild(searchSection);
  logoSection.appendChild(logoText);
  logoSection.insertBefore(youtubeIcon, logoText);
  searchSection.appendChild(inputArea);
  searchSection.insertBefore(searchButton, inputArea);
  searchButton.appendChild(searchIcon);
  itemsSection.appendChild(slider);
  slider.appendChild(slide1);
  slider.appendChild(slide2);
  slider.appendChild(slide3);
  slider.appendChild(slide4);
  const slides = document.querySelectorAll('.slider .slide');
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
  }

  setInterval(nextSlide, 4000);
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('input-area')) {
      searchSection.classList.add('active-search-box');
    }

    if (!e.target.classList.contains('input-area')) {
      searchSection.classList.remove('active-search-box');
    }
  }); //* initialising scroll event

  (0, _scroll.default)();
  (0, _touchscroll.default)();
}

window.addEventListener('resize', () => {
  exports.size = size = screen.width;
});