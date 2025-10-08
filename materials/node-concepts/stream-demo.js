// readable -> use for reading data
// writable -> use for writing data
// duplex -> readable and writable
// transform -> type of duplex where output is computed based on input

const fs = require('fs');
const zlib = require('zlib'); // for compression gzip
const crypto = require('crypto');
const { Transform } = require('stream');

// create a readable stream
// const readableStream = fs.createReadStream('sample.txt', { encoding: 'utf8', highWaterMark: 16 }); // read 16 bytes at a time

class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
    this.push(encrypted);
    callback();
  }
}  

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs.createReadStream('sample.txt', { encoding: 'utf8', highWaterMark: 16 }); // read 16 bytes at a time

// new gzip object to compress the stream of data
const gzipStream = zlib.createGzip();
const encryptStream = new EncryptStream(key, vector);
const writableStream = fs.createWriteStream('sample.txt.gz.enc');

// read -> compress - > encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log('Streaming -> Compressing -> Encrypting -> Writing to file');

writableStream.on('finish', () => {
  console.log('File successfully compressed and encrypted');
});
