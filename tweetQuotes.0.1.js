const Twit = require('twit');
const util = require('util');
const path = require('path');
const fs = require('fs');

const quotesJSON = fs.readFileSync('./quotes.json')
const Mbmbam = JSON.parse(quotesJSON);
const hastag = ' #MBMBAM'

var T = new Twit({
  consumer_key:         'fzHfkiNorgQNlTDO5eMT5TQwV',
  consumer_secret:      'y0OKHVf2QtxiFAUa2N3oNSfsYPcTQcftaDkNqN3i7U6hyAOQ2m',
  access_token:         '1061985901251907590-Ehruy9LArMqWHSvXIQYlMXZpHLxuts',
  access_token_secret:  '98sxSM6jZMqWJsRoHlfG20Hp4aufmQayOOY6RfytsA29r',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

function tweetIt(){
  let quoteCount = Mbmbam.Quotes.length;
  let quotePicker = Math.floor(Math.random()*quoteCount);
  let todaysQuote = Mbmbam.Quotes[quotePicker]
  T.post('statuses/update', { status: todaysQuote + hastag }, function(err, data, response) {
    console.log('Tweet sent!')
  })
}
setInterval(tweetIt, 86400000);

// let stream = T.stream('user');
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
