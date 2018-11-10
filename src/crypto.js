'use strict'

const sha3 = require('js-sha3')
const murmur3 = require('murmurhash3js')
const sha = require('./crypto-sha1-2')
const { toString, fromNumberTo32BitBuf } = require('./utils')

module.exports = {
  sha1: sha.sha1,
  sha2256: sha.sha2256,
  sha2512: sha.sha2512,
  sha3512: (buf) => Promise.resolve(Buffer.from(sha3.sha3_512.arrayBuffer(buf))),
  sha3384: (buf) => Promise.resolve(Buffer.from(sha3.sha3_384.arrayBuffer(buf))),
  sha3256: (buf) => Promise.resolve(Buffer.from(sha3.sha3_256.arrayBuffer(buf))),
  sha3224: (buf) => Promise.resolve(Buffer.from(sha3.sha3_224.arrayBuffer(buf))),
  shake128: (buf) => Promise.resolve(Buffer.from(sha3.shake_128.arrayBuffer(buf, 128))),
  shake256: (buf) => Promise.resolve(Buffer.from(sha3.shake_256.arrayBuffer(buf, 256))),
  keccak224: (buf) => Promise.resolve(Buffer.from(sha3.keccak_224.arrayBuffer(buf))),
  keccak256: (buf) => Promise.resolve(Buffer.from(sha3.keccak_256.arrayBuffer(buf))),
  keccak384: (buf) => Promise.resolve(Buffer.from(sha3.keccak_384.arrayBuffer(buf))),
  keccak512: (buf) => Promise.resolve(Buffer.from(sha3.keccak_512.arrayBuffer(buf))),
  murmur3128: (buf) => Promise.resolve(Buffer.from(murmur3.x64.hash128(toString(buf)), 'hex')),
  murmur332: (buf) => Promise.resolve(fromNumberTo32BitBuf(murmur3.x86.hash32(toString(buf)))),
  addBlake: require('./blake'),
  dblSha2256: (buf) => sha.sha2256(buf).then(firstHash => sha.sha2256(firstHash))
}
