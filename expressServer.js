'use strict';
let fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8002;

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/pets', function (req, res) {
  fs.readFile(petsPath, 'utf8', function (err, petData) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petData);

    res.json(pets);
  });
});

app.get('/pets/:id', function (req, res) {
  fs.readFile(petsPath, 'utf8', function (err, petData) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petData);
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.post('/pets', function (req, res) {
  if (err) {
    console.error(err.stack);
    return res.sendStatus(400);
  }
  res.send(JSON.stringify(req.body));
})

app.listen(port, function () {
  console.log('Listening on port', port);
});

module.exports = app;
