'use strict'
const crypto = self.crypto || self.msCrypto

module.exports = (algorithm) => {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context'
    )
  }

  return (data) => {
    switch (algorithm) {
      case 'sha1':
        return crypto.subtle.digest({ name: 'SHA-1' }, data).then(Buffer.from)
      case 'sha2-256':
        return crypto.subtle.digest({ name: 'SHA-256' }, data).then(Buffer.from)
      case 'sha2-512':
        return crypto.subtle.digest({ name: 'SHA-512' }, data).then(Buffer.from)
      case 'dbl-sha2-256': {
        return crypto.subtle.digest({ name: 'SHA-256' }, data)
          .then(d => crypto.subtle.digest({ name: 'SHA-256' }, d))
          .then(Buffer.from)
      }
      default:
        throw new TypeError(`${algorithm} is not a supported algorithm`)
    }
  }
}
