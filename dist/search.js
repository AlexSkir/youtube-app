"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodesManager = require("./nodesManager");

var _domBuilder = require("./domBuilder");

var _onstart = require("./onstart");

/* eslint-disable no-console */

/* eslint-disable prefer-destructuring */

/* eslint-disable no-plusplus */

/* eslint-disable no-restricted-syntax */

/* eslint-disable guard-for-in */

/* eslint-disable no-sequences */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
class InfoLoader {
  constructor() {
    this.baselink = 'https://www.googleapis.com/youtube/v3/'; // this.settings = 'AIzaSyBr0QSoZYnVsiScWxGe92vJAaA-B-YnSD4'; extra-key
    // this.settings = 'AIzaSyAc3ZRCWgyToch5GHOpeJCKCPeDE-LY-z0'; extra-key

    this.settings = 'AIzaSyBhgMW0S1a7AdMt0Vq2BUjzSiJR0uZn7cA';
    this.maxRezult = 15;
    this.count = '';
    this.state = [];
    this.nextPage = '';
    this.len = '';
    this.nums = [];
  }

  makeUrl(endPoint) {
    const options = {
      type: 'video',
      part: 'snippet',
      maxResults: this.maxRezult,
      pageToken: this.nextPage
    };
    const urlOptions = { ...options
    };
    let url = "".concat(this.baselink, "search?key=").concat(this.settings, "&");

    for (const i in urlOptions) {
      url += "".concat(i, "=").concat(urlOptions[i], "&");
    }

    url += "q={".concat(endPoint, "}");
    return url.slice(0, -1);
  }

  makeUrlCount(videoId) {
    const urlOptions = { ...videoId
    };
    let url = "".concat(this.baselink, "videos?key=").concat(this.settings, "&part=statistics&id=");

    for (const i in urlOptions) {
      url += "".concat(urlOptions[i], ",");
    }

    this.url = url;
    return url.slice(0, -1);
  }

  getResp(endPoint) {
    fetch(this.makeUrl(endPoint)).then(res => res.json()).then(data => this.func(data)).catch(err => console.error(err));
  }

  getRespCount(videoId, callback) {
    fetch(this.makeUrlCount(videoId)).then(res => res.json()).then(data => callback(data)).catch(err => console.error(err));
  }

  func(data) {
    this.nextPage = data.nextPageToken;
    this.state.push(...data.items);
    this.len = data.items.length;
    const videos = [];

    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const videoId = item.id.videoId;

      if (document.getElementById('itemsSection').childNodes.length >= 15) {
        (0, _domBuilder.domBuilder)(item, "".concat(data.items.indexOf(item) + this.state.length - 15));
      } else {
        (0, _domBuilder.domBuilder)(item, data.items.indexOf(item));
      }

      videos.push(videoId);
    }

    this.countPages(this.len, this.nums); // fetching view statistics

    this.getRespCount(videos, viewCount => {
      for (let j = 0; j < viewCount.items.length; j++) {
        if (document.getElementById('itemsSection').childNodes.length > 15) {
          (0, _domBuilder.viewersCounter)(viewCount.items[j].statistics.viewCount, "".concat(j + this.state.length - 15));
        } else {
          (0, _domBuilder.viewersCounter)(viewCount.items[j].statistics.viewCount, j);
        }
      }
    });
  }

  countPages(len, nums) {
    const items = document.getElementById('itemsSection').childNodes.length;
    let a;

    if (items > 15 && items / 15 % 2 === 0 && len !== 15) {
      a = len - 1;
    } else {
      a = len;
    }

    let length;

    if (nums.length > 0) {
      length = nums[nums.length - 1]; // eslint-disable-next-line no-param-reassign

      nums = [];
    } else {
      length = 0;
    }

    this.count = length;

    if (_onstart.size > 800) {
      if (a > 4) {
        this.count++;
        nums.push(this.count);

        while (a > 4) {
          a -= 4;
          this.count++;
          nums.push(this.count);
        }
      }
    } else if (_onstart.size < 500) {
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
      (0, _nodesManager.createButton)(nums[k]);
    }

    this.nums = nums;
  }

  deleteOldData() {
    this.count = 0;
    this.state = [];
    this.nextPage = '';
    this.len = '';
    this.nums = [];
  }

}

exports.default = InfoLoader;