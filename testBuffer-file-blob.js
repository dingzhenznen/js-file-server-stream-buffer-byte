

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


const f = new File(['abc'], 'a.txt');

new filess = new File([buf52], 'b.txt');

console.log(f instanceof Blob); // true
console.log(f instanceof File); // true
console.log(Object.getPrototypeOf(File.prototype) === Blob.prototype); // true




new File(['abc'], 'a.txt');

new File([Buffer.from('abc')], 'a.txt');

new File([new Uint8Array([97, 98, 99])], 'a.txt');

new File([new Blob(['abc'])], 'a.txt');

// 区别是：

// new File(['abc'], 'a.txt')

// 这里的字符串 'abc' 会按字符串编码转成字节，通常是 UTF-8：

new File([content2], 'a.jpg')

// 这里是直接把已有的文件字节放进去，更适合图片、PDF、压缩包这类二进制文件。