console.log('MBMBAM Twitter Bot is starting' + '\n');

const Wikiaapi = require('nodewikiaapi');
const cheerio = require('cheerio');
const decode = require('unescape');
const rp = require('request-promise');


const util = require('util');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const mywiki = new Wikiaapi('mbmbam');

const wiki = 'http://mbmbam.wikia.com';
const filePath = './episodes/';
const quoteDir = './quotes/'
const html = '.html';




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
  let mbmbamQuotes = {};
  episodeURL.forEach(function (episode, index){
    console.log(episode);
    let options = {
      uri: 'http://mbmbam.wikia.com' + episodeURL[index],
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    console.log(options.uri);
    rp(options)
      .then(function ($) {
        console.log('These quotes come from ' + options.uri + '\n');
        let episodeName = options.uri;
        mbmbamQuotes = {
          episodeName: {
            'Quotes': [],
            'Replies': []
            }
          };
        $('p, u, i').each(function (i, elem) {
          // Filter Selection Section
          const regexFilter = /\byahoo\b|\bsponsored\b|\bmbmbam\b|\bhousekeeping\b|\boriginally released\b|\bepisode\b|\bSuggested talking points\b|\bintro\b|\bMy Brother My Brother and Me\b/gi;
          const regexTimeStamp = /[0-9]{1,2}:+[0-9]{2}/gm;
          let textLength = $(this).text().length;
          let text = $(this).text();
          let m;
          if ((m = regexTimeStamp.test(text)) == true) {
            let subStringSelection = text.substring(0,2);
            text.replace('subStringSelection', '')
            return text;
          }
          if (textLength < 272 && textLength > 15 && (m = regexFilter.test(text)) == false) {
            // TODO a way to remove the #Suggested_Talking_Points child that lists the topics
            console.log(text + '\n');
            // mbmbamQuotes[episodeName].Quotes.push(text);
          }
        }) // End of Filter Selection Section

      }).then(function(){
        console.log(mbmbamQuotes);
      })
      .catch(function (err) {
        console.error(err);
      })
  })

}
