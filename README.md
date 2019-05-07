# My Brother, My Brother, and Me Twitter Bot

This is a Twitter bot that tweets quotes from the podcast 'My Brother, My Brother, and Me' that are pulled from two locations.
The first is the MBMBAM Wikia, and the second is the MBMBAM Transcript Project.

https://twitter.com/Mbmbam_Quotes

## How it Works

The quotes from the MBMBAM Transcript Project are scraped via a puppeteer script, that uses cheerio to pull out the individual elements out of the Google Docs pages. Those elements then filtered out using various regular expressions, and stored in a JSON document. The quotes from Wikia are pulled in a similar fashion, but instead of using puppeteer to scrape the data, the quotes from Wikia are pulled via API calls. 

## Setup

* Clone repo
* npm install
* Create oauth.js file
* Setup cron jobs to send tweet, get followers, etc

## Author

* Jonathon Seth Murphy

## License

This project is licensed under the ISC License

## Acknowledgments

* Special thanks to the fine folks doing the real work transcribing the episodes over at twitter.com/mbmbam_scripts

* Special thanks to everyone who has added to the mbmbam.wikia.com pages over the years
