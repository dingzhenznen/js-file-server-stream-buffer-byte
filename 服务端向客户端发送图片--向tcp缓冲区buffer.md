  const imageBuffer = createDemoPngBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Disposition': 'attachment; filename="demo-image.png"',
    'Content-Length': imageBuffer.length
  });

  res.end(imageBuffer);



  我先确认这个文件的上下文是不是 Node 原生 http server，然后再回
  答 res.end(Buffer) 到底经过哪几层。

• Explored
  └ Read download-contenttype-server.js
    List js_file_stream_buffer

────────────────────────────────────────────────────────────────

• 可以这么理解：res.end(imageBuffer) 最终就是把这段 Buffer 字节
  写到连接对应的 socket 里发送给客户端。

  但中间要多一层 HTTP 处理：

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Disposition': 'attachment; filename="demo-
    image.png"',
    'Content-Length': imageBuffer.length
  });

  res.end(imageBuffer);

  实际流程是：

  imageBuffer
    ↓
  ServerResponse 组织 HTTP 响应
    ↓
  响应头 + 空行 + 响应体 Buffer
    ↓
  写入底层 socket
    ↓
  TCP 发送字节

  所以严格说：

  - 你不是直接操作 socket.write(imageBuffer)
  - 你是调用 http.ServerResponse.end(imageBuffer)
  - Node 的 http 模块会先把响应头写出去
  - 然后把 imageBuffer 作为响应体写到底层 socket

  也可以这样理解：

  res 是 HTTP 层的 Writable Stream
  socket 是 TCP 层的 Duplex Stream
  res.end(buffer) 最终会落到底层 socket 写字节

  所以你的说法基本对，但更准确是：

  向 HTTP 响应流写入 Buffer，Node 再把 HTTP 报文写入底层
  socket。