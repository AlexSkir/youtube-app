"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageLoad = pageLoad;
exports.searchSection = exports.buttonSection = exports.itemsSection = exports.inputArea = exports.searchButton = exports.size = void 0;

var _scroll = _interopRequireDefault(require("./scroll"));

var _touchscroll = _interopRequireDefault(require("./touchscroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
const container = document.createElement('div');
container.className = 'container';
container.id = 'container';
const header = document.createElement('div');
header.className = 'header';
const footer = document.createElement('div');
footer.className = 'footer';
const banner = document.createElement('div');
banner.className = 'banner';
const logoSection = document.createElement('div');
logoSection.className = 'logo-block';
const youtubeIcon = document.createElement('i');
youtubeIcon.className = 'fab fa-youtube';
const logoText = document.createElement('span');
logoText.innerText = 'YouTube app';
const headerTitle = document.createElement('h1');
headerTitle.className = 'header-title';
headerTitle.innerText = 'What are you looking for?';
const searchSection = document.createElement('div');
exports.searchSection = searchSection;
searchSection.className = 'search';
const searchButton = document.createElement('button');
exports.searchButton = searchButton;
searchButton.className = 'search-button';
searchButton.id = 'searchButton';
searchButton.type = 'button';
searchButton.innerText = 'search';
const inputArea = document.createElement('input');
exports.inputArea = inputArea;
inputArea.className = 'input-area';
inputArea.placeholder = 'keyword, name, channel, ...';
inputArea.value = '';
let size = screen.width;
exports.size = size;
const aboutBlock = document.createElement('div');
aboutBlock.className = 'about-block';
const aboutText = document.createElement('div');
aboutText.className = 'about-description';
const aboutTitle1 = document.createElement('h1');
aboutTitle1.innerText = 'welcome';
const aboutTitle2 = document.createElement('h3');
aboutTitle2.innerText = 'to our portal';
const aboutParagraph = document.createElement('p');
aboutParagraph.innerText = 'This site is designed for quick and easy search of YouTube content. Search results contain detailed information about the video: channel name, creation date, number of views, description. When scrolling a page, additional videos are loaded by keywords. Enjoy our advertizement-free app with fully responsive design!';
const aboutImageWrapper = document.createElement('div');
aboutImageWrapper.className = 'image-wrapper';
const aboutImage = document.createElement('img');
aboutImage.src = './src/images/example.png';
const footerTitle = document.createElement('h1');
footerTitle.innerText = 'Follow us on';
const footerIcons = document.createElement('div');
const footerTwitter = document.createElement('div');
const footerPin = document.createElement('div');
const footerDribble = document.createElement('div');
const twitterIcon = document.createElement('i');
const pinIcon = document.createElement('i');
const dribbleIcon = document.createElement('i');
const twitterLink = document.createElement('a');
const pinLink = document.createElement('a');
const dribbleLink = document.createElement('a');
twitterLink.href = 'https://twitter.com/';
pinLink.href = 'https://www.pinterest.ru/';
dribbleLink.href = 'https://dribbble.com/';
twitterLink.target = '_blank';
pinLink.target = '_blank';
dribbleLink.target = '_blank';
const itemsSection = document.createElement('div');
exports.itemsSection = itemsSection;
itemsSection.className = 'itemsSection hidden';
itemsSection.id = 'itemsSection';
const buttonSection = document.createElement('div');
exports.buttonSection = buttonSection;
buttonSection.className = 'buttonSection hidden';
footerTitle.className = 'footer-title';
footerIcons.className = 'footer-icons-block';
footerTwitter.className = 'footer-icon';
footerPin.className = 'footer-icon';
footerDribble.className = 'footer-icon';
twitterIcon.className = 'fab fa-twitter';
pinIcon.className = 'fab fa-pinterest-p';
dribbleIcon.className = 'fab fa-dribbble'; //* create layout for search request

function pageLoad() {
  document.body.appendChild(container);
  container.appendChild(header);
  container.appendChild(aboutBlock);
  container.appendChild(itemsSection);
  container.appendChild(buttonSection);
  container.appendChild(footer);
  header.appendChild(logoSection);
  header.appendChild(banner);
  banner.appendChild(searchSection);
  banner.appendChild(headerTitle);
  logoSection.appendChild(logoText);
  logoSection.insertBefore(youtubeIcon, logoText);
  searchSection.appendChild(inputArea);
  searchSection.insertBefore(searchButton, inputArea);
  aboutBlock.appendChild(aboutText);
  aboutText.appendChild(aboutTitle1);
  aboutText.appendChild(aboutTitle2);
  aboutText.appendChild(aboutParagraph);
  aboutBlock.appendChild(aboutImageWrapper);
  aboutImageWrapper.appendChild(aboutImage);
  footer.appendChild(footerTitle);
  footer.appendChild(footerIcons);
  footerIcons.appendChild(footerTwitter);
  footerIcons.appendChild(footerPin);
  footerIcons.appendChild(footerDribble);
  footerTwitter.appendChild(twitterLink);
  footerPin.appendChild(pinLink);
  footerDribble.appendChild(dribbleLink);
  twitterLink.appendChild(twitterIcon);
  pinLink.appendChild(pinIcon);
  dribbleLink.appendChild(dribbleIcon); //* initialising scroll event

  (0, _scroll.default)();
  (0, _touchscroll.default)();
}

window.addEventListener('resize', () => {
  exports.size = size = screen.width;
});