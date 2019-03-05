const http = require ("http");

http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hola</h1>");
    res.end();
}).listen(8080);