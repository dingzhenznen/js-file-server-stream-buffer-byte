
› stream = fs.createReadStream(),stream 从磁盘文件系统把数据读到自己的缓冲区，然后触发
  data 事件是吗


• Searching the web

• Searched Node.js fs.createReadStream readable stream data event official docs

───────────────────────────────────────────────────────────────────────────────────────

• 对，方向是对的，但要说得更准一点：

  fs.createReadStream() 返回的是一个 Readable
  流，文件内容不会一次性全读进内存，而是按块从磁盘读入流的内部缓冲区。当你监听 data
  事件后，流会进入 flowing 模式，缓冲区里有数据就不断把 chunk
  交给你。官方文档是这么描述 data 事件的。来源：Node.js stream 文档
  (https://nodejs.org/download/release/v26.3.0/docs/api/stream.html)、Node.js fs 文档
  (https://nodejs.org/docs/latest-v10.x/api/fs.html)

  所以更准确的理解是：

  - 磁盘文件 -> fs.ReadStream 的内部缓冲
  - 监听了 data -> Node 把缓冲里的 chunk 通过 data 事件吐给应用
  - 读完后触发 end

  补一句，data 不是“文件读完才触发”，而是“有一块数据可读就触发一次”。如果你愿意，我可以
───────────────────────────────────────────────────────────────────────────────────────


› 数据读人 stream 的缓冲区就会触发data 事件吗


• 不完全是。

  更准确地说：

  - 数据先进入 Readable 的内部缓冲区
  - 只有当流处于 flowing 模式时，才会把缓冲区里的数据通过 data 事件发出来

  所以不是“只要读进缓冲区就立刻触发 data”，而是：

  - 有 data 监听器，或者调用了 stream.resume()
  - 流开始 flowing
  - 缓冲区里有 chunk 时，才连续触发 data

  如果流是 paused 模式，数据也可能已经进了缓冲区，但不会马上触发 data。

  一句话版：

  > data 事件不是“缓冲区一有数据就自动触发”，而是“流进入流动模式后，缓冲区里的数据被分
  > 发时触发”。


› 要先注册 data 事件，流才会进入flowing 模式触发data 事件，是吗


• 基本是。

  Readable 流在注册 data 监听器后，通常会切到 flowing 模式，然后开始持续吐出 data 事
  件。

  但更精确一点：

  - on('data', ...) 会让流进入 flowing 模式
  - stream.resume() 也会进入 flowing 模式
  - pipe() 也会推动它进入 flowing 模式

  所以你可以记成：

  > data 监听器是让流开始“自动推送数据”的最常见开关。

  但注意一点：
  flowing 不是只靠 data 才能进入，resume() 和 pipe() 也可以。