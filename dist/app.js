"use strict";

var _onstart = require("./onstart");

var _search = _interopRequireDefault(require("./search"));

var _nodesManager = require("./nodesManager");

var _domBuilder = require("./domBuilder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-restricted-globals */

/* eslint-disable func-names */

/* eslint-disable prefer-destructuring */

/* eslint-disable no-plusplus */

/* eslint-disable no-undef */
window.state = {
  searchTags: '',
  obj: ''
}; // loading search box

document.addEventListener('DOMContentLoaded', _onstart.pageLoad);

_onstart.inputArea.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    document.querySelector('button').click();
  }
});

window.addEventListener('resize', // eslint-disable-next-line prettier/prettier
function () {
  const buts = _onstart.buttonSection.childNodes.length;
  const items = _onstart.itemsSection.childNodes.length;
  const multiplier = items / 15;

  if (screen.width > 800 && items < 16 * multiplier && buts > 4 * multiplier) {
    window.state.obj.nums = [];
    window.state.obj.count = 0;
    const prevpage = _nodesManager.state.currentPage;
    (0, _nodesManager.deleteButtons)();
    window.state.obj.countPages(window.state.obj.len * multiplier, window.state.obj.nums);

    if (buts < 9 * multiplier) {
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 0.5);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();

        if (prevpage % 2 === 0) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1048 * (curpage - 1) + 524)
            });
          }, 200);
        }
      }
    } else {
      const curpage = Math.ceil(+_nodesManager.state.currentPage / 4);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();

        if (prevpage % 4 === 0) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1048 * (curpage - 1) + 786)
            });
          }, 200);
        } else if (prevpage % 4 === 3) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1048 * (curpage - 1) + 524)
            });
          }, 200);
        } else if (prevpage % 4 === 2) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1048 * (curpage - 1) + 262)
            });
          }, 200);
        }
      }
    }
  } else if (screen.width < 500 && items < 16 * multiplier && buts < 9 * multiplier) {
    window.state.obj.nums = [];
    window.state.obj.count = 0;
    (0, _nodesManager.deleteButtons)();
    window.state.obj.countPages(window.state.obj.len * multiplier, window.state.obj.nums);

    if (buts < 5 * multiplier) {
      // eslint-disable-next-line prettier/prettier
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 4 - 3);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();
      }
    } else {
      // eslint-disable-next-line prettier/prettier
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 2 - 1);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();
      }
    }
  } else if (screen.width > 500 && screen.width < 800 && items < 16 * multiplier && (buts < 5 * multiplier - multiplier + 1 || buts > 8 * multiplier - multiplier + 1)) {
    window.state.obj.nums = [];
    window.state.obj.count = 0;
    const prevpage = _nodesManager.state.currentPage;
    (0, _nodesManager.deleteButtons)();

    if (multiplier % 2 === 0) {
      window.state.obj.countPages(window.state.obj.len * multiplier - 1, window.state.obj.nums);
    } else {
      window.state.obj.countPages(window.state.obj.len * multiplier, window.state.obj.nums);
    }

    if (buts < 5 * multiplier) {
      // eslint-disable-next-line prettier/prettier
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 2 - 1);

      if (document.getElementById("pageButton".concat(curpage))) {
        setTimeout(() => {
          document.getElementById("pageButton".concat(curpage)).click();
        }, 400);
      }
    } else {
      const curpage = Math.ceil(+_nodesManager.state.currentPage / 2);

      if (document.getElementById("pageButton".concat(curpage))) {
        setTimeout(() => {
          document.getElementById("pageButton".concat(curpage)).click();
        }, 300);

        if (prevpage % 2 === 0) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(524 * (curpage - 1) + 262)
            });
          }, 400);
        }
      }
    }
  }
}, false); // initialization of search request and DOM creating on search button click

window.addEventListener('click', e => {
  if (e.target === _onstart.searchButton) {
    if (document.getElementById('next')) {
      _onstart.searchSection.removeChild(document.getElementById('next'));
    }

    const next = document.createElement('button');
    next.id = 'next';
    next.style.display = 'none';

    _onstart.searchSection.appendChild(next);

    window.state.searchTags = _onstart.inputArea.value;
    (0, _nodesManager.deleteButtons)();
    (0, _nodesManager.deleteItemsPages)();
    const youtube = new _search.default();
    youtube.deleteOldData();
    window.state.obj = youtube;

    if (_onstart.inputArea.value !== '') {
      setTimeout(() => {
        youtube.getResp(window.state.searchTags);
      }, 200);
      setTimeout(() => {
        if (window.state.obj.len === 0) {
          (0, _domBuilder.nothingFound)(window.state.searchTags);
        }
      }, 800);
    }

    _onstart.inputArea.value = '';
    document.getElementById('next').addEventListener('click', () => {
      setTimeout(() => {
        youtube.getResp(window.state.searchTags);
      }, 200);
    });
  }
});