'use strict';
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8002;

app.disable('x-powered-by');

app.get('/pets', function (req, res) {
  let petData = 'pets.json';
  fs.readFile(petsPath, 'utf8', function (err, petData) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petData);

    res.send(petData);
  });
});

app.get('/pets/:id', function (req, res) {
  fs.readFile(petsPath, 'utf8', function (err, petData) {
    console.log('this works here');
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    console.log(id);
    let pets = JSON.parse(petData);
    console.log(petData);
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});



app.listen(port, function () {
  console.log('Listening on port', port);
});
