const puppeteer = require('puppeteer'),
      cheerio = require('cheerio'),
      _cliProgress = require('cli-progress'),
      bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic),
      fs = require('fs');
// Start progress bar
bar1.start(99, 0);
console.log('Is this thing on...')

// Gets array of links from JSON document
let gDocLinks;
  try {
    gDocLinks = JSON.parse(fs.readFileSync('./gDocLinks.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      throw err;
    }
  }

// Sets arracy variable
const urlArray = gDocLinks.urls;

// Setup data structure
let mbmbamQuotes = new Object();
mbmbamQuotes.episodes = [];

// Regex filters
const regexEpisodeTitle = /MBMBAM \d{2,}\:/gm;

  (async () => {
    try {
      // Fires up puppeteer in headless mode
      const browser = await puppeteer.launch({headless: true});
      // Update progress bar
      bar1.increment();
      // Loop over all the array items
      for (i=0; i<urlArray.length; i++) {
        // Log the progress to CLI
        bar1.increment();
        // Setup data structure
        let quoteObject = {
          url: urlArray[i],
          episode: '',
          quotes: {
            justin: [],
            travis: [],
            griffin: [],
            unattributed: []
          }
        };
        // Open new page and load current url from the arracy in puppeteer
        const page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 10000
        });
        await page.goto(urlArray[i]);
        // Assins all the HTML content of the page to a variable and then give cheerio access to it.
        let html = await page.content();
        const $ = cheerio.load(html);
        // $().logHtml() function creator.
        $.prototype.logHtml = function() {
          console.log(this.html());
        };
        // $().logHtml() function creator.
        $.prototype.logText = function() {
          console.log(this.text());
        };
        let m;
        $('#contents').children('p').each(function (i, elem) {
          let text = $(this).text();
          // Filters by brother
          if (text.includes('J:') || text.includes('Justin:')) {
            text = text.replace('J: ', '');
            text = text.replace('Justin:', '');
            quoteObject.quotes.justin.push(text);
          } else if (text.includes('T:') || text.includes('Travis:')) {
            text = text.replace('T: ', '');
            text = text.replace('Travis:', '');
            quoteObject.quotes.travis.push(text);
          } else if (text.includes('G:') || text.includes('Griffin:')) {
            text = text.replace('G: ', '');
            text = text.replace('Griffin:', '');
            quoteObject.quotes.griffin.push(text);
          } else if (regexEpisodeTitle.test(text) == true) {
            quoteObject.episode= text;
          } else if (text.length !== 0) {
            quoteObject.quotes.unattributed.push(text);
          }
        });
        // Push new episode object in to the array
        mbmbamQuotes.episodes.push(quoteObject);

        //  Close current page
        await page.close();
      } // End for loop
      fs.writeFileSync('./quotes/gDocQuotes.json', JSON.stringify(mbmbamQuotes), function(err) {
        if(err) console.log(err)
      })
      await browser.close();
      bar1.stop();
    } catch (error) {
      console.log(error);
    }
  })()
