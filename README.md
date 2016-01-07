
# debug reloadable

This is a small patch on the [debug](https://github.com/visionmedia/debug) module, in an approach to dynamically control the debug namespace.

```javascript

var _debug = require('debug');
//debug = _debug('main');
debug = _debug.reloadable('main');

debug("this won't be printed.");

_debug.enable('main');
debug("this will be printed!");

```

[debug](https://github.com/visionmedia/debug) is a 'tiny node.js debugging utility modelled after node core's debugging technique', which is very simple to use, but relies on envinroment variables set when node is called.

This extension adds a speical `reloadable` function to the `debug` module which lets you change the control. Useful for debugging servers.

## How to use

### Node

```
npm install debug-reloadable
```


## Express Example


```javascript

var _debug = require('debug-reloadable')(require('debug'));

// listen to req.query['debug']
app.use(_debug.middleware('debug'));


```


## NOTE

* There may be performance penalties. Each call to `debug` function will 

* Tested only under current version (2.2.0) of debug.

* Currently not tested under browser. PRs are welcome.

