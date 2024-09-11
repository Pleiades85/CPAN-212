const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcome to the homepage!");
    res.end();
  } else if (req.url === "/contact") {
    fs.readFile(
      path.join(__dirname, "/pages/contact.html"),
      "utf8",
      (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      }
    );
  } else if (req.url === "/about") {
    fs.readFile(
      path.join(__dirname, "/pages/about.html"),
      "utf8",
      (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      }
    );
  } else if (req.url === "/login") {
    fs.readFile(
      path.join(__dirname, "/pages/login.html"),
      "utf8",
      (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      }
    );
  } else {
    res.write("page not found!");
    res.end();
  }
});

server.listen(3001, () => {
  console.log("Server is running at http://localhost:3001/");
});
