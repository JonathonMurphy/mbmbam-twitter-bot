// In the future we can use jq to merge the files by the episode title 

const jsonConcat = require("json-concat");

jsonConcat({
    src: ['../quotes/gDocQuotes.json', '../quotes/wikiaQuotes.json'],
    dest: "../quotes/mergedQuotes.json"
}, function (json) {
    // console.log(json);
});
