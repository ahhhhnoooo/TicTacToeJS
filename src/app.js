const http = require('node:http');
const fs = require('node:fs');

http.createServer((req, res) => {
  let filePath;
  if (req.url !== '/') {
    filePath = './src' + req.url;
  } else {
    filePath = './src/index.html';
  }
  console.log(filePath);
  fs.readFile(filePath, (err, data) => {
    if(filePath.endsWith(".html")) res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(data);
  });
}).listen(8000);