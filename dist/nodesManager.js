"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createButton = createButton;
exports.deleteButtons = deleteButtons;
exports.deleteItemsPages = deleteItemsPages;
exports.state = void 0;

var _onstart = require("./onstart");

/* eslint-disable no-restricted-globals */

/* eslint-disable no-plusplus */

/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-undef */
const state = {
  currentPage: '',
  pages: ''
}; //* function to highlight active button, hide redundant buttons and show the nearest

exports.state = state;

function showButtons(number, a, e) {
  state.currentPage = number;

  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove('active');
  }

  document.getElementById("pageButton".concat(number)).classList.add('active');

  if (e.target.classList.contains('active')) {
    for (let k = 0; k < _onstart.buttonSection.childNodes.length; k++) {
      _onstart.buttonSection.childNodes[k].innerHTML = '';
    }

    e.target.innerHTML = number; //* pop out the number of current page
  } //* if the current page is one to final - load more clips


  if (state.pages - state.currentPage === 1) {
    document.getElementById('next').click();
  }

  if (state.currentPage > 3) {
    //* hide the first buttons, show the nearest
    const buttonsToHide = document.getElementsByClassName('pageButton');

    for (let r = 0; r < buttonsToHide.length; r++) {
      buttonsToHide[r].classList.add('hidden');
    }

    document.getElementById("pageButton".concat(number - 1)).classList.remove('hidden');
    document.getElementById("pageButton".concat(number)).classList.remove('hidden');
    document.getElementById("pageButton".concat(number + 1)).classList.remove('hidden');

    if (document.getElementById("pageButton".concat(number + 2))) {
      document.getElementById("pageButton".concat(number + 2)).classList.remove('hidden');
    }
  } else if (state.currentPage < 5) {
    //* hide farthest buttons, show the first
    const buttonsToHide = document.getElementsByClassName('pageButton');

    for (let r = 0; r < buttonsToHide.length; r++) {
      buttonsToHide[r].classList.add('hidden');
    }

    document.getElementById('pageButton1').classList.remove('hidden');
    document.getElementById('pageButton2').classList.remove('hidden');
    document.getElementById('pageButton3').classList.remove('hidden');
    document.getElementById('pageButton4').classList.remove('hidden');
  } //* when click the button sroll depends on device width


  if (_onstart.size > 800) {
    _onstart.itemsSection.scrollTo({
      left: "".concat(1040 * (number - 1)),
      behavior: 'smooth'
    });
  } else if (_onstart.size < 500) {
    _onstart.itemsSection.scrollTo({
      left: "".concat(260 * (number - 1)),
      behavior: 'smooth'
    });
  } else {
    _onstart.itemsSection.scrollTo({
      left: "".concat(520 * (number - 1)),
      behavior: 'smooth'
    });
  }
} //* function for creation buttons


function createButton(number) {
  if (state.currentPage === '') {
    state.currentPage = 1;
  }

  state.pages = number;
  const pageButton = document.createElement('button');
  pageButton.className = 'pageButton';
  pageButton.classList.add('hidden');

  if (document.getElementsByClassName('pageButton').length < 4) {
    pageButton.classList.remove('hidden');
  }

  _onstart.buttonSection.appendChild(pageButton);

  pageButton.id = "pageButton".concat(number); //* if app was just started, the first button would be active

  const activeButton = document.getElementsByClassName('active');

  if (activeButton.length === 0) {
    document.getElementById('pageButton1').classList.add('active');
    document.getElementById('pageButton1').innerHTML = '1';
  } //* add listener 'click' on buttons to scroll pages


  document.getElementById("pageButton".concat(number)).addEventListener('click', event => {
    showButtons(number, activeButton, event);
  }, false);
} //* delete all buttons if new request


function deleteButtons() {
  while (_onstart.buttonSection.firstChild) {
    _onstart.buttonSection.removeChild(_onstart.buttonSection.firstChild);
  }
} //* delete al clips if new request


function deleteItemsPages() {
  state.currentPage = '';
  state.pages = '';

  while (_onstart.itemsSection.firstChild) {
    _onstart.itemsSection.removeChild(_onstart.itemsSection.firstChild);
  }
}