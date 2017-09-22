const fs = require('fs');
let command = process.argv[2];
let processArray = process.argv

if (!command) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

if (command === 'read') {
  read(processArray[3]);
}

if (command === 'create') {
  create(processArray[3], processArray[4], processArray[5]);
}

if (command === 'update') {
  update(processArray[3], processArray[4], processArray[5], processArray[6]);
}

if (command === 'destroy') {
  destroy(processArray[3]);
}

function read(index) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let pets = JSON.parse(data);
    if (index && pets[index]) {
      err ? console.error(err) : console.log(pets[index]);
      // console.error('Usage: node pets.js read READ INDEX');
    }
    else if (!index) {
      console.error('Usage: node pets.js read INDEX');
    }
    else if (!pets[index]) {
      parseInt(index) ? console.error('Read INDEX') : console.error('NUMBERS only');
    }
    else {
      err ? console.error(err) : console.log(pets);
    }
  });
}

function create(age, kind, name) {
  if (age && kind && name) {
    fs.readFile('pets.json', 'utf8', (err, data) => {
      let pets = JSON.parse(data);
      pets.push({
        age: parseInt(age),
        kind: kind,
        name: name,
      });
      let newData = JSON.stringify(pets);
      fs.writeFile('pets.json', newData, (err) => {
        err ? console.error(err) : console.log(pets);
      });
    });
  }
}

//change existing information within my json file
function update(index, age, kind, name) {
  //read the file
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let pets = JSON.parse(data);
    if (age && kind && name) {
      //access the information I want to change by index
      pets[index] = {
        //replace old information with new information
        age: parseInt(age),
        kind: kind,
        name: name,
      };
    }
    //write the new data to the file
    let newData = JSON.stringify(pets);
    fs.writeFile('pets.json', newData, (err) => {
      err ? console.error(err) : console.log(pets);
    });
  });
}

function destroy(index) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let pets = JSON.parse(data);
    if (index && pets[index]) {
      pets.splice(pets[index], 1);
    }
    let newData = JSON.stringify(pets);
    fs.writeFile('pets.json', newData, (err) => {
      err ? console.error(err) : console.log(pets);
    });
  });
}
