const { MIME_TYPES }  = require('./src/mimeTypes.js');
const http            = require('http');
const fs              = require('fs');
const path            = require('path');

const port            = 5500;
const publicDir       = path.join(__dirname, '../public');

let server;

function startServer() {
  server = http.createServer((req, res) => {
    let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile(path.join(publicDir, 'index.html'), (error, content) => {
            if (error) {
              res.writeHead(500);
              res.end(`Server Error: ${error.code}`);
            } else {
                
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content, 'utf-8');
            }
          });
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${error.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

fs.watch(publicDir, { recursive: true }, (event, filename) => {
  console.log(`File ${filename} changed. Restarting server...`);
  server.close(() => {
    console.log('Server stopped.');
    startServer();
  });
});
