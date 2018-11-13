let episodeTitle = 'Episode_124:_This_Is_Our_Rumors';
let mbmbamQuotes = new Object();

mbmbamQuotes[episodeTitle] = { 'Quotes': [], 'Replies': [] };

console.log(mbmbamQuotes);

let newQuote = 'pretty good stuff';

mbmbamQuotes[episodeTitle].Quotes.push(newQuote);

console.log(mbmbamQuotes);
