const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const fs = require('fs');


const server = http.createServer((req, res) => {
    var data = fs.readFileSync("src/antlr-smells.json", 'utf-8')    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});
