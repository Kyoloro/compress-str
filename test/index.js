'use strict'
var assert = require('assert')
var compressStr = require('../index')
var str = 'this_is_a_very_very_very_very_very_very_very_very_very_very_very_very_long_string'

assert.deepEqual(typeof compressStr.gzip, 'function')
assert.deepEqual(typeof compressStr.gunzip, 'function')

process.on('uncaughtException', function (err) {
    console.error(err)
    process.exit(1)
})

compressStr.gzip(str, function (err, data) {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        assert.deepEqual(true, data.length < str.length)
        compressStr.gunzip(data, function (err, data2) {
            if (err) {
                console.error(err)
                process.exit(1)
            } else {
                assert.deepEqual(str, data2)
                console.log('complete gzip gunzip callback test ...')
            }
        })
    }
})

compressStr.gzip(str).then(function (data) {
    assert.deepEqual(true, data.length < str.length)
    return compressStr.gunzip(data)
}).then(function (data2) {
    assert.deepEqual(str, data2)
    console.log('complete gzip gunzip promise test ...')
}).catch(function (err) {
    console.error(err)
    process.exit(1)
})

var str2 = { name: 'kyo', desc: 'long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_' }
compressStr.gzip(str2).then(function (data) {
    assert.deepEqual(true, data.length < JSON.stringify(str2).length)
    return compressStr.gunzip(data)
}).then(function (data2) {
    assert.deepEqual(str2, JSON.parse(data2))
    console.log('complete gzip gunzip object test ...')
}).catch(function (err) {
    console.error(err)
    process.exit(1)
})