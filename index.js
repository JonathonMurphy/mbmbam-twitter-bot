console.log('MBMBAM Twitter Bot is starting');

const Wikiaapi = require('nodewikiaapi');
const cheerio = require('cheerio');

const util = require('util');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

const mywiki = new Wikiaapi('mbmbam');

const wiki = 'http://mbmbam.wikia.com';
const filePath = './episodes/'
const html = '.html';


// Episode List id: 2055
// Test Episode ID to figure out what we can pull id: 2184
// id="Quotes" can be used to pull quotes from episode pages that have them

/*
const blah = new Promise(resolve, reject) => {
  let curl = "curl example.com -o ../html_folder";
  // Execute curl command to download selected page
  child = exec(curl, (error, stdout, stderr) => {
    // console.log(stdout);
    // console.log(stderr);

    resolve(stdout);

    if(error !== null) {
      console.log('exec error: ' + error);
      reject(error);
    }
  });
}

blah
  .then(output => {
    console.log(output)
    // do whatever you need to do with output
  })
  .catch(error => {
    console.log(error)
  })
  */

async function getArtilcesHtml (){
  // Gets a list of all articles with the word "Episode" in the title
  mywiki.getArticlesList({limit: 500}).then(data =>{
    //Loop through first 500 articles alphabettically
    for (i = 0; i < data.items.length; i++) {
      // Select the oens that have "Episode_" in the title (These are the articales about specific episodes)
      let episode = data.items[i].url.includes("Episode_300");
        if (episode) {
          console.log(data.items[i]);
          // Variables for file paths and URLS
          let urlPath = data.items[i].url;
          let disposHtml = urlPath.replace('/wiki/', '').concat('', html);
          console.log('Full Path: ' + wiki + urlPath);
          console.log('Disposable HTML file: ' + disposHtml);
          // // Bash command for downloading html tiles from wikia
          // let curl = "curl " + wiki + urlPath +" -o " + filePath + disposHtml;
          //
          // // Execute curl command to download individual selected article page
          // child = exec(curl, function(error, stdout, stderr) {
          //   console.log(stdout);
          //   console.log(stderr);
          //     if(error !== null) {
          //       console.log('exec error: ' + error);
          //     }
          //   });
          //
          //   // Console log if file is successfullly downloaded
          //   if (fs.existsSync (filePath + disposHtml)){
          //       console.log("Html file created: " + filePath + disposHtml);
          //       return;
          //   }
          const curlPromise = new Promise((resolve, reject) => {
            let curl = "curl " + wiki + urlPath +" -o " + filePath + disposHtml;
            // Execute curl command to download selected page
            child = exec(curl, (error, stdout, stderr) => {
              resolve(stdout);
              reject(error);
            });
          });
          curlPromise
            .then(output => {
              console.log("Html file created: " + filePath + disposHtml);
              // do whatever you need to do with output
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

getArtilcesHtml ()




function getQuoteHtml (){
  //console.log('Starting from dir '+filePath+'/');
  if (!fs.existsSync (filePath)){
      console.log("no dir ",filePath);
      return;
  }
  var files=fs.readdirSync (filePath);
  for(var i=0;i<files.length;i++){
      var filename=path.join(filePath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()){
          getQuoteHtml(filename,html); //recurse
      }
      else if (filename.indexOf(html)>=0) {
          console.log('-- found: ',filename);
      };
  };
}


function oldCode (){
  // Sleep function (may be useless later)
  function sleep(millis) {
      return new Promise(resolve => setTimeout(resolve, millis));
  }
  async function main() {

      // Execute sleep() (may be useless later)
      await sleep(3000);
      // Select the quote section from the downloaded html file, and create a new html file for it
      fs.readFile(disposHtml, 'utf8', dataLoaded);
      function dataLoaded(err, data) {
          $ = cheerio.load('' + data + '');
          $('#Quotes').parent().siblings('dl').find('i').each(function(i, elem) {
              var id = 'quote_' + i,
                  filename = id + '.html',
                  content = $.html(elem);
              fs.writeFile(filename, content, function(err) {
                  console.log('Html file written to: ./' + filename);
              });
          });
      }
      // Execute sleep() (may be useless later)
      await sleep(1000);
      // Bash commands for deleting html tiles from wikia
      let rm = "rm " + disposHtml;
      // Execute rm command to delete individual selected article page
      child = exec(rm, function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
          if(error !== null) {
            console.log('exec error: ' + error);
          }
        });
      console.log("Html file deleted: ./" + disposHtml);
  }
  main();
}
