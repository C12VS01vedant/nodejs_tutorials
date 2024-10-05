const http = require("http");
const { dateModule } = require("./custom_module").default;

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Date and time are currently: " + dateModule());
    res.end();
  })
  .listen(8080);

console.log("Server running on http://localhost:8080/");
