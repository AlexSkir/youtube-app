/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createButton } from './nodesManager';
import { domBuilder, viewersCounter } from './domBuilder';
import { size } from './onstart';

export default class InfoLoader {
  constructor() {
    this.baselink = 'https://www.googleapis.com/youtube/v3/';
    // this.settings = 'AIzaSyBr0QSoZYnVsiScWxGe92vJAaA-B-YnSD4'; extra-key
    // this.settings = 'AIzaSyAc3ZRCWgyToch5GHOpeJCKCPeDE-LY-z0'; extra-key
    this.settings = 'AIzaSyBhgMW0S1a7AdMt0Vq2BUjzSiJR0uZn7cA';
    this.maxRezult = 15;
    this.count = 0;
    this.sate = [];
    this.nextPage = '';
    this.len = '';
  }

  makeUrl(endPoint) {
    const options = {
      type: 'video',
      part: 'snippet',
      maxResults: this.maxRezult,
      pageToken: this.nextPage
    };
    const urlOptions = { ...options };
    let url = `${this.baselink}search?key=${this.settings}&`;
    for (const i in urlOptions) {
      url += `${i}=${urlOptions[i]}&`;
    }
    url += `q={${endPoint}}`;
    return url.slice(0, -1);
  }

  makeUrlCount(videoId) {
    const urlOptions = { ...videoId };
    let url = `${this.baselink}videos?key=${this.settings}&part=statistics&id=`;
    for (const i in urlOptions) {
      url += `${urlOptions[i]},`;
    }
    this.url = url;
    return url.slice(0, -1);
  }

  getResp(endPoint) {
    fetch(this.makeUrl(endPoint))
      .then(res => res.json())
      .then(data => this.func(data))
      .catch(err => console.error(err));
  }

  getRespCount(videoId, callback) {
    fetch(this.makeUrlCount(videoId))
      .then(res => res.json())
      .then(data => callback(data))
      .catch(err => console.error(err));
  }

  func(data) {
    this.nextPage = data.nextPageToken;
    this.sate.push(data.items);
    this.len = data.items.length;
    const nums = [];
    const videos = [];
    this.countPages(this.len, nums);
    for (let k = 0; k < nums.length; k++) {
      createButton(nums[k]);
    }
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const videoId = item.id.videoId;
      if (document.getElementById('itemsSection').childNodes.length >= 15) {
        domBuilder(item, `${data.items.indexOf(item) + this.sate.length}`);
      } else {
        domBuilder(item, data.items.indexOf(item));
      }
      videos.push(videoId);
    }
    // fetching view statistics
    this.getRespCount(videos, viewCount => {
      for (let j = 0; j < viewCount.items.length; j++) {
        if (document.getElementById('itemsSection').childNodes.length > 15) {
          viewersCounter(viewCount.items[j].statistics.viewCount, `${j + this.sate.length}`);
        } else {
          viewersCounter(viewCount.items[j].statistics.viewCount, j);
        }
      }
    });
  }

  countPages(len, nums) {
    let a = len;
    if (size > 800) {
      if (a > 4) {
        this.count++;
        nums.push(this.count);
        while (a > 4) {
          a -= 4;
          this.count++;
          nums.push(this.count);
        }
      }
    } else if (size < 500) {
      if (a > 1) {
        this.count++;
        nums.push(this.count);
        while (a > 1) {
          a -= 1;
          this.count++;
          nums.push(this.count);
        }
      }
    } else {
      this.count++;
      nums.push(this.count);
      while (a > 2) {
        a -= 2;
        this.count++;
        nums.push(this.count);
      }
    }
  }
}
