
https://zhuanlan.zhihu.com/p/568915443

因为你现在用的是 Node 原生 FormData。

  原生 FormData.append() 里，如果你想让某个字段表现成“文件 part”，更标准的写法是传 Blob
  或 File：

  const fileBlob = new Blob([fileBuffer], {
    type: 'image/jpeg'
  });

  form.append('file', fileBlob, 'a.jpg');

  这样生成的 multipart 里会包含类似：

  Content-Disposition: form-data; name="file"; filename="a.jpg"
  Content-Type: image/jpeg

  如果直接传 Buffer，原生 FormData 不一定会把它当文件处理，可能会把它当普通字段，或者行
  为不符合预期。

  区别：

  - Buffer：Node.js 专用的二进制字节容器
  - Blob：Web 标准里的二进制数据对象，带 type，适合 fetch / FormData
  - File：特殊的 Blob，额外带文件名、修改时间等信息

  可以理解成：

  Buffer：Node 里的字节
  Blob：Web API 里的二进制对象
  FormData：更认识 Blob/File 这种 Web 类型

  所以这里不是因为二进制必须转 Blob，而是因为：

  原生 FormData 更适合接收 Blob/File 来表示文件上传。