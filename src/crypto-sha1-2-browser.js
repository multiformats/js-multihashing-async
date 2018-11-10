/* global self */

'use strict'

const webCrypto = getWebCrypto()

function getWebCrypto () {
  if (self.crypto) {
    return self.crypto.subtle || self.crypto.webkitSubtle
  }

  if (self.msCrypto) {
    return self.msCrypto.subtle
  }
}

function webCryptoHash (type) {
  if (!webCrypto) {
    throw new Error('Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context')
  }

  return (data) => {
    const res = webCrypto.digest({ name: type }, data)

    if (typeof res.then !== 'function') { // IE11
      return new Promise((resolve, reject) => {
        res.onerror = () => {
          reject(new Error(`hashing data using ${type}`))
        }
        res.oncomplete = (e) => {
          resolve(e.target.result)
        }
      })
    }

    return res.then((raw) => Buffer.from(new Uint8Array(raw)))
  }
}

module.exports = {
  sha1: webCryptoHash('SHA-1'),
  sha2256: webCryptoHash('SHA-256'),
  sha2512: webCryptoHash('SHA-512')
}
