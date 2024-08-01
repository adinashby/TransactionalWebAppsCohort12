const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "text/html");

    let path = "./views/";

    switch (req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-me":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            res.end("<h1>Something went wrong</h1>");
        } else {
            res.end(data);
        }
    });
});

server.listen(3000, "localhost", () => {
    console.log("Server is listening on port 3000");
});