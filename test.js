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


// Episode List id: 2055
// Test Episode ID to figure out what we can pull id: 2184
// id="Quotes" can be used to pull quotes from episode pages that have them

//Pull list of articles
//Get html files from articles
//Parse out the good bits
//Save the good bits to new files
//Migrate those good bits files to a JSON array (or something better)

//For the moment lets focus on a way to effeciently pull quotes from one page, in an asyncronous fashion
// Test episode http://mbmbam.wikia.com/wiki/Episode_105:_Daymare_Pile_of_Watercolor_Donors

let episode = 'Episode_107:_Face_2_Face_5';

async function start () {
  let episodeQuotes = await function (episode) {
    console.log('Were in the function')
    let options = {
      uri: 'http://mbmbam.wikia.com/wiki/' + episode,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(function ($) {
        // .not('#Suggested_Talking_Points').parent('h3').sibling('p')
        $('p, u, i').each(function (i, elem) {
          // Filter Selection Section
          const regexFilter = /\byahoo\b|\bsponsored\b|\bmbmbam\b|\bhousekeeping\b|\boriginally released\b|\bepisode\b/gi;
          const regexTimeStamp = /[0-9]{2}:+[0-9]{2}/gm;
          let textLength = $(this).text().length;
          let text = $(this).text();
          let m;
          if ((m = regexTimeStamp.test(text)) == true) {
            let subStringSelection = text.substring(0,2);
            text.replace('subStringSelection', '')
            return text;
          }
          if (textLength < 272 && textLength > 1 && (m = regexFilter.test(text)) == false) {
            // TODO a way to remove the #Suggested_Talking_Points child that lists the topics
            console.log(text + '\n')
          }
        }) // End of Filter Selection Section
      })
      .catch(function (err) {
        console.log(err);
      })
  };
}

start();
