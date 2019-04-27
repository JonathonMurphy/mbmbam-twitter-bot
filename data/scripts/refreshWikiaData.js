console.log("We bout to get some data ya'll" + "\n");

// Regex that should match Griffin:. G: or any other brothers name (and Clint) even if misspelled
// /\[J|T|G|C][a-z]{0,6}\:

const Wikiaapi = require('nodewikiaapi'),
      wiki = 'http://mbmbam.wikia.com',
      rp = require('request-promise'),
      mywiki = new Wikiaapi('mbmbam'),
      cheerio = require('cheerio'),
      util = require('util'),
      path = require('path'),
      sortQuotes = require('../../lib/sortQuotes.js'),
      _cliProgress = require('cli-progress'),
      bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic),
      fs = require('fs');

bar1.start(1107, 0);

function getEpisodes() {
  mywiki.getArticlesList({
      limit: 1000
  }).then(function (data) {
    let episodeArray = [];
    data.items.forEach(function (item, i) {
      bar1.increment();
      if (data.items[i].url.includes('Episode_') && !data.items[i].url.hasOwnProperty('undefined') ) {
        episodeArray.push(data.items[i].url);
      }
    })
    getQuotes(episodeArray)
  }).catch(function (error) {
    console.error(error);
  })
} // End of getEpisodes function

function getQuotes (episodeURL) {
  let mbmbamQuotes = new Object();
  // Start of new data structure
  mbmbamQuotes.episodes = [];
  episodeURL.forEach(function (episode, index, array){
    bar1.increment();
    let quoteObject = {
      url: wiki + episodeURL[index],
      episode: episodeURL[index].substr(6).replace('_', ' '),
      quotes: {
        justin: [],
        travis: [],
        griffin: [],
        unattributed: []
      }
    };
    const options = {
      uri: 'http://mbmbam.wikia.com' + episodeURL[index],
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(function ($) {
        let episodeName = options.uri.replace('http://mbmbam.wikia.com/wiki/', '');
        $('p, u, i').each(function (i, elem) {
          const regexFilter = /\byahoo\b|\bsponsored\b|\bmbmbam\b|\bhousekeeping\b|\boriginally released\b|\bepisode\b|\bSuggested talking points\b|\bintro\b|\bMy Brother My Brother and Me\b|\b.*,.*,.*,.*\b/gi;
          const regexTimeStamp = /[0-9]{1,2}:+[0-9]{2}/gm;
          let textLength = $(this).text().length;
          let text = $(this).text().replace('"', '');

          let m;
          if ((m = regexTimeStamp.test(text)) == true) {
            let subStringSelection = text.substring(0,2);
            text.replace('subStringSelection', '')
            return text;
          }
          if (textLength < 272 && textLength > 15 && (m = regexFilter.test(text)) == false) {
            // Filters quotes by brother
            sortQuotes(text, quoteObject);
          }
        }) // End of Filter Selection Section

        mbmbamQuotes.episodes.push(quoteObject);

      }).then(function(){
        fs.writeFileSync('../quotes/wikiaQuotes.json', JSON.stringify(mbmbamQuotes), function(err) {
          if(err) console.log(err)
        })
      })
      .catch(function (err) {
        console.error(err);
      })
  })

}

getEpisodes();
