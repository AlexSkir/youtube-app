/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { pageLoad, searchButton, inputArea } from './onstart';
import InfoLoader from './search';
import { deleteButtons, deleteItemsPages } from './nodesManager';
// import './events';

window.state = {
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
window.addEventListener('click', e => {
  if (e.target === searchButton) {
    window.state.searchTags = inputArea.value;
    deleteButtons();
    deleteItemsPages();
    const youtube = new InfoLoader();
    youtube.deleteOldData();
    if (inputArea.value !== '') {
      youtube.getResp(window.state.searchTags);
    }
    inputArea.value = '';
    document.getElementById('next').addEventListener('click', () => {
      youtube.getResp(window.state.searchTags);
    });
  }
});
