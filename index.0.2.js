console.log('MBMBAM Twitter Bot is starting');

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
