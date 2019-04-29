#!/usr/bin/env node
const path = require('path'),
      fs = require('fs');

const newFollowerRepliesPath = path.resolve(__dirname, '../data/replies/newFollowerReplies.json'),
      followerInfoPath = path.resolve(__dirname, '../followers/data/followerInfo.json'),
      postTweetPath = path.resolve(__dirname, '../lib/postTweet.js');

const postTweet = require(postTweetPath);

const newFollowerReplies = JSON.parse(fs.readFileSync(newFollowerRepliesPath));
const followerInfo = JSON.parse(fs.readFileSync(followerInfoPath));

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
