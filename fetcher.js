//fetcher.js 

//should take a URL as a command-line arg as well as a local file path and download the resource to the specified path 

//use request library to make the HTTP request
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//require fs for file writing
const fs = require("fs");

//get command line args 
const args = process.argv.slice(2);

//for request 

request(args[0], (error, response, body) => {
  
  //can pass options as an optional parameter which is an object that can include a flag for a system error using wx as the file already exists
  fs.writeFile(args[1], body, {flag: 'wx'}, (error) => {

    // if (response && response.statusCode !== 200) for if given URL that results in an error or non -200 result

    if(error.code === 'ENOENT') {
      return console.log("Local file path does not exist, check input")
    };

    if (error.code === 'EEXIST') {
      rl.question('File already exists, press y followed by enter to overwrite file, otherwise skip and exit app.', (answer) => {
        if (answer === "y") {
          fs.writeFile(args[1], body, () => {
            console.log(`File has been overwritten and downloaded. ${body.length} saved bytes to ${args[1]}`)
          })
        }
        rl.close();
      })
      return;
    };

    //the length gives you the number of bytes
    console.log(`Downloaded and ${body.length} saved bytes to ${args[1]}`);
    
  });


})

//use Node's fs module to write the file


// fs.writeFile(args[1], (error) => {
//   if (error) {
//     // Handle error
//     console.log("Failed to write to file");
//     return;
//   }
  
//   console.log(`Downloaded and saved ${fileSizeBytes} bytes to ${args[1]}`)
  
// });

// let fileSize = fs.statSync(args[1]);
// let fileSizeBytes = fileSize.size;

//do not use the pipe function
//do not use synchronous functions 



