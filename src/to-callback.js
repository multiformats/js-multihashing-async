'use strict'

const setImmediate = require('async/setImmediate')

module.exports = function toCallback (doWork) {
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
