const http = require('http');
const fs = require('fs');

let server = http.createServer((request, response) => {
  // accessing a request the URL that includes "pets" and set up a conditional if the URL does include "pets"
  if (request.url.includes('/pets')) {
    // if "pets" exits, then read the "pet"
    fs.readFile('pets.json', 'utf8', (err, data) => {

      // 3
      response.setHeader('Content-Type', 'application/json');

      // 4
      let petID = request.url.slice(1).split('/')[1];
      let pets = JSON.parse(data);

      // 5
      if (pets[petID]) {
        let pet = pets[petID];
        response.end(JSON.stringify(pet));
      }
      else {
        response.end(JSON.stringify(pets));
      }
    });
  }
  else {
    response.end();
  }
});


server.listen(8000);

module.exports = server;
