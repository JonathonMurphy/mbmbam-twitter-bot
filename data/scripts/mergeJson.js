#!/usr/bin/env node
// In the future we can use jq to merge the files by the episode title

const jsonConcat = require("json-concat"),
      path = require('path');

const gDocQuotesPath = path.resolve(__dirname, '../quotes/gDocQuotes.json'),
      wikiaQuotesPath = path.resolve(__dirname, '../quotes/wikiaQuotes.json'),
      mergedQuotesPath = path.resolve(__dirname, '../quotes/mergedQuotes.json');

jsonConcat({
    src: [gDocQuotesPath, wikiaQuotesPath],
    dest: mergedQuotesPath
}, function (json) {
    // console.log(json);
});
