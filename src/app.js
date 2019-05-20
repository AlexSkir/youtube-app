/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { pageLoad, searchButton, inputArea, itemsSection, buttonSection } from './onstart';
import InfoLoader from './search';
import { deleteButtons, deleteItemsPages } from './nodesManager';
import scroll from './scroll';
import touchScroll from './touchscroll';

window.state = {
  currentPage: '',
  searchTags: ''
};

// loading search box
document.addEventListener('DOMContentLoaded', pageLoad);

inputArea.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    document.querySelector('button').click();
  }
});

// initialization of search request and DOM creating on search button click
searchButton.addEventListener('click', () => {
  const youtube = new InfoLoader();
  window.state.searchTags = inputArea.value;
  if (itemsSection.childNodes.length > 0 && buttonSection.childNodes.length > 0) {
    deleteButtons();
    deleteItemsPages();
  }
  if (inputArea.value !== '') {
    youtube.getResp(window.state.searchTags);
  }
  inputArea.value = '';
  document.getElementById('next').addEventListener('click', () => {
    youtube.getResp(window.state.searchTags);
  });
  scroll();
  touchScroll();
});
