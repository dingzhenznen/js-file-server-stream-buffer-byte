  对端发来数据
    -> 操作系统 TCP 接收缓冲区
    -> Node 从接收缓冲区取出一段数据
    -> 触发 data 事件
    -> 把这段数据作为 chunk 传给回调

  所以：

  socket.on('data', (chunk) => {
    console.log(chunk);
  });

  这里的 chunk 就是本次读到的一块字节数据，通常是 Buffer。

    但要注意：chunk 不一定等于对方一次 write() 的完整内容。TCP 是字节流，可能出现：

  - 对方一次 write()，你收到多个 chunk
  - 对方多次 write()，你一次收到一个合并后的 chunk

  所以 chunk 只是“当前读到的一段字节”。



  var stream =file.createReadStream('./a.txt')
  stream.on('data', (chunk) => {})
  原理一样 ，file.createReadStream 异步，当有写入数据 就会触发 data 事件
