'use strict'

exports.toString = (buf) => Buffer.isBuffer(buf) ? buf.toString() : buf

exports.fromNumberTo32BitBuf = (number) =>
  Buffer.from(new Uint8Array([
    (number & 0x000000ff),
    (number & 0x0000ff00) >> 8,
    (number & 0x00ff0000) >> 16,
    (number & 0xff000000) >> 24
  ]))
