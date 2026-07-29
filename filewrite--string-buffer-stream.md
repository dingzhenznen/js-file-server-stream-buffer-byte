# Node.js 写文件：string / Buffer / stream 的区别

## 1. 写入 string

```js
import fs from 'node:fs';

fs.writeFileSync('./a.txt', 'hello world', 'utf8');
```

写入字符串时：

- 字符串会按照指定编码转成字节
- 常见编码是 `utf8`
- 适合写文本文件，比如 `.txt`、`.json`、`.html`

也可以不显式写编码：

```js
fs.writeFileSync('./a.txt', 'hello world');
```

默认也是按 `utf8` 写入。

## 2. 写入 Buffer

```js
const buffer = Buffer.from('hello world', 'utf8');

fs.writeFileSync('./a.txt', buffer);
```

写入 Buffer 时：

- Buffer 已经是字节数据
- Node 不需要再把它从字符串编码成字节
- 适合写二进制文件，比如图片、音频、压缩包

例如写图片：

```js
const imageBuffer = fs.readFileSync('./a.png');

fs.writeFileSync('./copy.png', imageBuffer);
```

这里：

- `readFileSync('./a.png')` 不传编码，得到的是 Buffer
- `writeFileSync('./copy.png', imageBuffer)` 把这些字节写到新文件

## 3. 写入 stream

```js
const writeStream = fs.createWriteStream('./a.txt');

writeStream.write('hello\n');
writeStream.write('world\n');
writeStream.end();
```

`createWriteStream` 返回的是一个 Writable Stream。

它不是一次性写完整个文件，而是可以分批写入：

- 每次 `write()` 可以写 string
- 每次 `write()` 也可以写 Buffer
- 最后调用 `end()` 表示写入结束

例如写 Buffer：

```js
const writeStream = fs.createWriteStream('./copy.png');
const imageBuffer = fs.readFileSync('./a.png');

writeStream.write(imageBuffer);
writeStream.end();
```

## 4. 读 stream 接到写 stream

```js
const readStream = fs.createReadStream('./a.png');
const writeStream = fs.createWriteStream('./copy.png');

readStream.pipe(writeStream);
```

这种方式适合复制大文件：

- `readStream` 分块读取文件
- 每个 chunk 通常是 Buffer
- `writeStream` 分块写入文件
- 不需要一次性把整个文件读进内存

## 5. 覆盖写和追加写

`fs.writeFileSync` 默认是覆盖写：

```js
fs.writeFileSync('./a.txt', 'new content');
```

如果文件存在，旧内容会被替换。

追加写要用：

```js
fs.appendFileSync('./a.txt', 'append content\n');
```

或者：

```js
const writeStream = fs.createWriteStream('./a.txt', {
  flags: 'a'
});

writeStream.write('append content\n');
writeStream.end();
```

## 6. 总结

- 写 string：适合文本内容，Node 会按编码转成字节
- 写 Buffer：适合二进制内容，Buffer 本身就是字节
- 写 stream：适合大文件或分批写入，内存占用更低
- `writeFileSync` 默认覆盖文件
- 追加内容用 `appendFileSync` 或 `createWriteStream({ flags: 'a' })`

一句话：

**写文件最终写入的都是字节；string 会先编码成字节，Buffer 已经是字节，stream 是分批写入字节。**
