
var express = require('express');

var _debug = require('debug');
_debug = require('debug-reloadable')(_debug); // override

var debug = _debug.reloadable('server');


// listen to req.query['__debug']
var app = express();
app.use(_debug.middleware('__debug'));


app.get('/', function(req, res) {
    // will be printed only when ?__debug=server
    debug('query:', req.query);

    res.send('ok.');
});


// start server
var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('listening at http://%s:%s', host, port)
});

