/* eslint-disable require-await */
'use strict'

const multihash = require('multihashes')

const crypto =
  self.crypto ||
  /** @type {typeof window.crypto} */
  // @ts-ignore - unknown property
  (self.msCrypto)

/**
 *
 * @param {Uint8Array} data
 * @param {import('./types').HashName} alg
 * @returns {Promise<Uint8Array>}
 */
const digest = async (data, alg) => {
  if (typeof self === 'undefined' || !crypto) {
    throw new Error(
      'Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context'
    )
  }
  switch (alg) {
    case 'sha1':
      return new Uint8Array(await crypto.subtle.digest({ name: 'SHA-1' }, data))
    case 'sha2-256':
      return new Uint8Array(await crypto.subtle.digest({ name: 'SHA-256' }, data))
    case 'sha2-512':
      return new Uint8Array(await crypto.subtle.digest({ name: 'SHA-512' }, data))
    case 'dbl-sha2-256': {
      const d = await crypto.subtle.digest({ name: 'SHA-256' }, data)
      return new Uint8Array(await crypto.subtle.digest({ name: 'SHA-256' }, d))
    }
    default:
      throw new Error(`${alg} is not a supported algorithm`)
  }
}

module.exports = {
  /**
   * @param {import('./types').HashName} alg
   * @returns {import('./types').Digest}
   */
  factory: (alg) => async (data) => {
    return digest(data, alg)
  },
  digest,
  /**
   * @param {Uint8Array} buf
   * @param {import('./types').HashName} alg
   * @param {number} [length]
   */
  multihashing: async (buf, alg, length) => {
    const h = await digest(buf, alg)
    return multihash.encode(h, alg, length)
  }
}
