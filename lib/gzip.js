'use strict'

module.exports = function (CompressStr, zlib) {

    CompressStr.prototype.gzip = function (str, callback) {
        var buf = new Buffer(str, 'utf8')
        if (typeof callback === 'function') {
            this._gzipCallback(buf, callback)
            return null
        } else {
            return this._gzipPromise(buf)
        }
    }

    /**
    * function gzip for callback
    */
    CompressStr.prototype._gzipCallback = function (buf, callback) {
        this._zlibFn('gzip', 'binary', buf, callback)
    }

    /**
    * function gzip for Promise
    */
    CompressStr.prototype._gzipPromise = function (buf) {
        var self = this
        if (typeof self.Promise !== 'function') {
            console.error("Sorry, your node.js version can't support Promise\n Please use `CompressStr.Promise = Promise` to define Promise or do something yourself with callback.\n")
            return null
        } else {
            var Promise = self.Promise
            return new Promise(function (resolve, reject) {
                self._zlibFn('gzip', 'binary', buf, reject, resolve)
            })
        }
    }
}