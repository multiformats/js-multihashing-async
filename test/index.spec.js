/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
chai.use(dirtyChai)
const expect = chai.expect
const sinon = require('sinon')

const multihashing = require('../src')
const fixtures = require('./fixtures/encodes')

describe('multihashing', () => {
  for (const fixture of fixtures) {
    const raw = fixture[0]
    const func = fixture[1]
    const encoded = fixture[2]

    it(`encodes in ${func}`, async function () {
      const digest = await multihashing(Buffer.from(raw), func)
      expect(digest.toString('hex')).to.eql(encoded)
    })
  }

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

describe('error handling', () => {
  const methods = {
    multihashing: multihashing,
    digest: multihashing.digest,
    createHash: (buff, alg) => multihashing.createHash(alg)
  }

  for (const [name, fn] of Object.entries(methods)) {
    describe(name, () => {
      it('throws an error when there is no hashing algorithm specified', async () => {
        const buf = Buffer.from('beep boop')

        try {
          await fn(buf)
        } catch (err) {
          expect(err).to.exist()
          expect(err.code).to.eql('ERR_HASH_ALGORITHM_NOT_SPECIFIED')
          return
        }
        expect.fail('Did not throw')
      })

      it('throws an error when the hashing algorithm is not supported', async () => {
        const buf = Buffer.from('beep boop')

        const stub = sinon.stub(require('multihashes'), 'coerceCode').returns('snake-oil')
        try {
          await fn(buf, 'snake-oil')
        } catch (err) {
          expect(err).to.exist()
          expect(err.code).to.eql('ERR_HASH_ALGORITHM_NOT_SUPPORTED')
          return
        } finally {
          stub.restore()
        }
        expect.fail('Did not throw')
      })
    })
  }
})
