"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scroll;

/* eslint-disable no-undef */
function scroll() {
  const scrolled = document.getElementById('itemsSection');
  let page;
  let firstPoint;
  let lastPoint;

  function end(e) {
    lastPoint = e.pageX;
    const dif = firstPoint - lastPoint;

    if (dif > 20 && dif < 400) {
      scrolled.removeEventListener('mousemove', end);
      document.getElementById("pageButton".concat(+page + 1)).click();
    }

    if (dif < -20 && dif > -400) {
      scrolled.removeEventListener('mousemove', end);
      document.getElementById("pageButton".concat(+page - 1)).click();
    }

    return false;
  }

  function start(e) {
    page = document.getElementsByClassName('active')[0].innerHTML;
    firstPoint = e.pageX;
    scrolled.addEventListener('mousemove', end, false);
  }

  scrolled.addEventListener('mousedown', start, false);
  window.addEventListener('mouseup', () => {
    scrolled.removeEventListener('mousemove', end, false);
  });
}