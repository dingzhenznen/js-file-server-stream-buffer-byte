import fs from 'node:fs';
const text = fs.readFileSync('./ddd.txt');
console.log(text);

const stream = fs.createReadStream('./ddd.txt');
stream.on('data', (chunk) => {
  console.log(chunk);
});