# Compress-Str
> Base on "zlib" module to compress string - binary for database saving (redis or mongodb ...).Suport both callback and native Promise
## Install
```sh
$ npm install compress-str
```

## Example
```javascript
'use stric'

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
this module use native Promise for node.js v0.12 +, when your node.js version can't suport Promise, you may use bluebird or do something yourself with callback
```javascript
'use strict'

var compress = require('compress-str')
var Promise = require('bluebird')

compress.Promise = Promise
// to do can do well
```
