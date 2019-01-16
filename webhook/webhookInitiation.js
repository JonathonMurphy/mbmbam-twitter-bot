const http = require("http");
const request = require('request-promise')

const options = {
    host: "api.twitter.com",
    path: "/1.1/account_activity/all/development/webhooks.json?url=http%3A%2F%2Fjsmurphy.info%2Fpublic_html%2Fwebhooks%2Ftwitter",
    method: "POST",
    port: 443,
    uri: "http://jsmurphy.info/webhooks/twitter",
    headers: {
        "Content-Type": "application/json"
    }
}

// POST request to create webhook config
request.post(options).then(function(body) {
    console.log(body)
}).catch(function(body) {
    console.log(body)
})
