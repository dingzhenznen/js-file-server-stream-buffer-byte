

const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

console.log(buf.toString('utf-8'));

const buf5 = Buffer.from('tést');


console.log(buf5); // 输出 'tést'

const buf52 = Buffer.from('test');
console.log(buf52); // 输出 'tést'

import fs from 'node:fs';

var buffer = fs.readFileSync('ddd.txt');
console.log('buffer---',buffer);
console.log('buffer---',buffer[1]);

var content = fs.readFileSync('ddd.txt', 'utf-8');
console.log('content',content);

var content2 = fs.readFileSync('./a.jpg');

console.log('content2',content2);