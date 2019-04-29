#!/usr/bin/env node
const path = require('path'),
      hashtag = ' #MBMBAM',
      fs = require('fs');

const quoteDataPath = path.resolve(__dirname, '../data/quotes/concatQuotes.json'),
      postTweetPath = path.resolve(__dirname, '../lib/postTweet.js');

const postTweet = require(postTweetPath);

const quoteData = JSON.parse(fs.readFileSync(quoteDataPath));

function pickTweet () {
  // Generates a random whole number between 1 and 4
  let brotherPicker = Math.floor(Math.random()*4+1)
  // Sets up variables
  let quoteArray;
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
  let currentQuote = quoteArray[quotePicker] + hashtag;
  // Checks if the quote is valid for twitter
  // Should always return a valid quote
  if (currentQuote !== undefined && (currentQuote + hashtag).length < 280 && currentQuote.length > 30) {
    postTweet(currentQuote);
  } else  {
    pickTweet ();
  }
}

pickTweet();
