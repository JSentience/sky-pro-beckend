import http from "http";
import { getUsers } from "./modules/users.js";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");

  if (url.search === "") {
    response.writeHead(200);
    response.end("Hello, World");
  } else if (url.searchParams.has("hello")) {
    const name = url.searchParams.get("hello");

    if (!name) {
      response.writeHead(400);
      response.end("enter name");
    } else {
      response.writeHead(200);
      response.end(`Hello,${name}`);
    }
  } else if (url.searchParams.has("users")) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(getUsers());
  } else {
    response.writeHead(500);
    response.end("");
  }

  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
});
server.listen(3001);
