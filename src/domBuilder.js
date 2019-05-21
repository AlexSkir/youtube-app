/* eslint-disable no-console */
/* eslint-disable no-undef */
import { itemsSection } from './onstart';

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
  topPart.style.backgroundImage = `url(${data.snippet.thumbnails.medium.url})`;
  link.className = 'link';
  title.className = 'title';
  title.innerHTML += data.snippet.title;
  link.href = `https://www.youtube.com/watch?v=${data.id.videoId}`;
  link.innerHTML = 'Watch on youtube';
  link.target = '_blank';
  watch.className = 'watch';
  watchedCount.className = 'watchedCount';
  watchedIcon.className = 'fas fa-eye';
  itemsSection.appendChild(div);
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
  watchedCount.id = `data${i}`;
  bottomPart.appendChild(description);
  if (data.snippet.description) {
    description.innerHTML += data.snippet.description;
  } else {
    description.innerHTML += 'No description yet...';
  }
  link.addEventListener('touchend', () => {
    window.open(link.href, '_blank');
  });
}

function viewersCounter(viewCount, i) {
  document.getElementById(`data${i}`).innerText = viewCount;
}
export { domBuilder, viewersCounter };
