const puppeteer = require('puppeteer'),
      cheerio = require('cheerio'),
      fs = require('fs');

// Generate array of URL's from the Complpeted MBMBAM Transcripts G Doc list.
(async () => {
  console.log('Is this thing on...');
  try {
    // Fires up puppeteer in headless mode, and loads up the page.
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 10000
    });
    await page.goto('https://docs.google.com/document/d/1x7pn2XZp6UxVUD9oOkuweInUKa66KrcmvGt-ISNxJLE/edit');
    // Assins all the HTML content of the page to a variable and then give cheerio access to it.
    let html = await page.content();
    const $ = cheerio.load(html);
    // $().logHtml() function creator.
    $.prototype.logHtml = function() {
      console.log(this.html());
    };
    // Sets up that array for later use.
    let linkArray = {
      urls: []
    };
    // Gets all the links on the page
    let links = $('#kix-appview').find('a.kix-link');
    // Loops through all the links, pulls the URL out and adds it to the linkArray.
    links.each(function (i, elem) {
      if ($(this).attr('href') !== 'https://docs.google.com/document/d/1w1hOGVWNtPV6hedi2puDru-Xq6nzo87KQTxPB7GX8kw/edit?usp=sharing') {
        linkArray.urls.push($(this).attr('href'));
      }
    });

    // linkArray.urls.slice(2);
    fs.writeFileSync('./gDocLinks.json', JSON.stringify(linkArray), function(err) {
      if(err) console.log(err)
    })
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})()
