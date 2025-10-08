// objects -> handle binary data
// Buffer -> global object
// useful for file system opeartions, cryptography and imgae processing
const fs = require('fs');

const bufferOne = Buffer.alloc(20); // allocate 10 bytes of memory
bufferOne.write('Hello Buffer World'); // write string to buffer
console.log(bufferOne);
console.log(bufferOne.toString()); // convert buffer to string

const bufferTwo = Buffer.from([1, 2, 3]); // create buffer from array
console.log(bufferTwo);

const bufferThree = Buffer.from('Hello'); // create buffer from string
console.log(bufferThree);
console.log(bufferThree.toString()); // convert buffer to string

// read file as buffer
fs.readFile('sample.png', (err, data) => {
  console.log(data); // data is a Buffer!
  console.log(data?.length); // size of the file in bytes
  console.log("Error:", err);
});