/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const multihashing = require('../src')

describe('multihashing', () => {
  function assertEncode (raw, func, encoded) {
    it(`encodes in ${func}`, (done) => {
      multihashing(raw, func, (err, digest) => {
        if (err) {
          return done(err)
        }

        expect(digest).to.be.eql(encoded)
        done()
      })
    })
  }

  assertEncode(
    new Buffer('beep boop'),
    'sha1',
    new Buffer('11147c8357577f51d4f0a8d393aa1aaafb28863d9421', 'hex')
  )

  assertEncode(
    new Buffer('beep boop'),
    'sha2-256',
    new Buffer('122090ea688e275d580567325032492b597bc77221c62493e76330b85ddda191ef7c', 'hex')
  )

  assertEncode(
    new Buffer('beep boop'),
    'sha2-512',
    new Buffer('134014f301f31be243f34c5668937883771fa381002f1aaa5f31b3f78e500b66ff2f4f8ea5e3c9f5a61bd073e2452c480484b02e030fb239315a2577f7ae156af177', 'hex')
  )

  assertEncode(
    new Buffer('beep boop'),
    'sha3',
    new Buffer('1440e161c54798f78eba3404ac5e7e12d27555b7b810e7fd0db3f25ffa0c785c438331b0fbb6156215f69edf403c642e5280f4521da9bd767296ec81f05100852e78', 'hex')
  )

  it('cuts the length', (done) => {
    const buf = new Buffer('beep boop')

    multihashing(buf, 'sha2-256', 10, (err, digest) => {
      if (err) {
        return done(err)
      }

      expect(
        digest
      ).to.be.eql(
        new Buffer('120a90ea688e275d58056732', 'hex')
      )

      done()
    })
  })

  it('digest only, without length', (done) => {
    const buf = new Buffer('beep boop')

    multihashing.digest(buf, 'sha2-256', (err, digest) => {
      if (err) {
        return done(err)
      }

      expect(
        digest
      ).to.be.eql(
        new Buffer('90ea688e275d580567325032492b597bc77221c62493e76330b85ddda191ef7c', 'hex')
      )

      done()
    })
  })

  describe('invalid arguments', () => {
    it('returns an error on non implemented func', (done) => {
      multihashing(new Buffer('beep boop'), 'blake2b', (err) => {
        expect(err.message).to.match(/not yet supported/)
        done()
      })
    })

    it('digest only, with length, returns error on non implmented func', (done) => {
      multihashing.digest(new Buffer('beep boop'), 'blake2b', 10, (err) => {
        expect(err.message).to.match(/not yet supported/)
        done()
      })
    })

    it('throws on missing callback', () => {
      expect(
        () => multihashing(new Buffer('beep'), 'sha3')
      ).to.throw(/Missing callback/)
    })

    it('digest only, throws on missing callback', () => {
      expect(
        () => multihashing.digest(new Buffer('beep'), 'sha3')
      ).to.throw(/Missing callback/)
    })
  })
})
