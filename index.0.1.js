console.log('MBMBAM Twitter Bot is starting');

const Wikiaapi = require('nodewikiaapi');
const cheerio = require('cheerio');
const decode = require('unescape');


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

function getArtilcesHtml() {
    // Gets a list of all articles with the word "Episode" in the title
    mywiki.getArticlesList({
        limit: 500
    }).then(data => {
        //Loop through first 500 articles alphabettically
        for (i = 0; i < data.items.length; i++) {
            // Select the oens that have "Episode_" in the title (These are the articales about specific episodes)
            let episode = data.items[i].url.includes("Episode_");
            if (episode) {
                console.log(data.items[i]);
                // Variables for file paths and URLS
                let urlPath = data.items[i].url;
                let disposHtml = urlPath.replace('/wiki/', '').concat('', html);
                console.log('Full Path: ' + wiki + urlPath);
                console.log('Disposable HTML file: ' + disposHtml);
                const curlPromise = new Promise((resolve, reject) => {
                    let curl = "curl " + wiki + urlPath + " -o " + filePath + disposHtml;
                    // Execute curl command to download selected page
                    child = exec(curl, (error, stdout, stderr) => {
                        resolve(stdout);
                        reject(error);
                    });
                });
                curlPromise
                    .then(output => {
                        console.log("Article file created: " + filePath + disposHtml);
                        // do whatever you need to do with output
                        var files = fs.readdirSync(filePath);
                        for (var k = 0; k < files.length; k++) {
                            fs.readFile(filePath + disposHtml, 'utf8', dataLoaded);

                            function dataLoaded(err, data) {
                                $ = cheerio.load('' + data + '');
                                $('#Quotes').parent().siblings('dl').find('i').each(function(i, elem) {
                                    var id = './quotes/quote_' + Math.floor(Math.random() * 200000),
                                        filename = id + '.html',
                                        content = $.html(elem);
                                    fs.writeFile(filename, content, function(err) {
                                        console.log('Quote file written to: ./' + filename);
                                    });
                                });
                            }
                        };

                    })
                    .catch(error => {
                        console.error(error);
                    })
            } // if statement
        } // for loop
        // console.log(data);
    }).catch(error => {
        console.error(error);
    })
}
getArtilcesHtml()


function checkQuoteFiles() {
    let rawQuoteArray = [];
    let formattedQuoteArray = [];

    fs.readdirSync(quoteDir).forEach(file => {
        rawQuoteArray.push(file);
        return rawQuoteArray;
    })

    for (i = 0; i < rawQuoteArray.length; i++) {
        fs.readFile('./quotes/' + rawQuoteArray[i], 'utf8', (err, contents) => {
            contents = decode(contents);
            contents = contents.replace('<i>', '').replace('</i>', '').replace('<br>', ' ').replace('<b>', ' ').replace('</b>', ' ').replace('&#x2013;', '-').replace("&#x2019;", "'").replace("&#x2018;", "'");
            formattedQuoteArray.push(contents);
            return formattedQuoteArray;

        });
    }

    fs.readFile("./mbmbam-quotes.json", (err, data) => {
        let json = JSON.parse(data);
        // console.log(json.Quotes)
        for (var i = 0; i < formattedQuoteArray.length; i++) {
            json.Quotes.push(formattedQuoteArray[i])
        }
        fs.writeFile("mbmbam-quotes.json", JSON.stringify(json));
    })
};
checkQuoteFiles()



fs.readFile("./mbmbam-quotes.json", (err, data) => {
    let unsortedMbmbamQuotes = JSON.parse(data);
    // console.log();
    function removeDuplicateUsingFilter(arr) {
        let unique_array = arr.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        fs.writeFile("mbmbam-quotes.json", "Quotes:" + JSON.stringify(unique_array));

    }
    removeDuplicateUsingFilter(unsortedMbmbamQuotes.Quotes);
})

fs.readFile("./mbmbam-quotes.json", (err, data) => {
    let array = JSON.parse(data);
    console.log(array.Quotes.length);
})
