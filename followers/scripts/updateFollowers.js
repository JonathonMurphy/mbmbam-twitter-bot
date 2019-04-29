#!/usr/bin/env node 
const config = require('../../oauth.js'),
      Twit = require('twit'),
      T = new Twit(config),
      fs = require('fs');

let followers = {
  note: "A user's following status may say 'false' if they were just followed when the script was run." ,
  users: []
}

function followUser(screen_name, name) {
  T.post('friendships/create', { screen_name: screen_name }, function(err) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log('You are now following ' + name);
    }
  })
}

//Gets current followers info and updates followersInfo.json if there is a new follower
function getFollowerInfo() {
  T.get('followers/list', { screen_name: 'Mbmbam_Quotes' },  function (err, data, response) {
    if (err) {
      console.log('error:', err);
      // context.fail();
    } else {
      for (i=0; i < data.users.length; i++) {
        // Checks if bot is not following a user back, and then follows them
        if (data.users[i].following == false) {
          followUser(data.users[i].screen_name, data.users[i].name);
        }
        // Sets us data structure for logs
        let userInfo = {
          id: '',
          name: '',
          screen_name: '',
        }
        // Sets the info for each follower in the logs
        userInfo.id = data.users[i].id;
        userInfo.name = data.users[i].name;
        userInfo.screen_name = data.users[i].screen_name;
        userInfo.following = data.users[i].following;
        followers.users.push(userInfo);
      }
      // Writes log file
      fs.writeFileSync('../data/followerInfo.json', JSON.stringify(followers), function(err) {
        if(err) console.log(err)
      })

    }
  })
}

getFollowerInfo();
