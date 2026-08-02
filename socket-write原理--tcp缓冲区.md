
 socket.write(buffer) 是把buffer 写到 socket的缓冲去吗
  是，但更准确地说：

  socket.write(buffer)

  是把 buffer 里的字节交给 socket 的写入流程，这些字节会进入发送方向的缓冲区，然后由操作系统
  通过 TCP 发出去。

  可以理解成：

  Buffer 中的字节
    -> Node socket 的写队列
    -> 操作系统 TCP 发送缓冲区
    -> 网络
    -> 对端

  所以它不是写到“接收/输入缓冲区”，而是写到发送/输出缓冲区。

  对应关系是：

  socket.write(buffer)
    写出去
    发送缓冲区

  socket.on('data', chunk)
    收进来
    接收缓冲区



    socket.on('data', chunk)
      收进来
      接收缓冲区  是把接收缓冲区的数据 存到chunk中吗


• 可以这么理解，但再精确一点：

  chunk 是 Node 从 socket 的接收方向读出来的一段数据。

  链路大概是：

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