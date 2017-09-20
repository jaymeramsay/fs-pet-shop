'use strict';
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8002;

app.disable('x-powered-by');

app.get('/pets', function (req, res) {
  if (req.url.includes('/pets')) {
    // if "pets" exits, then read the "pet"
    let petData = 'pets.json';
    fs.readFile(petsPath, 'utf8', (err, petData) => {

      // 3
      res.setHeader('Content-Type', 'application/json');

      // 4
      let petID = req.url.slice(1).split('/')[1];
      let pets = JSON.parse(petData);

      // 5
      if (pets[petID]) {
        let pet = pets[petID];
        console.log(pet);
        res.send(JSON.stringify(pet));
      }
      else {
        res.send(JSON.stringify(pets));
      }
    });
  }
  else {
    res.end();
  }

});

app.listen(port, function () {
  console.log('Listening on port', port);
});
