const osmosis = require('osmosis');
const fs = require('fs');
var url = 'http://www.stilltasty.com/searchitems/search';
var selector = 'body';
var divclass = '.how-long';

var category = divclass;
var element = ' div p'; 
let savedData = [];

var foodPageDiv = '.food-storage-container';
getMainPage();
function getMainPage(){
    /*osmosis.get(url)//.find(divclass)//.follow(..).find(..)
    //   .set(..)
       .log(console.log)
       .data(function(data) {
          console.log(data);
          savedData.push(data);
       })
       .done(function() {
          fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
            if(err) console.error(err);
            else console.log('Data Saved to data.json file');
          });
       });*/


osmosis
.post(url, { search: ''})
.find(category)
.set({ category: 'h1'})
.find(element)
.set({
    element: 'a',
    link: '@href'
})
.delay(300)
.follow('@href')
//.paginate('.totallink + a.button.next:first')
.find(foodPageDiv)
.set({
    storage: [
        osmosis
        .follow('.food-inside')
        .set({
            'type': '.food-storage-left span',
            'time': '.food-storage-right > span',
        })
    ],
    tips: [
        osmosis
        .follow('.food-tips ul')
        .set({
            'tip': 'li',
        })
    ]
})
.data(function(data) {
    // do something with listing data
    savedData.push(data);

}).done(function() {
    fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
        if(err) console.error(err);
        else console.log('Data Saved to data.json file');
      });

})
.log(console.log)
.error(console.log)
.debug(console.log)
    }
