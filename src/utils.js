'use strict'

const fromNumberTo32BitBuf = (number) => {
  const bytes = new Array(4)

  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff
    number = number >> 8
  }

  return Uint8Array.from(bytes)
}

module.exports = {
  fromNumberTo32BitBuf
}
