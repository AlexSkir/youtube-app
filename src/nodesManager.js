/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import { size, buttonSection, itemsSection } from './onstart';

const state = {
  currentPage: '',
  pages: ''
};

//* function to highlight active button, hide redundant buttons and show the nearest
function showButtons(number, a, e) {
  state.currentPage = number;
  for (let i = 0; i < a.length; i++) {
    a[i].classList.remove('active');
  }
  document.getElementById(`pageButton${number}`).classList.add('active');
  if (e.target.classList.contains('active')) {
    for (let k = 0; k < buttonSection.childNodes.length; k++) {
      buttonSection.childNodes[k].innerHTML = '';
    }
    e.target.innerHTML = number; //* pop out the number of current page
  }
  //* if the current page is one to final - load more clips
  if (state.pages - state.currentPage === 1) {
    document.getElementById('next').click();
  }
  if (state.currentPage > 3) {
    //* hide the first buttons, show the nearest
    const buttonsToHide = document.getElementsByClassName('pageButton');
    for (let r = 0; r < buttonsToHide.length; r++) {
      buttonsToHide[r].classList.add('hidden');
    }
    document.getElementById(`pageButton${number - 1}`).classList.remove('hidden');
    document.getElementById(`pageButton${number}`).classList.remove('hidden');
    document.getElementById(`pageButton${number + 1}`).classList.remove('hidden');
    if (document.getElementById(`pageButton${number + 2}`)) {
      document.getElementById(`pageButton${number + 2}`).classList.remove('hidden');
    }
  } else if (state.currentPage < 5) {
    //* hide farthest buttons, show the first
    const buttonsToHide = document.getElementsByClassName('pageButton');
    for (let r = 0; r < buttonsToHide.length; r++) {
      buttonsToHide[r].classList.add('hidden');
    }
    document.getElementById('pageButton1').classList.remove('hidden');
    document.getElementById('pageButton2').classList.remove('hidden');
    document.getElementById('pageButton3').classList.remove('hidden');
    document.getElementById('pageButton4').classList.remove('hidden');
  }
  //* when click the button sroll depends on device width
  if (size > 800) {
    itemsSection.scrollTo({ left: `${1048 * (number - 1)}`, behavior: 'smooth' });
  } else if (size < 500) {
    itemsSection.scrollTo({ left: `${262 * (number - 1)}`, behavior: 'smooth' });
  } else {
    itemsSection.scrollTo({ left: `${524 * (number - 1)}`, behavior: 'smooth' });
  }
}

//* function for creation buttons
function createButton(number) {
  if (state.currentPage === '') {
    state.currentPage = 1;
  }
  state.pages = number;
  const pageButton = document.createElement('button');
  pageButton.className = 'pageButton';
  pageButton.classList.add('hidden');
  if (document.getElementsByClassName('pageButton').length < 4) {
    pageButton.classList.remove('hidden');
  }
  buttonSection.appendChild(pageButton);
  pageButton.id = `pageButton${number}`;
  //* if app was just started, the first button would be active
  const activeButton = document.getElementsByClassName('active');
  if (activeButton.length === 0) {
    document.getElementById('pageButton1').classList.add('active');
    document.getElementById('pageButton1').innerHTML = '1';
  }
  //* add listener 'click' on buttons to scroll pages
  document.getElementById(`pageButton${number}`).addEventListener(
    'click',
    event => {
      showButtons(number, activeButton, event);
    },
    false
  );
}

//* delete all buttons if new request
function deleteButtons() {
  while (buttonSection.firstChild) {
    buttonSection.removeChild(buttonSection.firstChild);
  }
}
//* delete al clips if new request
function deleteItemsPages() {
  state.currentPage = '';
  state.pages = '';
  while (itemsSection.firstChild) {
    itemsSection.removeChild(itemsSection.firstChild);
  }
}

export { state, createButton, deleteButtons, deleteItemsPages };
