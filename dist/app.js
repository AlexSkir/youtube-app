"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.current = void 0;

var _onstart = require("./onstart");

var _search = _interopRequireDefault(require("./search"));

var _nodesManager = require("./nodesManager");

var _domBuilder = require("./domBuilder");

require("./resize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
const current = {
  searchTags: '',
  obj: ''
}; //* loading search box

exports.current = current;
document.addEventListener('DOMContentLoaded', _onstart.pageLoad);

_onstart.inputArea.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    document.querySelector('button').click();
  }
}); //* initialization of search request and DOM creating on search button click


window.addEventListener('click', e => {
  if (e.target === _onstart.searchButton) {
    //* delete old button for next requests
    if (document.getElementById('next')) {
      _onstart.searchSection.removeChild(document.getElementById('next'));
    }

    const next = document.createElement('button'); //* create new button for next requests

    next.id = 'next';
    next.style.display = 'none';

    _onstart.searchSection.appendChild(next);

    current.searchTags = _onstart.inputArea.value; //* delete old buttons and clips

    (0, _nodesManager.deleteButtons)();
    (0, _nodesManager.deleteItemsPages)();
    const youtube = new _search.default();
    youtube.deleteOldData(); //* just in case

    current.obj = youtube;

    if (_onstart.inputArea.value !== '') {
      setTimeout(() => {
        youtube.getResp(current.searchTags); //* load clips with keywords content
      }, 200);
      setTimeout(() => {
        if (current.obj.len === 0) {
          (0, _domBuilder.nothingFound)(current.searchTags); //* if no data found load page with searching advice
        }
      }, 800);
    }

    _onstart.inputArea.value = '';
    document.getElementById('next').addEventListener('click', () => {
      setTimeout(() => {
        youtube.getResp(current.searchTags); //* if clicked - load next request's data
      }, 200);
    });
  }
}); // eslint-disable-next-line import/prefer-default-export