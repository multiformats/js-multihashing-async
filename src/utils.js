'use strict'

const setImmediate = require('async/setImmediate')

exports.toCallback = (doWork) => {
  return function (input, callback) {
    const done = (err, res) => setImmediate(() => {
      callback(err, res)
    })

    let res
    try {
      res = doWork(input)
    } catch (err) {
      done(err)
      return
    }

    done(null, res)
  }
}

exports.toBuf = (doWork, other) => (input) => {
  return new Buffer(doWork(input, other), 'hex')
}

exports.fromString = (doWork, other) => (_input) => {
  const input = Buffer.isBuffer(_input) ? _input.toString() : _input
  return doWork(input, other)
}
