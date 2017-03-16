/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
chai.use(dirtyChai)
const expect = chai.expect

const multihashing = require('../src')
const fixtures = require('./fixtures/encodes')

describe('multihashing', () => {
  fixtures.forEach((fixture) => {
    const raw = fixture[0]
    const func = fixture[1]
    const encoded = fixture[2]

    it(`encodes in ${func}`, (done) => {
      multihashing(new Buffer(raw), func, (err, digest) => {
        if (err) {
          return done(err)
        }

        expect(
          digest.toString('hex')
        ).to.be.eql(encoded)
        done()
      })
    })
  })

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
