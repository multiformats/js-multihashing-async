'use strict'

const Benchmark = require('benchmark')
const multihashing = require('../src')

const suite = new Benchmark.Suite('multihashing-async')

let list = []

const algs = [
  'sha1',
  'sha2-256',
  'sha2-512',
  'sha3-512',
  'sha3-384',
  'sha3-256',
  'sha3-224',
  'shake-128',
  'shake-256',
  'keccak-224',
  'keccak-256',
  'keccak-384',
  'keccak-512',
  'murmur3-32',
  'murmur3-128',
  'dbl-sha2-256',
  'blake2b-256',
  'blake2b-512',
  'blake2s-256'
]

algs.forEach((alg) => {
  suite.add(alg, async function (d) {
    const buf = Buffer.alloc(10 * 1024)
    buf.fill(Math.ceil(Math.random() * 100))
    const res = await multihashing(buf, alg)
    list.push(res)
    d.resolve()
  }, {
    defer: true
  })
})
suite
  .on('cycle', (event) => {
    // eslint-disable-next-line
    console.log(String(event.target))
    list = []
  })
  // run async
  .run({
    async: true
  })
