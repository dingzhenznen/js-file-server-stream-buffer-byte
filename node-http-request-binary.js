const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const uploadFilePath = process.argv[2] || path.join(__dirname, 'ddd.txt');
const filename = path.basename(uploadFilePath) || 'demo.bin';

const bodyBuffer = fs.existsSync(uploadFilePath)
  ? fs.readFileSync(uploadFilePath)
  : Buffer.from('hello binary upload\n', 'utf8');

const req = http.request(
  {
    hostname: '127.0.0.1',
    port: 3002,
    path: `/upload-raw?filename=${encodeURIComponent(filename)}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': bodyBuffer.length
    }
  },
  (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const responseBody = Buffer.concat(chunks).toString('utf8');

      console.log('status:', res.statusCode);
      console.log('headers:', res.headers);
      console.log('body:', responseBody);
    });
  }
);

req.on('error', (error) => {
  console.error('upload error:', error.message);
});

req.end(bodyBuffer);
