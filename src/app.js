/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { pageLoad, searchButton, inputArea, searchSection } from './onstart';
import InfoLoader from './search';
import { deleteButtons, deleteItemsPages } from './nodesManager';
import { nothingFound } from './domBuilder';
import './resize';

const current = {
  searchTags: '',
  obj: ''
};

//* loading search box
document.addEventListener('DOMContentLoaded', pageLoad);

inputArea.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    document.querySelector('#searchButton').click();
  }
});

//* initialization of search request and DOM creating on search button click
searchButton.addEventListener('click', () => {
  if (inputArea.value !== '') {
    if (document.querySelector('.slider')) {
      document.querySelector('.slider').style.display = 'none';
    }
    //* delete old button for next requests
    if (document.getElementById('next')) {
      searchSection.removeChild(document.getElementById('next'));
    }
    const next = document.createElement('button'); //* create new button for next requests
    next.id = 'next';
    next.style.display = 'none';
    searchSection.appendChild(next);

    current.searchTags = inputArea.value;
    //* delete old buttons and clips
    deleteButtons();
    deleteItemsPages();
    const youtube = new InfoLoader();
    youtube.deleteOldData(); //* just in case
    current.obj = youtube;
    if (inputArea.value !== '') {
      setTimeout(() => {
        youtube.getResp(current.searchTags); //* load clips with keywords content
      }, 200);
      setTimeout(() => {
        if (current.obj.len === 0) {
          nothingFound(current.searchTags); //* if no data found load page with searching advice
        }
      }, 800);

      inputArea.value = '';
      document.getElementById('next').addEventListener('click', () => {
        setTimeout(() => {
          youtube.getResp(current.searchTags); //* if clicked - load next request's data
        }, 200);
      });
    }
  }
});

// eslint-disable-next-line import/prefer-default-export
export { current };
