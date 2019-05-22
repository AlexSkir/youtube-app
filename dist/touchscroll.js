"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = touchScroll;

var _onstart = require("./onstart");

/* eslint-disable no-undef */
function touchScroll() {
  const scrolled = _onstart.itemsSection;
  let page;
  let firstPoint;
  let lastPoint;

  function end(e) {
    lastPoint = e.changedTouches["".concat(e.changedTouches.length - 1)].pageX;
    const dif = firstPoint - lastPoint;

    if (dif > 20 && dif < 400) {
      document.getElementById("pageButton".concat(+page + 1)).click();
      scrolled.removeEventListener('touchmove', end);
    }

    if (dif < -20 && dif > -400) {
      document.getElementById("pageButton".concat(+page - 1)).click();
      scrolled.removeEventListener('touchmove', end);
    }
  }

  function start(e) {
    e.preventDefault();
    page = document.getElementsByClassName('active')[0].innerHTML;
    firstPoint = e.changedTouches[0].pageX;
    scrolled.addEventListener('touchmove', end, {
      passive: false
    });
  }

  scrolled.addEventListener('touchstart', start, {
    passive: false
  });
  scrolled.addEventListener('touchend', () => {
    scrolled.removeEventListener('touchmove', end);
  });
}