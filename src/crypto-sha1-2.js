'use strict'

const crypto = require('crypto')

const sha1 = (buf) => Promise.resolve(crypto.createHash('sha1').update(buf).digest())
const sha2256 = (buf) => Promise.resolve(crypto.createHash('sha256').update(buf).digest())
const sha2512 = (buf) => Promise.resolve(crypto.createHash('sha512').update(buf).digest())

module.exports = {
  sha1: sha1,
  sha2256: sha2256,
  sha2512: sha2512
}
