const Twit = require('twit');
const util = require('util');
const path = require('path');
const fs = require('fs');

const quotesJSON = fs.readFileSync('./quotes.json');
const Mbmbam = JSON.parse(quotesJSON);
const hashtag = ' #MBMBAM';
let followersJSON = fs.readFileSync('./followersInfo.json');
let Followers = JSON.parse(followersJSON);
let followersArrayLength = Followers.users.length;

const config = require('./oauth');

let T = new Twit(config);

function pickTweet(){
  let quoteCount = Mbmbam.Quotes.length;
  let quotePicker = Math.floor(Math.random()*quoteCount);
  let currentQuote = Mbmbam.Quotes[quotePicker];
  return currentQuote;
}

function pickReply(){
  let replyCount = Mbmbam.Replies.length;
  let replyPicker = Math.floor(Math.random()*replyCount);
  let currentReply = Mbmbam.Replies[replyPicker];
  return currentReply;
}

// Wraps in a LAMBDA handler              // context needs to be added into the functions (.fail & .succeed )
//exports.handler = function myBot(event, context) {

    let textToTweet = pickTweet();
    let replyToTweet = pickReply();

    let interval = setTimeout(postTweet, pickTimeout());

    function postTweet() {
      T.post('statuses/update', { status: textToTweet + hashtag }, function(err, data, response) {
        if (err) {
          stopInterval()
          console.log('error:', err);
          // context.fail();
        } else {
          stopInterval()
          console.log('Tweet sent: ' + textToTweet + hashtag);
          // context.succeed();
        }
      });
    }

    function pickTimeout() {
      let time = new Date().getTime();
      let hour = new Date(time).getHours();
      console.log('The current hour is: ' + hour + '00 UTC');
      let tweetTimes = [10, 15, 21];
      let newTimeout;
      // TODO: Refactor as a case statement that functions like the animation loop in a game engine (maybe fetching data every 15 mintes or so)
      /*
      switch(expresion) {
        case tweetTimes[0]:
          // code block
          // Run postTweet()
          // Run checkForNewFollower()
          break;
        case tweetTimes[1]:
          // code block
          // Run postTweet()
          // Run checkForNewFollower()
          break;
          case tweetTimes[2]:
            // code block
            // Run postTweet()
            // Run checkForNewFollower()
            break;
        default:
          // code block
          // Run checkForNewFollower()
      }

      */
      if (hour < 10 && hour > 0) {
        newTimeout = (tweetTimes[0] * 3600000) - (hour * 3600000);
        console.log('newTimeout: ' + newTimeout + ' Next Tweet in: ' + (tweetTimes[0] - hour) + ' hours');
        return newTimeout;
      } else if (hour >= 10 && hour < 15) {
        newTimeout = (tweetTimes[1] * 3600000) - (hour * 3600000);
        console.log('newTimeout: ' + newTimeout + ' Next Tweet in: ' + (tweetTimes[1] - hour) + ' hours');
        return newTimeout;
      } else if (hour >= 15 && hour < 21) {
        newTimeout = (tweetTimes[2] * 3600000) - (hour * 3600000);
        console.log('newTimeout: ' + newTimeout + ' Next Tweet in: ' + (tweetTimes[2] - hour) + ' hours');
        return newTimeout;
      } else if (hour >= 21 && hour < 23) {
        newTimeout = (((hour - 23)+1)*3600000) + (tweetTimes[0] * 3600000);
        console.log('newTimeout: ' + newTimeout);
        return newTimeout;
      } else {
        newTimeout = tweetTimes[0] * 3600000;
        console.log('newTimeout: ' + newTimeou) ;
        return newTimeout;
      }
    }

    function stopInterval() {
        clearTimeout(interval);
    }



    function postReply(source) {
      T.post('statuses/update', { status: '@' + source.users[0].screen_name + ' ' + replyToTweet + hashtag }, function(err, data, response) {
        if (err) {
          console.log('error:', err);
          // context.fail();
        } else {
          console.log('Tweet sent: ' + '@' + source.users[0].screen_name + ' ' + replyToTweet + hashtag)
          // context.succeed();
        }
      });
    }

    function followUser(source) {
      T.post('friendships/create', { screen_name: source.users[0].screen_name }, function(err) {
        if (err) {
          console.log('error:', err);
          // context.fail();
        }
      })
    }

    //Gets current followers info and updates followersInfo.json if there is a new follower
    function checkForNewFollower() {

      T.get('followers/list', { screen_name: 'Mbmbam_Quotes' },  function (err, data, response) {
        if (err) {
          console.log('error:', err);
          // context.fail();
        } else {
          fs.writeFileSync('./newFollowersInfo.json', JSON.stringify(data), function(err) {
            if(err) console.log(err)
          })
          let newFollowersJSON = fs.readFileSync('./newFollowersInfo.json');
          let NewFollowers = JSON.parse(followersJSON);
          let newFollowersArrayLength = NewFollowers.users.length;
          if (followersArrayLength < newFollowersArrayLength) {
            followUser(NewFollowers);
            postReply(NewFollowers);
            fs.rename('./newFollowersInfo.json', './followersInfo.json', function(err) {
            if (err) {
              console.log('ERROR: ' + err);
            } else {
              followersJSON = fs.readFileSync('./followersInfo.json');
              Followers = JSON.parse(followersJSON);
              followersArrayLength = Followers.users.length;
            }
            });
          } else {
            console.log('No new followers');
          }
          // console.log(Followers.users.length)
          // context.succeed();
        }
      })
    }

    checkForNewFollower();

    // stream.on('follow', function (eventMsg) {
    //   console.log('Stream on');
    //   let WebhooksFollowers = JSON.parse(eventMsg);
    //   followUser(WebhooksFollowers);
    //   postReply(WebhooksFollowers);
    // })


  //};
