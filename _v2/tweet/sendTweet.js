const config = require('../../oauth.js'),
      Twit = require('twit'),
      T = new Twit(config),
      hashtag = ' #MBMBAM',
      fs = require('fs');

const gDocQuotes = JSON.parse(fs.readFileSync('../data/quotes/gDocQuotes.json')),
      wikiaQuotes = JSON.parse(fs.readFileSync('../data/quotes/wikiaQuotes.json'));


function pickTweet () {
  // Generates a random number, either 0 or 1
  let sourcePicker = Math.floor(Math.random()*2);
  // Generates a random whole number between 1 and 4
  let brotherPicker = Math.floor(Math.random()*4+1)
  // Sets up variables
  let quoteData;
  let quoteArray;
  // Pick a JSON object depending on the outcome of sourcePicker
  switch (sourcePicker) {
    case 0:
    quoteData = gDocQuotes;
    break;
    case 1:
    quoteData = wikiaQuotes;
    break;
    default:
    console.log('A JSON object to pull quotes from was not selected');
  }
  // Randomly selects an episode from the episodes array in the current JSON doc
  let episodePicker = Math.floor(Math.random()*quoteData.episodes.length);
  // Picks a brother depending on the outcome of brotherPicker
  switch (brotherPicker) {
    case 1:
    quoteArray = quoteData.episodes[episodePicker].quotes.justin;
    break;
    case 2:
    quoteArray = quoteData.episodes[episodePicker].quotes.travis;
    break;
    case 3:
    quoteArray = quoteData.episodes[episodePicker].quotes.griffin;
    break;
    case 4:
    quoteArray = quoteData.episodes[episodePicker].quotes.unattributed;
    break;
    default:
    console.log('An array to pull quotes from was not selected');
  }
  // Selects a quote from the currently selected brother array
  let quotePicker = Math.floor(Math.random()*quoteArray.length);
  let currentQuote = quoteArray[quotePicker];
  // Checks if the quote is valid for twitter
  // Should always return a valid quote
  if (currentQuote !== undefined && (currentQuote + hashtag).length < 280 && currentQuote.length > 30) {
    postTweet(currentQuote);
  } else  {
    pickTweet ();
  }
}

function postTweet(tweet) {
  console.log(tweet + hashtag);
  // T.post('statuses/update', { status: tweet + hashtag }, function(err, data, response) {
  //   if (err) {
  //     console.log('error:', err);
  //   } else {
  //     console.log('Tweet sent: ' + tweet + hashtag);
  //   }
  // });
}

pickTweet();
