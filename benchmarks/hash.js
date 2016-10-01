'use strict'

const Benchmark = require('benchmark')
const multihashing = require('../src')

const suite = new Benchmark.Suite('multihashing-async')
const list = []

const algs = ['sha1', 'sha2-256', 'sha2-512', 'sha3']

algs.forEach((alg) => {
  suite.add(alg, function (d) {
    const buf = new Buffer(10 * 1024)
    buf.fill(Math.ceil(Math.random() * 100))

    multihashing(buf, alg, (err, res) => {
      if (err) throw err
      list.push(res)
      d.resolve()
    })
  }, {
    defer: true
  })
})
suite
.on('cycle', (event) => {
  console.log(String(event.target))
})
// run async
.run({
  async: true
})
