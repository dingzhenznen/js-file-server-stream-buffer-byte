const stream = fs.createReadStream('./a.txt');

  这句会创建一个可读流，文件内容不会立刻一次性全部读完。Node 会异步地从文件中分块读取数
  据。

  当流进入 flowing mode 后，比如你监听了：

  stream.on('data', (chunk) => {
    console.log(chunk);
  });

  只要有一块数据被读出来，就会触发一次 data 事件，chunk 通常是一个 Buffer。

  fs.createReadStream()
    -> 创建文件读取流
    -> 异步分块读取文件
    -> 每读到一块数据
    -> 触发 data 事件
    -> 把这一块数据作为 chunk 传给回调


    createReadStream 本身主要是“创建流对象”，真正开始读通常发生在你消费它之后，
  比如监听 data、调用 pipe()、resume() 等。


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


const stream = fs.createReadStream('./a.txt');
 是异步读取文件， 当有数据可读时 就会触发data事件（emit)
 https://www.nodeapp.cn/stream.html#stream_two_modes

(当流中的数据可以读取时，Readable 流使用 EventEmitter API 来通知应用。 这些数据可以使用多种方法从流中读取。)

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




