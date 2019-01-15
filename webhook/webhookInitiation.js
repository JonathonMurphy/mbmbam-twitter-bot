const http = require("http");
const request = require('request-promise')

const options = {
    host: "api.twitter.com",
    path: "/1.1/account_activity/all/development/webhooks.json?url=https%3A%2F%2Fjsmurphy.inf%2Fpublic_htmlo%2Fwebhooks%2Ftwitter'",
    method: "POST",
    port: 443,
    uri: "http://jsmurphy.info/webhooks/twitter",
    headers: {
        "Content-Type": "application/json"
    }
}

// POST request to create webhook config
request.post(soptions).then(function(body) {
    console.log(body)
}).catch(function(body) {
    console.log(body)
})
