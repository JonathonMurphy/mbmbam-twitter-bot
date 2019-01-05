var http = require("http");

var options = {
    host: "api.twitter.com/",
    path: "account_activity/all/development/webhooks",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
        "Authorization": "Bearer token"
    }
};
