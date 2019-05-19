/* eslint-disable no-undef */
import { itemsSection } from './onstart';
import { state } from './nodesManager';

export default function touchScroll() {
  const scrolled = itemsSection;
  let firstPoint;
  let lastPoint;
  function end(e) {
    lastPoint = e.changedTouches[`${e.changedTouches.length - 1}`].pageX;
    const dif = firstPoint - lastPoint;
    if (dif > 20 && dif < 400) {
      document.getElementById(`pageButton${state.currentPage + 1}`).click();
      scrolled.removeEventListener('touchmove', end);
    }
    if (dif < -20 && dif > -400) {
      document.getElementById(`pageButton${state.currentPage - 1}`).click();
      scrolled.removeEventListener('touchmove', end);
    }
  }
  function start(e) {
    e.preventDefault();
    firstPoint = e.changedTouches[0].pageX;
    scrolled.addEventListener('touchmove', end, { passive: false });
  }
  scrolled.addEventListener('touchstart', start, { passive: false });
  scrolled.addEventListener('touchend', () => {
    scrolled.removeEventListener('touchmove', end);
  });
}
