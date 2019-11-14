#!/usr/bin/env node
/*jshint esversion: 8 */

const fs = require('fs'),
      rp = require('request-promise'),
      hashtag = ' #MBMBaM',
      path = require('path'),
      Twit = require('twit'),
      config = require('./oauth.js'),
      T = new Twit(config);
      
const random = {
  uri: 'https://mbmbam.app/api/search/random',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true,
};

async function pickTweet() {
  rp(random)
    .then(function(response) {
      let noQuotesFound = 0;
      for (let index of response) {
        let currentQuote = index.quote;
        if (currentQuote !== undefined && (currentQuote + hashtag).length < 280 && currentQuote.length > 40) {
          // console.log(currentQuote + hashtag);
          postTweet(currentQuote + hashtag);
          break;
        } else {
          noQuotesFound++;
        }
      }
      if (noQuotesFound === 15) {
        pickTweet();
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}

function postTweet(tweet) {
    T.post('statuses/update', { status: tweet}, function(err, data, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('Tweet sent: ' + tweet);
      }
    });
}

exports.handler = function (event) {
  pickTweet();
};

// const reply = {
//   uri: 'https://mbmbam.app/api/get/reply',
//   headers: {
//     'User-Agent': 'Request-Promise'
//   },
//   json: true,
// };

// function pickReply(user) {
//   // let replyPicker = Math.floor(Math.random()*newFollowerReplies.replies.length);
//   let reply = '@'+user + ' ' + newFollowerReplies.replies[replyPicker];
//   postTweet(reply);
// }
//
// function checkForNewFollowers() {
//   for (i=0; i < followerInfo.users.length; i++) {
//     if (followerInfo.users[i].following == false) {
//       pickReply(followerInfo.users[i].screen_name);
//     } else {
//       console.log('No new followers');
//     }
//   }
// }
//
// let followers = {
//   note: "A user's following status may say 'false' if they were just followed when the script was run." ,
//   users: []
// }
//
// function followUser(screen_name, name) {
//   T.post('friendships/create', { screen_name: screen_name }, function(err) {
//     if (err) {
//       console.log('error:', err);
//     } else {
//       console.log('You are now following ' + name);
//     }
//   })
// }
//
// //Gets current followers info and updates followersInfo.json if there is a new follower
// function getFollowerInfo() {
//   T.get('followers/list', { screen_name: 'Mbmbam_Quotes' },  function (err, data, response) {
//     if (err) {
//       console.log('error:', err);
//       // context.fail();
//     } else {
//       for (i=0; i < data.users.length; i++) {
//         // Checks if bot is not following a user back, and then follows them
//         if (data.users[i].following == false) {
//           followUser(data.users[i].screen_name, data.users[i].name);
//         }
//         // Sets us data structure for logs
//         let userInfo = {
//           id: '',
//           name: '',
//           screen_name: '',
//         }
//         // Sets the info for each follower in the logs
//         userInfo.id = data.users[i].id;
//         userInfo.name = data.users[i].name;
//         userInfo.screen_name = data.users[i].screen_name;
//         userInfo.following = data.users[i].following;
//         followers.users.push(userInfo);
//       }
//       // Writes log file
//       fs.writeFileSync(followerInfoPath, JSON.stringify(followers), function(err) {
//         if(err) console.log(err)
//       })
//
//     }
//   })
// }
