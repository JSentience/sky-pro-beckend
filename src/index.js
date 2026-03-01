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
});
server.listen(3001);
