'use strict'

module.exports = function (CompressStr, zlib) {

    CompressStr.prototype.gunzip = function (binary, callback) {
        var buf = new Buffer(binary, 'binary')
        if (typeof callback === 'function') {
            this._gunzipCallback(buf, callback)
        } else {
            return this._gunzipPromise(buf)
        }
    }

    /**
    * function gunzip for callback
    */
    CompressStr.prototype._gunzipCallback = function (buf, callback) {
        this._zlibFn('gunzip', 'utf8', buf, callback)
    }

    /**
    * function gunzip for Promise
    */
    CompressStr.prototype._gunzipPromise = function (buf) {
        var self = this
        if (typeof self.Promise !== 'function') {
            console.error("Sorry, your node.js version can't support Promise\n Please use `CompressStr.Promise = Promise` to define Promise or do something yourself with callback.\n")
            return null
        } else {
            var Promise = self.Promise
            return new Promise(function (resolve, reject) {
                self._zlibFn('gunzip', 'utf8', buf, reject, resolve)
            })
        }
    }
}