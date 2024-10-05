
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-type': 'text/html' });
//     res.write("Server is Running! and the request is" + req.url);
//     res.end();
// }).listen(8080);

const http = require("http");
const url = require("url");

var year = 2019;
var month = 1;
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const year = parsedUrl.searchParams.get("year") || "Year not provided";
    const month = parsedUrl.searchParams.get("month") || "Month not provided";
    const txt = `${year} ${month}`;
    res.end(txt);
  })
  .listen(8080, () => {
    console.log("Server running on http://localhost:8080/");
  });