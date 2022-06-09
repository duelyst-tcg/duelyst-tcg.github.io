var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

var baseDirectory = path.join(__dirname, '../cards/')
var port = 3000

var server = http.createServer(function (request, response) {
  try {
    var requestUrl = url.parse(request.url)
    var fsPath = baseDirectory + path.normalize(requestUrl.pathname)
    var fileStream = fs.createReadStream(fsPath)

    fileStream.pipe(response)

    fileStream.on('open', function () {
      response.writeHead(200)
    })
    
    fileStream.on('error', function (e) {
      response.writeHead(404)
      response.end()
    })
  } catch (e) {
    response.writeHead(500)
    response.end()
    console.log(e.stack)
  }
})

server.listen(port)
console.log("Server listening on port " + port)