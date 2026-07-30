Buffer 和“字节流”的关系可以这样理解：

  字节流是连续传输的数据；Buffer 是 Node.js 里保存一段字节的数据对象。

  比如 TCP 传输的是字节流：

  68 65 6c 6c 6f 20 77 6f 72 6c 64

  Node 不会一次性把整条流都给你，而是分块给你：

  socket.on('data', (chunk) => {
    console.log(chunk);
  });

  每次拿到的 chunk 默认就是 Buffer：

  <Buffer 68 65 6c 6c 6f>
  <Buffer 20 77 6f 72 6c 64>

  const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

console.log(buf.toString('utf-8'));

  所以关系是：

  字节流
    ↓ 分块
  Buffer

  更完整一点：

  - 字节：最小数据单位，比如 0x68
  - Buffer：一段字节，比如 <Buffer 68 65 6c 6c 6f>
  - 字节流：连续不断的字节序列
  - Stream：Node.js 里处理“流”的对象抽象
  - chunk：Stream 每次吐出来的一小段数据，通常是 Buffer

  一句话：

  Buffer 是字节流中的一段数据；字节流由很多 Buffer chunk 组成。


  