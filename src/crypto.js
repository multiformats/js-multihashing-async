'use strict'

const sha3 = require('js-sha3')
const murmur3 = require('murmurhash3js').x86.hash32

const toCallback = require('./to-callback')
const sha = require('./crypto-sha1-2')

const toBuf = (doWork, other) => (input) => {
  return new Buffer(doWork(input, other), 'hex')
}

const fromString = (doWork, other) => (_input) => {
  const input = Buffer.isBuffer(_input) ? _input.toString() : _input
  return doWork(input, other)
}

const to32BitBuf = (doWork, other) => (input) => {
  let number = doWork(input, other)
  const bytes = []
  for (let i = 0; i < 4; i++) {
    bytes.push(number & 0xff)
    number = number >>> 8
  }
  return new Buffer(bytes)
}

module.exports = {
  sha1: sha.sha1,
  sha2256: sha.sha2256,
  sha2512: sha.sha2512,
  sha3512: toCallback(toBuf(sha3.sha3_512)),
  sha3384: toCallback(toBuf(sha3.sha3_384)),
  sha3256: toCallback(toBuf(sha3.sha3_256)),
  sha3224: toCallback(toBuf(sha3.sha3_224)),
  shake128: toCallback(toBuf(sha3.shake_128, 256)),
  shake256: toCallback(toBuf(sha3.shake_256, 512)),
  keccak224: toCallback(toBuf(sha3.keccak_224)),
  keccak256: toCallback(toBuf(sha3.keccak_256)),
  keccak384: toCallback(toBuf(sha3.keccak_384)),
  keccak512: toCallback(toBuf(sha3.keccak_512)),
  murmur3: toCallback(to32BitBuf(fromString(murmur3)))
}
