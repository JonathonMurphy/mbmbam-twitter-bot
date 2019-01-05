const http = require("http");


const data = JSON.stringify({
  todo: 'Buy the milk'
})

const options = {
    host: "api.twitter.com/",
    path: "account_activity/all/development/webhooks",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
        "Authorization": "Bearer token"
    }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
