 const { spawn } = require('child_process');
  const ls = spawn('ls', ['-lh', '/usr']);

  ls.stdout.on('data', (data) => {
    console.log(`输出：${data}`);
  });
  data 默认是string 还是buffer


• 默认是 Buffer。

  ls.stdout.on('data', (data) => {
    console.log(Buffer.isBuffer(data)); // true
  });

  所以这里：

  console.log(`输出：${data}`);

  因为用了模板字符串，JS 会自动调用：

  data.toString()

  所以你看到的是文本。

  如果你想明确转字符串，可以写：

  ls.stdout.on('data', (data) => {
    console.log(`输出：${data.toString('utf8')}`);
  });

  也可以给 stdout 设置编码：

  ls.stdout.setEncoding('utf8');

  ls.stdout.on('data', (data) => {
    console.log(typeof data); // string
    console.log(`输出：${data}`);
  });

  总结：

  - spawn().stdout 是 Readable Stream
  - 默认 data chunk 是 Buffer
  - setEncoding('utf8') 后，chunk 是 string