import { launch, Browser } from "puppeteer";
import * as fs from "fs";

class Main{
  browser : Browser;
  url : string;
  constructor(){

  }

  async initialize(){
    this.browser = await launch({ headless: false });
    return this.browser;
  }

  readFile(){
    let rawdata = fs.readFileSync("url.json");
    this.url = "http://www.stilltasty.com/searchitems/search";
  }

  async parsePage(url, name , fullPage, elements){

    const page = await this.browser.newPage();

    //page.random_useragent();
    await page.goto(url);
   
    await page.screenshot({ path: "screenshots/" + name + ".jpg" , fullPage: fullPage, type: "jpeg"});

    if( elements){
      await Promise.all(elements.map(async (element) => {
        let el = await page.$(element);
        if(el){
          await el.screenshot({path: "screenshots/" + name + " " + element + ".jpg", type: "jpeg"});
        }
      }));
    }
    await page.close();
  }

  async processPages(){
    await Promise.all(this.urls.map(async (url) => {
      await this.parsePage(url.url, url.name ? url.name: url.url, url.fullPage ? url.fullPage : false, url.elements);
    }));
    await this.browser.close();
  }

  async processSearch(){
    await Promise.all(this.urls.map(async (url) => {
      await this.parsePage(url.url, url.name ? url.name: url.url, url.fullPage ? url.fullPage : false, url.elements);
    }));
    await this.browser.close();
  }

}

async function main() {
  var m = new Main();
  await m.initialize();
  await m.readFile();
  await m.processPages();
}

main();





