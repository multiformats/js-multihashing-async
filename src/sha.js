'use strict'
const crypto = require('crypto')

module.exports = (algorithm) => (data) => {
  return new Promise((resolve, reject) => {
    try {
      switch (algorithm) {
        case 'sha1':
          return resolve(crypto.createHash('sha1').update(data).digest())
        case 'sha2-256':
          return resolve(crypto.createHash('sha256').update(data).digest())
        case 'sha2-512':
          return resolve(crypto.createHash('sha512').update(data).digest())
        case 'dbl-sha2-256': {
          const first = crypto.createHash('sha256').update(data).digest()
          return resolve(crypto.createHash('sha256').update(first).digest())
        }
        default:
          throw new TypeError(`${algorithm} is not a supported algorithm`)
      }
    } catch (error) {
      return reject(error)
    }
  })
}
