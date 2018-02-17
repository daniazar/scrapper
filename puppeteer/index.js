const puppeteer = require('puppeteer');
const fs = require('fs');
var random_useragent = require('random-useragent');

let rawdata = fs.readFileSync('url.json');  
let urls = JSON.parse(rawdata); 

function parsePage(browser, url, name , fullPage, elements){

  const page = await browser.newPage();
  page.random_useragent();
  await page.goto(url);
  await page.screenshot({ path: 'screenshots/' + name , fullPage: fullPage});
  if( elements){
    elements.forEach(element => {
      const  el = page.$(element);
      await elementHandle.screenshot({path: 'screenshots/' + name + '/' + element});
    });

  }
  page.close();

}



async function run() {
  const browser = await puppeteer.launch();
  urls.forEach(url => {
    await parsePage(browser, url.url, url.name ? url.name: url.url, url.fullPage ? url.fullPage : false, url.elements);
    
  });
  browser.close();
}


run();