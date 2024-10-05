const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// Enum-like structure for file operations
const FileOperation = Object.freeze({
  READ: "READ",
  CREATE: "CREATE",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
});

// File operation handler
async function handleFileOperation(operation, filename, content = "") {
  const filePath = path.join(__dirname, "files", filename);

  try {
    switch (operation) {
      case FileOperation.READ:
        return await fs.readFile(filePath, "utf8");
        case FileOperation.CREATE:
            return await fs.appendFile(filePath, content);
      case FileOperation.UPDATE:
        await fs.writeFile(filePath, content);
        return `File ${filename} has been ${operation.toLowerCase()}d`;
      case FileOperation.DELETE:
        await fs.unlink(filePath);
        return `File ${filename} has been deleted`;
      default:
        throw new Error("Invalid file operation");
    }
  } catch (err) {
    console.error(`Error in ${operation} operation:`, err);
    throw err;
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const operation = url.searchParams.get("operation");
  const filename = url.searchParams.get("filename") || "demo.html";

  try {
    let result;
    if (operation && Object.values(FileOperation).includes(operation)) {
      result = await handleFileOperation(operation, filename);
    } else {
      // Default to READ operation if no valid operation specified
      result = await handleFileOperation(FileOperation.READ, "demo.html");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(result);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`Server Error: ${err.message}`);
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
