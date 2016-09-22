'use strict'

const SHA3 = require('sha3')
const crypto = require('crypto')

function sha1 (buf, callback) {
  const digest = crypto.createHash('sha1').update(buf).digest()
  callback(null, digest)
}

function sha2256 (buf, callback) {
  const digest = crypto.createHash('sha256').update(buf).digest()
  callback(null, digest)
}

function sha2512 (buf, callback) {
  const digest = crypto.createHash('sha512').update(buf).digest()
  callback(null, digest)
}

function sha3 (buf, callback) {
  const d = new SHA3.SHA3Hash()
  const digest = new Buffer(d.update(buf).digest('hex'), 'hex')
  callback(null, digest)
}

module.exports = {
  sha1: sha1,
  sha2256: sha2256,
  sha2512: sha2512,
  sha3: sha3
}
