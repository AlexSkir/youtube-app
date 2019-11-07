"use strict";

var _onstart = require("./onstart");

var _app = require("./app");

var _nodesManager = require("./nodesManager");

/* eslint-disable import/no-cycle */

/* eslint-disable no-undef */

/* eslint-disable no-restricted-globals */

/* eslint-disable func-names */
//* resize event for responsive design
window.addEventListener('resize', // eslint-disable-next-line prettier/prettier
function () {
  const buts = _onstart.buttonSection.childNodes.length;
  const items = _onstart.itemsSection.childNodes.length;
  const multiplier = items / 15; //* counting how many requests were done
  //* switch from other devices to desktop

  if (screen.width > 800 && buts > 4 * multiplier) {
    _app.current.obj.nums = [];
    _app.current.obj.count = 0;
    const prevpage = _nodesManager.state.currentPage;
    (0, _nodesManager.deleteButtons)();

    _app.current.obj.countPages(_app.current.obj.len * multiplier, _app.current.obj.nums); //* switch from tablet to desktop


    if (buts < 9 * multiplier) {
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 0.5);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();

        if (prevpage % 2 === 0) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1040 * (curpage - 1) + 520)
            });
          }, 200);
        }
      }
    } else {
      //* switch from mobile to desktop
      const curpage = Math.ceil(+_nodesManager.state.currentPage / 4);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();

        if (prevpage % 4 === 0) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1040 * (curpage - 1) + 780)
            });
          }, 200);
        } else if (prevpage % 4 === 3) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1040 * (curpage - 1) + 520)
            });
          }, 200);
        } else if (prevpage % 4 === 2) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(1040 * (curpage - 1) + 260)
            });
          }, 200);
        }
      }
    }
  } else if (screen.width < 500 && items < 16 * multiplier && buts < 9 * multiplier) {
    //* switch from other devices to mobile
    _app.current.obj.nums = [];
    _app.current.obj.count = 0;
    (0, _nodesManager.deleteButtons)();

    _app.current.obj.countPages(_app.current.obj.len * multiplier, _app.current.obj.nums); //* from desktop to mobile


    if (buts < 5 * multiplier) {
      // eslint-disable-next-line prettier/prettier
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 4 - 3);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();
      }
    } else {
      //* from tablet to mobile
      // eslint-disable-next-line prettier/prettier
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 2 - 1);

      if (document.getElementById("pageButton".concat(curpage))) {
        document.getElementById("pageButton".concat(curpage)).click();
      }
    }
  } else if (screen.width > 500 && screen.width < 800 && items < 16 * multiplier && (buts < 5 * multiplier - multiplier + 1 || buts > 8 * multiplier - multiplier + 1)) {
    //* switch from other devices to tablet
    _app.current.obj.nums = [];
    _app.current.obj.count = 0;
    const prevpage = _nodesManager.state.currentPage;
    (0, _nodesManager.deleteButtons)();

    if (multiplier % 2 === 0) {
      _app.current.obj.countPages(_app.current.obj.len * multiplier - 1, _app.current.obj.nums);
    } else {
      _app.current.obj.countPages(_app.current.obj.len * multiplier, _app.current.obj.nums);
    } //* from desktop to tablet


    if (buts < 5 * multiplier) {
      // eslint-disable-next-line prettier/prettier
      const curpage = Math.ceil(+_nodesManager.state.currentPage * 2 - 1);

      if (document.getElementById("pageButton".concat(curpage))) {
        setTimeout(() => {
          document.getElementById("pageButton".concat(curpage)).click();
        }, 400);
      }
    } else {
      //* from mobile to tablet
      const curpage = Math.ceil(+_nodesManager.state.currentPage / 2);

      if (document.getElementById("pageButton".concat(curpage))) {
        setTimeout(() => {
          document.getElementById("pageButton".concat(curpage)).click();
        }, 300);

        if (prevpage % 2 === 0) {
          setTimeout(() => {
            _onstart.itemsSection.scrollTo({
              left: "".concat(520 * (curpage - 1) + 260)
            });
          }, 400);
        }
      }
    }
  }
}, false);