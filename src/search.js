/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { createButton } from './nodesManager';
import { searchItemWrapper, viewersCounter } from './searchItemWrapper';
import { size } from './onstart';

export default class InfoLoader {
  constructor() {
    this.baselink = 'https://www.googleapis.com/youtube/v3/';
    this.settings = 'AIzaSyC7FRrYzP8kouPJ8q4nxK3w6rQaHZP86Xk';
    this.maxRezult = 15;
    this.count = '';
    this.clips = [];
    this.nextPage = '';
    this.len = '';
    this.nums = [];
  }

  //* make url for clips information
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

  //* make url for statistic request (view statistic)
  makeUrlCount(videoId) {
    const urlOptions = { ...videoId };
    let url = `${this.baselink}videos?key=${this.settings}&part=statistics&id=`;
    for (const i in urlOptions) {
      url += `${urlOptions[i]},`;
    }
    this.url = url;
    return url.slice(0, -1);
  }

  //* sending request for clips
  getResp(endPoint) {
    fetch(this.makeUrl(endPoint))
      .then(res => res.json())
      .then(data => this.processData(data))
      .catch(err => console.error(err));
  }

  //* sending request for view statistic
  getRespCount(videoId, callback) {
    fetch(this.makeUrlCount(videoId))
      .then(res => res.json())
      .then(data => callback(data))
      .catch(err => console.error(err));
  }

  processData(data) {
    this.nextPage = data.nextPageToken;
    this.clips.push(...data.items);
    this.len = data.items.length;
    const videos = [];
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const videoId = item.id.videoId;
      if (document.getElementById('itemsSection').childNodes.length >= 15) {
        searchItemWrapper(item, `${data.items.indexOf(item) + this.clips.length - 15}`);
      } else {
        searchItemWrapper(item, data.items.indexOf(item));
      }
      videos.push(videoId);
    }
    this.countPages(this.len, this.nums); //* count and make pages

    //* fetching view statistics
    this.getRespCount(videos, viewCount => {
      for (let j = 0; j < viewCount.items.length; j++) {
        if (document.getElementById('itemsSection').childNodes.length > 15) {
          viewersCounter(viewCount.items[j].statistics.viewCount, `${j + this.clips.length - 15}`);
        } else {
          viewersCounter(viewCount.items[j].statistics.viewCount, j);
        }
      }
    });
  }

  countPages(len, nums) {
    let a = len;
    let lastPage;
    if (nums.length > 0) {
      lastPage = nums[nums.length - 1];
      // eslint-disable-next-line no-param-reassign
      nums = [];
    } else {
      lastPage = 0;
    }
    this.count = lastPage;
    //* creating pages according to screen width
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
      // eslint-disable-next-line no-lonely-if
      if (a > 1) {
        this.count++;
        nums.push(this.count);
        while (a > 2) {
          a -= 2;
          this.count++;
          nums.push(this.count);
        }
      }
    }
    for (let k = 0; k < nums.length; k++) {
      createButton(nums[k]);
    }
    this.nums = nums;
  }

  deleteOldData() {
    this.count = 0;
    this.clips = [];
    this.nextPage = '';
    this.len = '';
    this.nums = [];
  }
}
