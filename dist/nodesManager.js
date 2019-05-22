"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createButton = createButton;
exports.deleteButtons = deleteButtons;
exports.deleteItemsPages = deleteItemsPages;
exports.funcfack = funcfack;
exports.state = void 0;

var _onstart = require("./onstart");

/* eslint-disable no-restricted-globals */

/* eslint-disable no-plusplus */

/* eslint-disable guard-for-in */

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-undef */
// import './events';
const state = {
  currentPage: '',
  pages: ''
};
exports.state = state;

function funcfack(number, a, e) {
  state.currentPage = number;

  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove('active');
  }

  document.getElementById("pageButton".concat(number)).classList.add('active');

  if (e.target.classList.contains('active')) {
    for (let k = 0; k < _onstart.buttonSection.childNodes.length; k++) {
      _onstart.buttonSection.childNodes[k].innerHTML = '';
    }

    e.target.innerHTML = number;
  }

  if (state.pages - state.currentPage === 1) {
    document.getElementById('next').click();
  }

  if (state.currentPage > 3) {
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
    const buttonsToHide = document.getElementsByClassName('pageButton');

    for (let r = 0; r < buttonsToHide.length; r++) {
      buttonsToHide[r].classList.add('hidden');
    }

    document.getElementById('pageButton1').classList.remove('hidden');
    document.getElementById('pageButton2').classList.remove('hidden');
    document.getElementById('pageButton3').classList.remove('hidden');
    document.getElementById('pageButton4').classList.remove('hidden');
  }

  if (_onstart.size > 800) {
    _onstart.itemsSection.scrollTo({
      left: "".concat(1048 * (number - 1)),
      behavior: 'smooth'
    });
  } else if (_onstart.size < 500) {
    _onstart.itemsSection.scrollTo({
      left: "".concat(262 * (number - 1)),
      behavior: 'smooth'
    });
  } else {
    _onstart.itemsSection.scrollTo({
      left: "".concat(524 * (number - 1)),
      behavior: 'smooth'
    });
  }
}

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

  pageButton.id = "pageButton".concat(number);
  const a = document.getElementsByClassName('active');

  if (a.length === 0) {
    document.getElementById('pageButton1').classList.add('active');
    document.getElementById('pageButton1').innerHTML = '1';
  }

  document.getElementById("pageButton".concat(number)).addEventListener('click', e => {
    funcfack(number, a, e);
  }, false);
}

function deleteButtons() {
  while (_onstart.buttonSection.firstChild) {
    _onstart.buttonSection.removeChild(_onstart.buttonSection.firstChild);
  }
}

function deleteItemsPages() {
  state.currentPage = '';
  state.pages = '';

  while (_onstart.itemsSection.firstChild) {
    _onstart.itemsSection.removeChild(_onstart.itemsSection.firstChild);
  }
}