const http = require ("http");
const fs = require ("fs");

http.createServer((req,res)=>{
    console.log(req);
    fs.readFile("index.html", (err,data)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(data);
        res.end();
    });    
}).listen(8080);

