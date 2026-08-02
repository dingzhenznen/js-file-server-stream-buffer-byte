import fs from 'node:fs';

const fileBuffer = fs.readFileSync('./a.jpg');
const boundary = `----node-boundary-${Date.now().toString(16)}`;

const body = Buffer.concat([
  Buffer.from(
    `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="username"\r\n` +
      `\r\n` +
      `tom\r\n`,
    'utf8'
  ),
  Buffer.from(
    `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="a.jpg"\r\n` +
      `Content-Type: image/jpeg\r\n` +
      `\r\n`,
    'utf8'
  ),
  fileBuffer,
  Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8')
]);

const res = await fetch('http://127.0.0.1:3002/upload', {
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': String(body.length)
  },
  body
});

console.log(await res.json());
