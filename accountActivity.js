const crypto = require('crypto');
const config = require('./oauth');
const consumer_secret = config.consumer_secret;


/**
 * Creates a HMAC SHA-256 hash created from the app TOKEN and
 * your app Consumer Secret.
 * @param  token  the token provided by the incoming GET request
 * @return string
 */

module.exports.get_challenge_response = function(crc_token, consumer_secret) {

  let hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')

  let response = {
    'response_token': 'sha256=' + hmac
  }

  return JSON.stringify(response);
}
