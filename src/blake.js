'use strict'

const { blake2b, blake2s } = require('blakejs')

const minB = 0xb201
const minS = 0xb241

module.exports = (table) => {
  for (let i = 0; i < 64; i++) {
    table[minB + i] = (buf) => Promise.resolve(Buffer.from(blake2b(buf, null, i + 1)))
  }
  for (let i = 0; i < 32; i++) {
    table[minS + i] = (buf) => Promise.resolve(Buffer.from(blake2s(buf, null, i + 1)))
  }
}
