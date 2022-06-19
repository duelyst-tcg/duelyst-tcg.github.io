var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var basedir = path.join(__dirname, "../../");
var port = 3000;

var server = http.createServer(function (req, resp) {
    var urlpath = url.parse(req.url).pathname;
    var filepath = basedir + path.normalize(urlpath);
    var stream = fs.createReadStream(filepath);

    stream.pipe(resp);
    stream.on("open", function () {
        resp.writeHead(200);
    });
    stream.on("error", function () {
        resp.writeHead(404);
        resp.end();
    });
});

server.listen(port);
console.log("Server listening on port " + port);
