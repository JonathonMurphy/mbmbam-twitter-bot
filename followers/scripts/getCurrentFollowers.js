const Twit = require('twit');
const util = require('util');
const path = require('path');
const fs = require('fs');

const quotesJSON = fs.readFileSync('./quotes/quotes.json');
const Mbmbam = JSON.parse(quotesJSON);
const hashtag = ' #MBMBAM';
let followersJSON = fs.readFileSync('./followers/followersInfo.json');
let Followers = JSON.parse(followersJSON);
let followersArrayLength = Followers.users.length;

const config = require('./oauth');

let T = new Twit(config);



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
      fs.writeFileSync('./followers/newFollowersInfo.json', JSON.stringify(data), function(err) {
        if(err) console.log(err)
      })
      let newFollowersJSON = fs.readFileSync('./followers/newFollowersInfo.json');
      let NewFollowers = JSON.parse(followersJSON);
      let newFollowersArrayLength = NewFollowers.users.length;
      if (followersArrayLength < newFollowersArrayLength) {
        followUser(NewFollowers);
        postReply(NewFollowers);
        fs.rename('./followers/newFollowersInfo.json', './followers/followersInfo.json', function(err) {
        if (err) {
          console.log('ERROR: ' + err);
        } else {
          followersJSON = fs.readFileSync('./followers/followersInfo.json');
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
