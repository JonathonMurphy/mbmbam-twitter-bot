const fs = require('fs');
const data = JSON.parse(fs.readFileSync('../quotes/gDocQuotes.json'));
let dataStructure = {
  unattributed: []
}


for (i=0; i<data.episodes.length; i++){
  dataStructure.unattributed.push(data.episodes[i].quotes.unattributed);
}

fs.writeFileSync('../quotes/unattributedGDocQuotes.json', JSON.stringify(dataStructure));
