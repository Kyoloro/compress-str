# Compress-Str
> Base on "zlib" module to compress string - base64 for database saving (redis or mongodb ...). Support both callback and native Promise

[![Build status](https://img.shields.io/travis/Kyoloro/compress-str/master.svg?style=flat-square)](https://travis-ci.org/Kyoloro/compress-str)
![node-image](https://img.shields.io/badge/node.js-%3E=_0.12-green.svg?style=flat-square)

## Notice
gzip function is a high CPU consumption, not support to use at high I/O case.

## Installation
```sh
$ npm install compress-str
```

## Example
```javascript
'use strict'

var compress = require('compress-str')
var str = 'this_is_a_very_very_very_very_very_very_very_very_very_very_very_very_long_string'

console.log(str.length) // 85

// for callback
compress.gzip(str, function (err, m) {
    if (err) {
        console.error(err)
    } else {
        console.log(m.length) // 45

        compress.gunzip(m, function (err, n) {
            if (err) {
                console.error(err)
            } else {
                console.log(n.length) // 85
                console.log(n === str) // true
            }
        })
    }
})

// for Promise
compress.gzip(str).then(function (m) {
    console.log(m.length) // 45
    return compress.gunzip(m)
}).then(function (n) {
    console.log(n.length) // 85
    console.log(n === str) // true
}).catch(function (err) {
    console.error(err)
})
```

## FAQ
this module use native Promise for node.js v0.12 +, when your node.js version can't support Promise, you may use bluebird or do something yourself with callback
```javascript
'use strict'

var compress = require('compress-str')
var Promise = require('bluebird')

compress.Promise = Promise
// to do can do well
```

## API
#### .gzip(string || object[, callback])
gzip string (return a Promise when missing callback)

#### .gunzip(string[, callback])
gunzip string from gzip (return a Promise when missing callback)

## License
MIT