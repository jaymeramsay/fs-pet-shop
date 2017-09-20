const fs = require('fs');
let command = process.argv[2];
let processArray = process.argv

if (!command) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

if (command === 'read') {
  read(processArray[3])
}

if (command === 'create') {
  create(processArray[3], processArray[4], processArray[5]);
}

function read(index) {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let pets = JSON.parse(data);
    if (index && pets[index]) {
      err ? console.error(err) : console.log(pets[index]);
      console.error('Usage: node pets.js read INDEX');
    }
  })
}
