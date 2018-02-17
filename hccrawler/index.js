const puppeteer = require('puppeteer');
const fs = require('fs');
const HCCrawler = require('headless-chrome-crawler');

let rawdata = fs.readFileSync('url.json');  
let urls = JSON.parse(rawdata); 

HCCrawler.launch({
  // Function to be evaluated in browsers
  evaluatePage: (() => ({
    title: $('title').text(),
  })),
  // Function to be called with evaluated results from browsers
  onSuccess: (result => {
    console.log(result);
  }),
})
  .then(crawler => {
    // Queue a request
    crawler.queue('https://example.com/');
    // Queue multiple requests
    crawler.queue(['https://example.net/', 'https://example.org/']);
    // Queue a request with custom options
    crawler.queue({
      url: 'https://example.com/',
      // Emulate a tablet device
      device: 'Nexus 7',
      // Enable screenshot by passing options
      screenshot: {
        path: './tmp/example-com.png'
      },
    });
    crawler.onIdle() // Resolved when no queue is left
      .then(() => crawler.close()); // Close the crawler
  });
