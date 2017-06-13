'use strict'

var zlib = require('zlib')

function CompressStr() {
    this.Promise = Promise
}

require('./gzip')(CompressStr, zlib)
require('./gunzip')(CompressStr, zlib)

/**
* zlib fn
* name -> gzip gunzip
* m -> callback or reject
* n -> resolve
* code -> base64 utf8
*/
CompressStr.prototype._zlibFn = function (name, code, buf, m, n) {
    zlib[name](buf, function (err, data) {
        if (err) {
            m(err)
        } else {
            var r = data.toString(code)
            if (n) {
                n(r)
            } else {
                m(null, r)
            }
        }
    })
}

module.exports = new CompressStr()