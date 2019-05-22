/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import {
  pageLoad,
  searchButton,
  inputArea,
  itemsSection,
  buttonSection,
  searchSection
} from './onstart';
import InfoLoader from './search';
import { deleteButtons, deleteItemsPages, state } from './nodesManager';

window.state = {
  searchTags: '',
  obj: ''
};

// loading search box
document.addEventListener('DOMContentLoaded', pageLoad);

inputArea.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    document.querySelector('button').click();
  }
});

window.addEventListener(
  'resize',
  // eslint-disable-next-line prettier/prettier
  function () {
    const buts = buttonSection.childNodes.length;
    const items = itemsSection.childNodes.length;
    const multiplier = items / 15;
    if (screen.width > 800 && items < 16 * multiplier && buts > 4 * multiplier) {
      window.state.obj.nums = [];
      window.state.obj.count = 0;
      const prevpage = state.currentPage;
      deleteButtons();
      window.state.obj.countPages(window.state.obj.len * multiplier, window.state.obj.nums);
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
      window.state.obj.nums = [];
      window.state.obj.count = 0;
      deleteButtons();
      window.state.obj.countPages(window.state.obj.len * multiplier, window.state.obj.nums);
      if (buts < 5 * multiplier) {
        // eslint-disable-next-line prettier/prettier
        const curpage = Math.ceil((+state.currentPage * 4) - 3);
        if (document.getElementById(`pageButton${curpage}`)) {
          document.getElementById(`pageButton${curpage}`).click();
        }
      } else {
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
      window.state.obj.nums = [];
      window.state.obj.count = 0;
      const prevpage = state.currentPage;
      deleteButtons();
      if (multiplier % 2 === 0) {
        window.state.obj.countPages(window.state.obj.len * multiplier - 1, window.state.obj.nums);
      } else {
        window.state.obj.countPages(window.state.obj.len * multiplier, window.state.obj.nums);
      }
      if (buts < 5 * multiplier) {
        // eslint-disable-next-line prettier/prettier
        const curpage = Math.ceil((+state.currentPage * 2) - 1);
        if (document.getElementById(`pageButton${curpage}`)) {
          setTimeout(() => {
            document.getElementById(`pageButton${curpage}`).click();
          }, 200);
        }
      } else {
        const curpage = Math.ceil(+state.currentPage / 2);
        if (document.getElementById(`pageButton${curpage}`)) {
          setTimeout(() => {
            document.getElementById(`pageButton${curpage}`).click();
          }, 200);
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

// initialization of search request and DOM creating on search button click
window.addEventListener('click', e => {
  if (e.target === searchButton) {
    if (document.getElementById('next')) {
      searchSection.removeChild(document.getElementById('next'));
    }
    const next = document.createElement('button');
    next.id = 'next';
    next.style.display = 'none';
    searchSection.appendChild(next);

    window.state.searchTags = inputArea.value;
    deleteButtons();
    deleteItemsPages();
    const youtube = new InfoLoader();
    youtube.deleteOldData();
    window.state.obj = youtube;
    if (inputArea.value !== '') {
      setTimeout(() => {
        youtube.getResp(window.state.searchTags);
      }, 200);
    }
    inputArea.value = '';
    document.getElementById('next').addEventListener('click', () => {
      setTimeout(() => {
        youtube.getResp(window.state.searchTags);
      }, 200);
    });
  }
});
