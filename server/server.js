var http = require('http');
var url = require('url');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {
  console.log(req.url);

  if (req.url.slice(0, 5) === '/data') {
    req.url = '/server' + req.url;

    setTimeout(function() {
      file.serve(req, res);
    }, 3000);
  } else {
    file.serve(req, res);
  }

}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}