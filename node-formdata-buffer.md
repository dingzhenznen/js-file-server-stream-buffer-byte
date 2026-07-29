会，但要看你用的是哪种 FormData / fetch 组合。

  你这个文件里是：

  import FormData from 'form-data';

  const form = new FormData();

  await fetch(url, {
    method: 'POST',
    body: form
  });

  理论上发送时需要这个请求头：

  Content-Type: multipart/form-data; boundary=...

  其中 boundary 很重要，服务端就是靠它拆分每个 part。

  不过注意：如果用的是 form-data 这个 npm 包，很多场景下需要显式把 header 带上：

  const res = await fetch('http://127.0.0.1:3002/upload', {
    method: 'POST',
    headers: form.getHeaders(),
    body: form
  });

  form.getHeaders() 会生成类似：

  {
    'content-type': 'multipart/form-data; boundary=--------------------------xxxx'
  }

  所以更稳的写法是：

  const res = await fetch('http://127.0.0.1:3002/upload', {
    method: 'POST',
    headers: form.getHeaders(),
    body: form
  });

  总结：

  - FormData 会负责生成 multipart body
  - Content-Type 必须带 boundary
  - 浏览器原生 FormData：通常自动加，不要手动设置
  - Node 的 form-data 包：建议用 headers: form.getHeaders() 显式加上