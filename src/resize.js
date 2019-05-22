/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */

import { itemsSection, buttonSection } from './onstart';
import { current } from './app';
import { state, deleteButtons } from './nodesManager';

//* resize event for responsive design
window.addEventListener(
  'resize',
  // eslint-disable-next-line prettier/prettier
  function () {
    const buts = buttonSection.childNodes.length;
    const items = itemsSection.childNodes.length;
    const multiplier = items / 15; //* counting how many requests were done
    //* switch from other devices to desktop
    if (screen.width > 800 && buts > 4 * multiplier) {
      current.obj.nums = [];
      current.obj.count = 0;
      const prevpage = state.currentPage;
      deleteButtons();
      current.obj.countPages(current.obj.len * multiplier, current.obj.nums);
      //* switch from tablet to desktop
      if (buts < 9 * multiplier) {
        const curpage = Math.ceil(+state.currentPage * 0.5);
        if (document.getElementById(`pageButton${curpage}`)) {
          document.getElementById(`pageButton${curpage}`).click();
          if (prevpage % 2 === 0) {
            setTimeout(() => {
              itemsSection.scrollTo({ left: `${1048 * (curpage - 1) + 524}` });
            }, 200);
          }
        }
      } else {
        //* switch from mobile to desktop
        const curpage = Math.ceil(+state.currentPage / 4);
        if (document.getElementById(`pageButton${curpage}`)) {
          document.getElementById(`pageButton${curpage}`).click();
          if (prevpage % 4 === 0) {
            setTimeout(() => {
              itemsSection.scrollTo({ left: `${1048 * (curpage - 1) + 786}` });
            }, 200);
          } else if (prevpage % 4 === 3) {
            setTimeout(() => {
              itemsSection.scrollTo({ left: `${1048 * (curpage - 1) + 524}` });
            }, 200);
          } else if (prevpage % 4 === 2) {
            setTimeout(() => {
              itemsSection.scrollTo({ left: `${1048 * (curpage - 1) + 262}` });
            }, 200);
          }
        }
      }
    } else if (screen.width < 500 && items < 16 * multiplier && buts < 9 * multiplier) {
      //* switch from other devices to mobile
      current.obj.nums = [];
      current.obj.count = 0;
      deleteButtons();
      current.obj.countPages(current.obj.len * multiplier, current.obj.nums);
      //* from desktop to mobile
      if (buts < 5 * multiplier) {
        // eslint-disable-next-line prettier/prettier
        const curpage = Math.ceil((+state.currentPage * 4) - 3);
        if (document.getElementById(`pageButton${curpage}`)) {
          document.getElementById(`pageButton${curpage}`).click();
        }
      } else {
        //* from tablet to mobile
        // eslint-disable-next-line prettier/prettier
        const curpage = Math.ceil((+state.currentPage * 2) - 1);
        if (document.getElementById(`pageButton${curpage}`)) {
          document.getElementById(`pageButton${curpage}`).click();
        }
      }
    } else if (
      screen.width > 500 &&
      screen.width < 800 &&
      items < 16 * multiplier &&
      (buts < 5 * multiplier - multiplier + 1 || buts > 8 * multiplier - multiplier + 1)
    ) {
      //* switch from other devices to tablet
      current.obj.nums = [];
      current.obj.count = 0;
      const prevpage = state.currentPage;
      deleteButtons();
      if (multiplier % 2 === 0) {
        current.obj.countPages(current.obj.len * multiplier - 1, current.obj.nums);
      } else {
        current.obj.countPages(current.obj.len * multiplier, current.obj.nums);
      }
      //* from desktop to tablet
      if (buts < 5 * multiplier) {
        // eslint-disable-next-line prettier/prettier
        const curpage = Math.ceil((+state.currentPage * 2) - 1);
        if (document.getElementById(`pageButton${curpage}`)) {
          setTimeout(() => {
            document.getElementById(`pageButton${curpage}`).click();
          }, 400);
        }
      } else {
        //* from mobile to tablet
        const curpage = Math.ceil(+state.currentPage / 2);
        if (document.getElementById(`pageButton${curpage}`)) {
          setTimeout(() => {
            document.getElementById(`pageButton${curpage}`).click();
          }, 300);
          if (prevpage % 2 === 0) {
            setTimeout(() => {
              itemsSection.scrollTo({ left: `${524 * (curpage - 1) + 262}` });
            }, 400);
          }
        }
      }
    }
  },
  false
);
