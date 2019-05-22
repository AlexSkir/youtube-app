"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domBuilder = domBuilder;
exports.viewersCounter = viewersCounter;
exports.nothingFound = nothingFound;

var _onstart = require("./onstart");

/* eslint-disable no-console */

/* eslint-disable no-undef */
//* build layout
function domBuilder(data, i) {
  const div = document.createElement('div');
  const topPart = document.createElement('div');
  const bottomPart = document.createElement('div');
  const link = document.createElement('a');
  const title = document.createElement('span');
  const channelName = document.createElement('span');
  const channelIcon = document.createElement('i');
  const createdIcon = document.createElement('i');
  const createDate = document.createElement('span');
  const watch = document.createElement('div');
  const watchedCount = document.createElement('span');
  const watchedIcon = document.createElement('i');
  const description = document.createElement('span');
  div.className = 'block';
  topPart.className = 'topPart';
  bottomPart.className = 'bottomPart';
  description.className = 'description';
  channelIcon.className = 'fas fa-at';
  createdIcon.className = 'far fa-calendar-alt';
  channelName.className = 'channel';
  createDate.className = 'createDate';
  topPart.style.backgroundImage = "url(".concat(data.snippet.thumbnails.medium.url, ")");
  link.className = 'link';
  title.className = 'title';
  title.innerHTML += data.snippet.title;
  link.href = "https://www.youtube.com/watch?v=".concat(data.id.videoId);
  link.innerHTML = 'Watch on youtube';
  link.target = '_blank';
  watch.className = 'watch';
  watchedCount.className = 'watchedCount';
  watchedIcon.className = 'fas fa-eye';

  _onstart.itemsSection.appendChild(div);

  div.appendChild(topPart);
  div.appendChild(bottomPart);
  topPart.appendChild(title);
  title.appendChild(link);
  bottomPart.appendChild(channelName);
  channelName.appendChild(channelIcon);
  channelName.innerHTML += data.snippet.channelTitle;
  bottomPart.appendChild(createDate);
  createDate.appendChild(createdIcon);
  createDate.innerHTML += data.snippet.publishedAt.split('T')[0];
  bottomPart.appendChild(watchedCount);
  bottomPart.appendChild(watch);
  watch.appendChild(watchedIcon);
  watch.appendChild(watchedCount);
  watchedCount.id = "data".concat(i);
  bottomPart.appendChild(description);

  if (data.snippet.description) {
    description.innerHTML += data.snippet.description;
  } else {
    description.innerHTML += 'No description yet...';
  }

  link.addEventListener('touchend', () => {
    window.open(link.href, '_blank');
  });
} //* add view statistics to clips


function viewersCounter(viewCount, i) {
  document.getElementById("data".concat(i)).innerText = viewCount;
} //* create page with searching advice if nothing was found


function nothingFound(text) {
  const nothing = document.createElement('div');
  const noText = document.createElement('ul');
  const liFirst = document.createElement('li');
  const liSecond = document.createElement('li');
  const liThird = document.createElement('li');
  const noIcon = document.createElement('i');
  const noTitle = document.createElement('div');
  const titleText = document.createElement('span');
  const recomendation = document.createElement('span');
  const keyWord = document.createElement('span');
  nothing.className = 'nothingFound';
  noIcon.className = 'far fa-frown';
  noTitle.className = 'noTitle';
  titleText.className = 'titleText';
  recomendation.className = 'recomendation';
  noText.className = 'noText';
  keyWord.className = 'keyWord';

  _onstart.itemsSection.appendChild(nothing);

  nothing.appendChild(noIcon);
  nothing.appendChild(noTitle);
  noTitle.appendChild(titleText);
  noTitle.appendChild(keyWord);
  nothing.appendChild(recomendation);
  nothing.appendChild(noText);
  noText.appendChild(liFirst);
  noText.appendChild(liSecond);
  noText.appendChild(liThird);
  titleText.innerHTML = 'No results found for ';
  keyWord.innerHTML = "".concat(text);
  recomendation.innerHTML = 'Recommendations:';
  liFirst.innerHTML = 'Make sure all words are spelled correctly.';
  liSecond.innerHTML = 'Try using other keywords.';
  liThird.innerHTML = 'Try using more popular keywords.';
}