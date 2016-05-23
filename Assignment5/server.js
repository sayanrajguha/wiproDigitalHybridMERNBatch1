var http = require("http");
var fs = require("fs");

var server = http.createServer(function(request,response) {
  var url = request.url;
  switch (url) {
    case '/':
      case '/index.html' :
        getStaticFileContent(response, '../Assignment4/index.html','text/html');
      break;
    case '/css/styles.css' :
      getStaticFileContent(response,'../Assignment4/css/styles.css','text/css');
      break;
    case '/js/barChartD3.js' :
      getStaticFileContent(response,'../Assignment4/js/barChartD3.js','text/javascript');
      break;
    case '/LocalOutput/total.json' :
      getStaticFileContent(response,'../../LocalOutput/total.json','text/plain');
      break;
    default:
      response.writeHead(404,{'Content-Type':'text/plain'});
      response.end('404 - Page not found');

  }
}).listen(8080, function() {
  console.log("Server listening at : http://localhost:8080/");
});

function getStaticFileContent(response, filePath, contentType) {
  fs.readFile(filePath, function(error, data) {
    if(error) {
      response.writeHead(500,{'Content-Type':'text/plain'});
      response.end('500 - Internal Server Error');
    }
    else if(data) {
      response.writeHead(200, {'Content-Type' : contentType});
      response.end(data);
    }
  });
}
