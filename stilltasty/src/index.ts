import { launch, Browser } from "puppeteer";
import * as fs from "fs";

class Main{
  browser : Browser;
  url : string;
  element : string;
  category : string;
  constructor(){

  }

  async initialize(){
    this.url = "http://www.stilltasty.com/searchitems/search";
    this.category = "how-long";
    this.element = "srclisting";
    this.browser = await launch({ headless: false });
    return this.browser;
  }


  async parsePage(){

    const page = await this.browser.newPage();
  
    //page.random_useragent();
    await page.goto(this.url);
   

        await page.evaluate(() => {
          let elements = document.getElementsByClassName(this.element);
          
         for (var i = 0; i < elements.length; ++i){
          var cat = elements[i].getElementsByTagName("H1");
          cat[0].
         }

          (var element of elements){
            element.click();

          }
      });
        if(el){
          await el.screenshot({path: "screenshots/" + name + " " + element + ".jpg", type: "jpeg"});
        }
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
  await m.processPages();
}

main();





