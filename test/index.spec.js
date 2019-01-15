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

    it(`encodes in ${func}`, async function () {
      const digest = await multihashing(Buffer.from(raw), func)
      expect(digest.toString('hex')).to.eql(encoded)
    })
  })

  it('cuts the length', async () => {
    const buf = Buffer.from('beep boop')

    const digest = await multihashing(buf, 'sha2-256', 10)
    expect(digest)
      .to.eql(Buffer.from('120a90ea688e275d58056732', 'hex'))
  })

  it('digest only, without length', async () => {
    const buf = Buffer.from('beep boop')

    const digest = await multihashing.digest(buf, 'sha2-256')
    expect(
      digest
    ).to.eql(
      Buffer.from('90ea688e275d580567325032492b597bc77221c62493e76330b85ddda191ef7c', 'hex')
    )
  })
})

describe('validate', () => {
  it('true on pass', done => {
    multihashing(Buffer.from('test'), 'sha2-256', (err, hash) => {
      if (err) throw done(err)
      multihashing.validate(Buffer.from('test'), hash, (err, bool) => {
        if (err) throw done(err)
        expect(bool).to.eql(true)
        done()
      })
    })
  })

  it('false on fail', done => {
    multihashing(Buffer.from('test'), 'sha2-256', (err, hash) => {
      if (err) throw done(err)
      multihashing.validate(Buffer.from('test-fail'), hash, (err, bool) => {
        if (err) throw done(err)
        expect(bool).to.eql(false)
        done()
      })
    })
  })
})
