console.log('MBMBAM Twitter Bot is starting' + '\n');

const Wikiaapi = require('nodewikiaapi');
const wiki = 'http://mbmbam.wikia.com';
const rp = require('request-promise');
const mywiki = new Wikiaapi('mbmbam');
const cheerio = require('cheerio');
const util = require('util');
const path = require('path');
const fs = require('fs');


function getEpisodes() {
  mywiki.getArticlesList({
      limit: 500
  }).then(function (data) {
    let episodeArray = [];
    data.items.forEach(function (item, i) {
      if (data.items[i].url.includes('Episode_') && !data.items[i].url.hasOwnProperty('undefined') ) {
        episodeArray.push(data.items[i].url);
      }
    })
    getQuotes (episodeArray);
  }).catch(function (error) {
    console.error(error);
  })
}
getEpisodes();


function getQuotes (episodeURL) {
  let mbmbamQuotes = new Object();
  mbmbamQuotes = {Quotes: [], Replies: []};
  // mbmbamQuotes.byEpisode = [];
  episodeURL.forEach(function (episode, index){
    // console.log(episode);
    let options = {
      uri: 'http://mbmbam.wikia.com' + episodeURL[index],
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    // console.log(options.uri);
    rp(options)
      .then(function ($) {
        let episodeName = options.uri.replace('http://mbmbam.wikia.com/wiki/', '');
        // console.log(index);
        // Add the episode to the object here (index)
        // console.log('These quotes come from ' + episodeName + '\n');
        // mbmbamQuotes[episodeName] = {Quotes: [], Replies: []};
        $('p, u, i').each(function (i, elem) {

          // Filter Selection Section
          // .*,.*,.*,.*, regex for the episode summary entries 
          const regexFilter = /\byahoo\b|\bsponsored\b|\bmbmbam\b|\bhousekeeping\b|\boriginally released\b|\bepisode\b|\bSuggested talking points\b|\bintro\b|\bMy Brother My Brother and Me\b/gi;
          const regexTimeStamp = /[0-9]{1,2}:+[0-9]{2}/gm;
          let textLength = $(this).text().length;
          let text = $(this).text().replace('"', '');
          text = text.replace('J:', '');
          text = text.replace('T:', '');
          text = text.replace('G:', '');
          text = text.replace('Justin:', '');
          text = text.replace('Travis:', '');
          text = text.replace('Griffin:', '');
          let m;
          if ((m = regexTimeStamp.test(text)) == true) {
            let subStringSelection = text.substring(0,2);
            text.replace('subStringSelection', '')
            return text;
          }
          if (textLength < 272 && textLength > 15 && (m = regexFilter.test(text)) == false) {
            // TODO a way to remove the #Suggested_Talking_Points child that lists the topics
            // console.log(text + '\n');
            // mbmbamQuotes[episodeName].Quotes.push(text);
            mbmbamQuotes.Quotes.push(text);
          }
        }) // End of Filter Selection Section

      }).then(function(){
        // console.log(mbmbamQuotes);
        fs.writeFileSync('./quotes.json', JSON.stringify(mbmbamQuotes), function(err) {
          if(err) console.log(err)
        })
      })
      .catch(function (err) {
        console.error(err);
      })
  })

}
