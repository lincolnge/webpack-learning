// http://www.jianshu.com/p/5977193b3cb1
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const fs = require('fs');

const url = require('url');
const path = require('path');


process.env.NODE_PATH = process.cwd();
require('module').Module._initPaths();

require('test.js');

// const index = fs.readFileSync('index.html');
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   // res.end('Hello World\n');
//   res.end(index);
// });

// 从命令行参数获取root目录，默认是 dist 目录
const root = path.resolve(process.argv[2] || './dist');

console.log('Static root dir: ' + root);

// 创建服务器
const server = http.createServer(function (request, response) {

  // 获得URL的path，类似 '/css/bootstrap.css'
  const pathname = url.parse(request.url).pathname;

  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css'
  const filepath = path.join(root, pathname !== '/' ? pathname : 'index.html');

  // 获取文件状态
  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {

      // 没有出错并且文件存在
      console.log('200 ' + request.url);

      // 发送200响应
      response.writeHead(200);

      // 将文件流导向response
      fs.createReadStream(filepath).pipe(response);
    } else {

      // 出错了或者文件不存在
      console.log('404 ' + request.url);

      // 发送404响应
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
