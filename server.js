import { createServer } from "http";

createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("Server is running !");
  })
  .listen(8000);
