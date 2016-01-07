
var _debug = require('debug');

var originalDebug;
var patch = function(_debug) {
    originalDebug = _debug;

    _debug.reloadable = function wrapDebugWithReload(namespace) {
        var fn = function() {
            var newDebug = _debug(namespace);
            //this.enabled = newDebug.enabled; // no use.
            newDebug.apply(newDebug, arguments);
        }
        fn.namespace = namespace;

        return fn;
    };

    return _debug;
};

//var noConflict = function() {
//    return originalDebug;
//};


// reenable-debug express middleware
var middleware = function(queryName) {

    return function(req, res, next) {

        req._debugPrev = {
            names: _debug.names.slice(0),
            skips: _debug.skips.slice(0),
        };
        //console.log('storing original:', req._debugPrev);

        // enable
        if (req.query[queryName]) {
            _debug.enable(req.query[queryName]); 
        }

        // revert
        res.on('finish', function() {
            if (req._debugPrev) {
                //console.log('reverting to:', req._debugPrev);
                _debug.names = req._debugPrev.names;
                _debug.skips = req._debugPrev.skips;
            }
        });

        //
        next();
    };
};

module.exports = patch;
module.exports.patch = patch;
module.exports.middleware = middleware;
//module.exports.noConflict = noConflict;

