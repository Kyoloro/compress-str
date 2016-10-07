'use strict'
var assert = require('assert')
var compressStr = require('../index')
var str = 'this_is_a_very_very_very_very_very_very_very_very_very_very_very_very_long_string'

assert.deepEqual(typeof compressStr.gzip, 'function')
assert.deepEqual(typeof compressStr.gunzip, 'function')

// compressStr.Promise = require('bluebird')

compressStr.gzip(str, function (err, data) {
    if (err) {
        console.error('something error', err)
    } else {
        console.log(data.length)
        compressStr.gunzip(data, function (err, data2) {
            if (err) {
                console.error('something error')
            } else {
                assert.deepEqual(str, data2)
                console.log(data2.length)
            }
        })
    }
})

compressStr.gzip(str).then(function (data) {
    console.log(data.length)
    return compressStr.gunzip(data)
}).then(function (data2) {
    console.log(data2.length)
    assert.deepEqual(str, data2)
}).catch(function (err) {
    console.error('something error', err)
})

var str2 = { name: 'kyo' }
compressStr.gzip(str2).then(function (data) {
    console.log(data.length)
    return compressStr.gunzip(data)
}).then(function (data2) {
    console.log(data2.length)
    assert.deepStrictEqual(str2, JSON.parse(data2))
}).catch(function (err) {
    console.error('something error', err)
})