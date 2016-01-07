
# debug reloadable

This is a small patch on the [debug](https://github.com/visionmedia/debug) module, in an approach to dynamically control the debug namespace.

```javascript

var _debug = require('debug');
//debug = _debug('main');           // CHANGE THIS
debug = _debug.reloadable('main');  // INTO THIS


debug("this won't be printed."); // unless your calling with DEBUG=main node app.js

_debug.enable('main');
debug("this will be printed!");

```

[debug](https://github.com/visionmedia/debug) is a 'tiny node.js debugging utility modelled after node core's debugging technique', which relies on envinroment variables set when node is called. It will enable/disable logging when the module is first required.

This extension adds a speical `reloadable` function to the `debug` module which lets you change the control. Useful for debugging servers.

## How to use

### Node

```
npm install debug-reloadable
```


## Express example

Comes with an express middleware that temporarily enables/restores the debug option.

This lets you let all debug prints be silent on normal usage, and invoke 


```javascript

var _debug = require('debug');
_debug = require('debug-reloadable')(_debug); // override

var debug = _debug.relaodable('server');

// listen to req.query['__debug']
app.use(_debug.middleware('__debug'));


app.get('/', function(req, res) {
    // will be printed only when ?__debug=server
    debug('query:', req.query);

    res.send('ok.');
});


```


## NOTE

* There may be performance penalties. Each call to `debug` function will 
* `debug.enabled` property cannot be used anymore, since it's evaluated everytime on call. If you didn't know there was such property, you might just keep ignoring it.
* Tested only under current version (2.2.0) of debug.
* Not tested under browser. PRs are welcome.

