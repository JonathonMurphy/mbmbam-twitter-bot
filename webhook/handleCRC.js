const crypto = require('crypto');
const config = require('./oauth');
const http = require('http');
const consumer_secret = config.consumer_secret;

module.exports.get_challenge_response = function(crc_token, consumer_secret) {

  let hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')

  let response = {
    'response_token': 'sha256=' + hmac
  }

  return JSON.stringify(response);
}
