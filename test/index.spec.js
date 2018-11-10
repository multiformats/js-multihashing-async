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

    it(`encodes in ${func}, with callback`, (done) => {
      multihashing(Buffer.from(raw), func, (err, digest) => {
        if (err) {
          return done(err)
        }

        expect(
          digest.toString('hex')
        ).to.eql(encoded)
        done()
      })
    })

    it(`encodes in ${func}, with promise`, async () => {
      const digest = await multihashing(Buffer.from(raw), func)

      expect(
        digest.toString('hex')
      ).to.eql(encoded)
    })
  })

  it('cuts the length, with callback', (done) => {
    const buf = Buffer.from('beep boop')

    multihashing(buf, 'sha2-256', 10, (err, digest) => {
      if (err) {
        return done(err)
      }

      expect(digest)
        .to.eql(Buffer.from('120a90ea688e275d58056732', 'hex'))

      done()
    })
  })

  it('cuts the length, with promise', async () => {
    const buf = Buffer.from('beep boop')
    const digest = await multihashing(buf, 'sha2-256', 10)

    expect(digest)
      .to.eql(Buffer.from('120a90ea688e275d58056732', 'hex'))
  })

  it('digest only, without length, with callback', (done) => {
    const buf = Buffer.from('beep boop')

    multihashing.digest(buf, 'sha2-256', (err, digest) => {
      if (err) {
        return done(err)
      }

      expect(
        digest
      ).to.eql(
        Buffer.from('90ea688e275d580567325032492b597bc77221c62493e76330b85ddda191ef7c', 'hex')
      )

      done()
    })
  })

  it('digest only, without length, with promise', async () => {
    const buf = Buffer.from('beep boop')
    const digest = await multihashing.digest(buf, 'sha2-256')

    expect(
      digest
    ).to.eql(
      Buffer.from('90ea688e275d580567325032492b597bc77221c62493e76330b85ddda191ef7c', 'hex')
    )
  })
})
