/* eslint-disable no-undef */
import { itemsSection } from './onstart';

//* build layout
function searchItemWrapper(data, i) {
  const item = document.createElement('div');
  const topPart = document.createElement('div');
  const infoBlock = document.createElement('div');
  const bottomPart = document.createElement('div');
  const iconPanel = document.createElement('div');
  const link = document.createElement('a');
  const title = document.createElement('div');
  const channelInfo = document.createElement('span');
  const channelIcon = document.createElement('i');
  const createdIcon = document.createElement('i');
  const createdInfo = document.createElement('span');
  const watchedInfo = document.createElement('span');
  const watchedIcon = document.createElement('i');
  const descriptionInfo = document.createElement('span');
  const descriptionIcon = document.createElement('i');
  item.className = 'seacrh-item';
  topPart.className = 'top-part';
  bottomPart.className = 'bottom-part';
  iconPanel.className = 'icon-panel';
  infoBlock.className = 'info-block';
  descriptionInfo.className = 'descriptionInfo hidden';
  descriptionIcon.className = 'descriptionIcon fas fa-info';
  channelIcon.className = 'channelIcon fas fa-at';
  createdIcon.className = 'createdIcon far fa-calendar-alt';
  channelInfo.className = 'channelInfo hidden';
  createdInfo.className = 'createdInfo hidden';
  topPart.style.backgroundImage = `url(${data.snippet.thumbnails.medium.url})`;
  title.className = 'title';
  title.innerHTML += data.snippet.title;
  link.href = `https://www.youtube.com/watch?v=${data.id.videoId}`;
  link.innerHTML = 'Watch now';
  link.target = '_blank';
  link.className = 'button-like-link';
  watchedInfo.className = 'watchedInfo hidden';
  watchedIcon.className = 'watchedIcon fas fa-eye';
  itemsSection.appendChild(item);
  item.appendChild(topPart);
  item.appendChild(bottomPart);
  topPart.appendChild(infoBlock);
  bottomPart.appendChild(title);
  bottomPart.appendChild(iconPanel);
  bottomPart.appendChild(link);
  iconPanel.appendChild(channelIcon);
  iconPanel.appendChild(createdIcon);
  iconPanel.appendChild(watchedIcon);
  iconPanel.appendChild(descriptionIcon);
  infoBlock.appendChild(channelInfo);
  channelInfo.innerHTML = `# ${data.snippet.channelTitle}`;
  infoBlock.appendChild(createdInfo);
  createdInfo.innerHTML = `created ${data.snippet.publishedAt.split('T')[0]}`;
  infoBlock.appendChild(watchedInfo);
  watchedInfo.id = `data${i}`;
  infoBlock.appendChild(descriptionInfo);
  if (data.snippet.description) {
    descriptionInfo.innerHTML += data.snippet.description;
  } else {
    descriptionInfo.innerHTML += 'No description yet...';
  }
  const icons = iconPanel.children;
  for (let k = 0; k < icons.length; k++) {
    icons[k].addEventListener('mouseenter', e => {
      e.target.classList.add('active-button');
      const parent = e.target.parentNode.parentNode.parentNode;
      const first = parent.firstChild;
      const bg = first.getElementsByClassName('info-block')[0];
      bg.classList.add('active-info-block');
      const targetClass = `${e.target.className.split('Icon')[0]}Info`;
      const target = first.getElementsByClassName(targetClass)[0];
      target.classList.remove('hidden');
    });
    icons[k].addEventListener('mouseleave', e => {
      e.target.classList.remove('active-button');
      const parent = e.target.parentNode.parentNode.parentNode;
      const first = parent.firstChild;
      const bg = first.getElementsByClassName('info-block')[0];
      bg.classList.remove('active-info-block');
      const targetClass = `${e.target.className.split('Icon')[0]}Info`;
      const target = first.getElementsByClassName(targetClass)[0];
      target.classList.add('hidden');
    });
  }
  link.addEventListener('touchend', () => {
    window.open(link.href, '_blank');
  });
}

//* add view statistics to clips
function viewersCounter(viewCount, i) {
  document.getElementById(`data${i}`).innerText = `${viewCount} views`;
}

//* create page with searching advice if nothing was found
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
  itemsSection.appendChild(nothing);
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
  keyWord.innerHTML = `${text}`;
  recomendation.innerHTML = 'Recommendations:';
  liFirst.innerHTML = 'Make sure all words are spelled correctly.';
  liSecond.innerHTML = 'Try using other keywords.';
  liThird.innerHTML = 'Try using more popular keywords.';
}

export { searchItemWrapper, viewersCounter, nothingFound };
