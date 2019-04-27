const config = require('../oauth.js'),
      Twit = require('twit'),
      T = new Twit(config),
      fs = require('fs');

const newFollowerReplies = JSON.parse(fs.readFileSync('../data/quotes/newFollowerReplies.json'));
const followerInfo = JSON.parse(fs.readFileSync('../followers/data/followerInfo.json'));

function checkForNewFollowers () {
  for (i=0; i < followerInfo.users.length; i++) {
    if (followerInfo.users[i].following == false) {
      pickReply(followerInfo.users[i].screen_name);
    }
  }
}

function pickReply (user) {
  let replyPicker = Math.floor(Math.random()*newFollowerReplies.replies.length);
  let reply = '@'+user + ' ' + newFollowerReplies.replies[replyPicker];
  postTweet(reply);
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

checkForNewFollowers();
