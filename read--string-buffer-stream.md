const data = fs.readFileSync('./a.txt');

  不传编码时，data 是 Buffer：

  console.log(Buffer.isBuffer(data)); // true

  const text = fs.readFileSync('./a.txt', 'utf8');

  传了 'utf8' 编码后，text 是 string：

  console.log(typeof text); // "string"

  所以规则是：

  - 不传编码 -> Buffer
  - 传编码 -> string


› fs.createReadStream 返回的是 stream 是吗


• 对。

  const stream = fs.createReadStream('./a.txt');

  返回的是一个 Readable Stream，准确说是 fs.ReadStream。

  它不是文件内容本身，而是一个“可读取文件内容的流对象”。

  你可以这样读：

  stream.on('data', (chunk) => {
    console.log(chunk);
  });

  stream.on('end', () => {
    console.log('读取结束');
  });

  默认情况下：

  - chunk 是 Buffer
  - 每次读取一部分文件内容
  - 直到触发 end

  如果指定编码：

  const stream = fs.createReadStream('./a.txt', {
    encoding: 'utf8'
  });

  那 chunk 就是字符串