/* eslint-disable no-undef */
import { itemsSection } from './onstart';

export default function scroll() {
  const scrolled = itemsSection;
  let page;
  let firstPoint;
  let lastPoint;
  function end(e) {
    lastPoint = e.pageX;
    const dif = firstPoint - lastPoint;
    if (dif > 20 && dif < 400) {
      document.getElementById(`pageButton${+page + 1}`).click();
      scrolled.removeEventListener('mousemove', end);
    }
    if (dif < -20 && dif > -400) {
      document.getElementById(`pageButton${+page - 1}`).click();
      scrolled.removeEventListener('mousemove', end);
    }
    return false;
  }
  function start(e) {
    page = document.getElementsByClassName('active')[0].innerHTML;
    firstPoint = e.pageX;
    scrolled.addEventListener('mousemove', end);
  }
  scrolled.addEventListener('mousedown', start);
  window.addEventListener('mouseup', () => {
    scrolled.removeEventListener('mousemove', end);
  });
}
