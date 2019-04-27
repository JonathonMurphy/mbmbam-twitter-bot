const config = require('../oauth.js'),
      Twit = require('twit'),
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
