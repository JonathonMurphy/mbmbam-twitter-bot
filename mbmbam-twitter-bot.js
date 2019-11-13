#!/usr/bin/env node
/*jshint esversion: 8 */

const fs = require('fs'),
      rp = require('request-promise'),
      hashtag = ' #MBMBaM',
      path = require('path'),
      Twit = require('twit'),
      config = require('./oauth.js'),
      T = new Twit(config);

const options = {
  uri: 'https://mbmbam.app/api/search/random',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true,
};

async function pickTweet() {
  rp(options)
    .then(function(response) {
      let noQuotesFound = 0;
      for (let index of response) {
        let currentQuote = index.quote;
        if (currentQuote !== undefined && (currentQuote + hashtag).length < 280 && currentQuote.length > 40) {
          console.log(currentQuote + hashtag);
          // postTweet(currentQuote + hashtag);
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

function pickReply(user) {
  let replyPicker = Math.floor(Math.random()*newFollowerReplies.replies.length);
  let reply = '@'+user + ' ' + newFollowerReplies.replies[replyPicker];
  postTweet(reply);
}

function checkForNewFollowers() {
  for (i=0; i < followerInfo.users.length; i++) {
    if (followerInfo.users[i].following == false) {
      pickReply(followerInfo.users[i].screen_name);
    } else {
      console.log('No new followers');
    }
  }
}

pickTweet();
