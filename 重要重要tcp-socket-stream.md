 https://www.nodeapp.cn/stream.html
  根据文章，socket 是流，createServer 后server 监听在制定端口，当socket建立连接后，tcp
  收到自己流后把数据写的socket的缓冲区，在应用层使用socket.on 来消费数据，这样理解正确
  吗


• 我先看这篇文章的原文，再对照你现在的理解逐句校准。这样能避免把“TCP 字节流、socket 缓
  冲区、Node 事件回调”混在一起。

• Searching the web

• Searched https://www.nodeapp.cn/stream.html

───────────────────────────────────────────────────────────────────────────────────────

• 大体对，但要补两层精确说法：

  1. net.createServer 监听端口后，connection 建立时拿到的 socket 是一个 Duplex
     流，既可读也可写；Node 文档里明确说 net.Socket 是
     Duplex，读写两端有各自独立的缓冲区。来源：Node.js 中文文档
     (https://www.nodeapp.cn/stream.html)
  2. socket.on('data') 不是“等 TCP 全部结束再消费”，而是在可读端进入 flowing 模式后，分
     块消费收到的数据。文档里也说了，Readable 流触发 'data' 事件来通知应用有数据可读。
     来源同上。

  你这句话里最需要修正的是这一段：

  - 不是“TCP 收到数据后把数据写到 socket 的缓冲区”
  - 更准确是：内核收到 TCP 字节流，Node 的 socket 作为可读流从底层持续取数据，先进入它
    自己的内部缓冲，再通过 data 事件交给应用层

  所以你的整体理解可以改成：

  > server 监听端口后，连接建立得到一个 socket。这个 socket 是双工流，网络层收到的字节
  > 先进入底层/流缓冲，应用层通过 socket.on('data') 分块消费；end 只是表示对端写完了，
  > 不是开始处理请求的唯一时机。

  对你现在的 HTTP 代码来说，data 里累计字节、等 parseHttpRequest 判断完整后就处理，是对
  的。end 更适合做收尾，不适合作为“才开始解析请求”的信号。




  内核收到 TCP 字节流，Node 的 socket 作为可读流从底层持续取数据，先进入它
    自己的内部缓冲，再通过 data 事件交给应用层


    fs.createReadStream() 返回的是一个 Readable
  流，文件内容不会一次性全读进内存，而是按块从磁盘读入流的内部缓冲区。当你监听 data
  事件后，流会进入 flowing 模式，缓冲区里有数据就不断把 chunk
  交给你。