const Twit = require('twit');
const util = require('util');
const path = require('path');
const fs = require('fs');

const quotesJSON = fs.readFileSync('./quotes.json');
const Mbmbam = JSON.parse(quotesJSON);
const hastag = ' #MBMBAM';

const config = require('./oauth');

let T = new Twit(config);

function tweetIt(){
  let quoteCount = Mbmbam.Quotes.length;
  let quotePicker = Math.floor(Math.random()*quoteCount);
  let todaysQuote = Mbmbam.Quotes[quotePicker]
  T.post('statuses/update', { status: todaysQuote + hastag }, function(err, data, response) {
    console.log('Tweet sent!')
  })
}
setInterval(tweetIt, 86400000);

// let stream = T.stream('');
// stream.on('follow', followed);
// function followed(eventMsg){
//   let replyCount = Mbmbam.Replies.length;
//   let replyPicker = Math.floor(Math.random()*replyCount);
//   let thisreply = Mbmbam.Replies[replyPicker];
//   // let name = eventMsg.source.name;
//   let screenname = eventMsg.source.screen_name;
//   T.post('statuses/update', { status: "@" + screenname + ' ' + thisreply }, function(err, data, response) {
//     console.log('Tweet sent!')
//   })
// }
