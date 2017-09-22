'use strict';
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8002;

app.disable('x-powered-by');

app.get('/pets', function (req, res) {
  let petData = 'pets.json'
  fs.readFile(petsPath, 'utf8', function (err, petData) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petData);

    res.send(petData);
  });
});

app.get('/pets:id', function (req, res) {
  fs.readFile(petsPath, 'utf8', function (err, petData) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petData);

  })
})



app.listen(port, function () {
  console.log('Listening on port', port);
});
