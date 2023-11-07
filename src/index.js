const http = require('http');
const getUsers = require('./modules/users');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    const url = new URL(request.url, "http://127.0.0.1:3003");
    const searchParams = url.searchParams;
  
    if (searchParams.size === 0 && url.pathname === '/') {
      response.statusCode = 200;
      response.end("Hello, World!");
    } else if (searchParams.has("hello")) {
      const name = searchParams.get("hello");
      if (!name) {
        response.statusCode = 400;
        response.end("Enter a name");
      } else {
        response.statusCode = 200;
        response.end(`Hello, ${name}.`);
      }
    } else if (searchParams.has("users")) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(getUsers());
    } else {
      response.statusCode = 500;
      response.end("");
    }
  });

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});