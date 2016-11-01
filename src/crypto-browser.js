'use strict'

const SHA3 = require('browserify-sha3')
const nodeify = require('nodeify')

const webCrypto = getWebCrypto()

function getWebCrypto () {
  if (typeof window !== 'undefined') {
    if (window.crypto) {
      return window.crypto.subtle || window.crypto.webkitSubtle
    }

    if (window.msCrypto) {
      return window.msCrypto.subtle
    }
  }
}

function webCryptoHash (type) {
  if (!webCrypto) {
    throw new Error('Please use a browser with webcrypto support')
  }

  return (data, callback) => {
    const res = webCrypto.digest({ name: type }, data)

    if (typeof res.then !== 'function') { // IE11
      res.onerror = () => {
        callback(`Error hashing data using ${type}`)
      }
      res.oncomplete = (e) => {
        callback(null, e.target.result)
      }
      return
    }

    nodeify(
      res.then((raw) => new Buffer(new Uint8Array(raw))),
      callback
    )
  }
}

function sha1 (buf, callback) {
  webCryptoHash('SHA-1')(buf, callback)
}

function sha2256 (buf, callback) {
  webCryptoHash('SHA-256')(buf, callback)
}

function sha2512 (buf, callback) {
  webCryptoHash('SHA-512')(buf, callback)
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
