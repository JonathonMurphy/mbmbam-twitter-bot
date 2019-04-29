#!/usr/bin/env node 
const postTweet = require('../lib/postTweet.js'),
      fs = require('fs');

const newFollowerReplies = JSON.parse(fs.readFileSync('../data/replies/newFollowerReplies.json'));
const followerInfo = JSON.parse(fs.readFileSync('../followers/data/followerInfo.json'));

function checkForNewFollowers () {
  for (i=0; i < followerInfo.users.length; i++) {
    if (followerInfo.users[i].following == false) {
      pickReply(followerInfo.users[i].screen_name);
    } else if (i = followerInfo.users.length) {
      console.log('No new followers');
    }
  }
}

function pickReply (user) {
  let replyPicker = Math.floor(Math.random()*newFollowerReplies.replies.length);
  let reply = '@'+user + ' ' + newFollowerReplies.replies[replyPicker];
  postTweet(reply);
}

checkForNewFollowers();
