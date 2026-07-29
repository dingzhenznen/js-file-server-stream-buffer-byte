import fs from 'node:fs';

const fileBuffer = fs.readFileSync('./a.jpg');
const fileBlob = new Blob([fileBuffer], {
  type: 'image/jpeg'
});

const form = new FormData();
form.append('username', 'tom');
form.append('file', fileBlob, 'a.jpg');

const res = await fetch('http://127.0.0.1:3002/upload', {
  method: 'POST',
  body: form
});

console.log(await res.json());
