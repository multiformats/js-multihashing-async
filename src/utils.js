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

exports.to32BitBuf = (doWork, other) => (input) => {
  let number = doWork(input, other)
  const bytes = new Array(4)

  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff
    number = number >>> 8
  }
  return new Buffer(bytes)
}
