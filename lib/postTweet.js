#!/usr/bin/env node
const path = require('path'),
      Twit = require('twit');

const configPath = path.resolve(__dirname, '../oauth.js')

const config = require(configPath),
      T = new Twit(config);

module.exports = tweet => {
    T.post('statuses/update', { status: tweet}, function(err, data, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log('Tweet sent: ' + tweet);
      }
    });
}
