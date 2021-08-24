/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const sinon = require('sinon')
const { fromString: uint8ArrayFromString } = require('uint8arrays/from-string')
const { toString: uint8ArrayToString } = require('uint8arrays/to-string')

const multihashing = require('../src')
const fixtures = require('./fixtures/encodes')
/**
 * @typedef {import('multihashes').HashName} HashName
 */

describe('multihashing', () => {
  for (const fixture of fixtures) {
    const raw = fixture[0]
    const func = fixture[1]
    const encoded = fixture[2]

    it(`encodes in ${func}`, async function () {
      const digest = await multihashing(uint8ArrayFromString(raw), func)
      expect(digest).to.be.an.instanceOf(Uint8Array)
      expect(uint8ArrayToString(digest, 'base16')).to.eql(encoded)
    })
  }

  it('cuts the length', async () => {
    const buf = uint8ArrayFromString('beep boop')

    const digest = await multihashing(buf, 'sha2-256', 10)
    expect(digest)
      .to.eql(uint8ArrayFromString('120a90ea688e275d58056732', 'base16'))
  })

  it('digest only, without length', async () => {
    const buf = uint8ArrayFromString('beep boop')
    const digest = await multihashing.digest(buf, 'sha2-256')
    expect(digest).to.be.an.instanceOf(Uint8Array)
    expect(
      digest
    ).to.eql(
      uint8ArrayFromString('90ea688e275d580567325032492b597bc77221c62493e76330b85ddda191ef7c', 'base16')
    )
  })
})

describe('validate', () => {
  it('true on pass', async () => {
    const hash = await multihashing(uint8ArrayFromString('test'), 'sha2-256')
    const validation = await multihashing.validate(uint8ArrayFromString('test'), hash)

    return expect(validation).to.eql(true)
  })

  it('false on fail', async () => {
    const hash = await multihashing(uint8ArrayFromString('test'), 'sha2-256')
    const validation = await multihashing.validate(uint8ArrayFromString('test-fail'), hash)
    return expect(validation).to.eql(false)
  })
})

describe('error handling', () => {
  const methods = {
    multihashing: multihashing,
    digest: multihashing.digest,
    /**
     * @param {Uint8Array} buff
     * @param {HashName} alg
     */
    createHash: (buff, alg) => multihashing.createHash(alg)
  }

  for (const [name, fn] of Object.entries(methods)) {
    describe(name, () => {
      it('throws an error when there is no hashing algorithm specified', async () => {
        const buf = uint8ArrayFromString('beep boop')

        try {
          // @ts-expect-error - alg argument is expected
          await fn(buf)
        } catch (err) {
          expect(err).to.exist()
          expect(err.code).to.eql('ERR_HASH_ALGORITHM_NOT_SPECIFIED')
          return
        }
        expect.fail('Did not throw')
      })

      it('throws an error when the hashing algorithm is not supported', async () => {
        const buf = uint8ArrayFromString('beep boop')

        // @ts-ignore - sinon is inferring that snake-oil isn't a valid alg
        const stub = sinon.stub(require('multihashes'), 'coerceCode').returns('snake-oil')
        try {
          // @ts-expect-error - non valid algorithm
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
