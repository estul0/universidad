let fs = require("fs");

//Read a file
fs.readFile("file.js", (err, data)=>{
    if(err)
        console.log(err);    
    else
        console.log(data);
});

//Write a file

fs.writeFile("newFile.txt", "hola mundo", err=>{
    console.log("File created!");
});
