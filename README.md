# js-multihashing-async

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-multiformats-blue.svg?style=flat-square)](http://github.com/multiformats/multiformats)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Coverage Status](https://coveralls.io/repos/github/multiformats/js-multihashing-async/badge.svg?branch=master)](https://coveralls.io/github/multiformats/js-multihashing-async?branch=master)
[![Travis CI](https://travis-ci.org/multiformats/js-multihashing-async.svg?branch=master)](https://travis-ci.org/multiformats/js-multihashing-async)
[![Circle CI](https://circleci.com/gh/multiformats/js-multihashing-async.svg?style=svg)](https://circleci.com/gh/multiformats/js-multihashing-async)
[![Dependency Status](https://david-dm.org/multiformats/js-multihashing-async.svg?style=flat-square)](https://david-dm.org/multiformats/js-multihashing-async) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/npm-%3E%3D3.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D4.0.0-orange.svg?style=flat-square)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/js-multihashing-async.svg)](https://saucelabs.com/
u/js-multihashing-async)

> Use all the functions in [multihash](https://github.com/multiformats/multihash).

#### Wait, why, how is this different from Node `crypto`?

This module just makes working with multihashes a bit nicer.
[js-multihash](//github.com/multiformats/js-multihash) is only for
encoding/decoding multihashes, and does not depend on other libs.
This module will depend on various implementations for each hash.
It currently uses `crypto` and [`sha3`](https://github.com/phusion/node-sha3) in Node.js.
In the browser [`webcrypto`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
and [`browserify-sha3`](https://github.com/wanderer/browserify-sha3) are used.

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Install](#install)
  + [In Node.js through npm](#in-nodejs-through-npm)
  + [Use in a browser with browserify, webpack or any other bundler](#use-in-a-browser-with-browserify-webpack-or-any-other-bundler)
  + [Use in a browser Using a script tag](#use-in-a-browser-using-a-script-tag)
    - [Gotchas](#gotchas)
* [Usage](#usage)
* [Examples](#examples)
  + [Multihash output](#multihash-output)
* [API](#api)
  + [`multihashing(buf, func, [length,] callback)`](#multihashingbuf-func-length-callback)
  + [`digest(buf, func, [length,] callback)`](#digestbuf-func-length-callback)
  + [`createHash(func)`](#createhashfunc)
  + [`functions`](#functions)
* [Maintainers](#maintainers)
* [Contribute](#contribute)
* [License](#license)

## Install

### In Node.js through npm

```bash
$ npm install --save multihashing-async
```

```js
const multihashing = require('multihashing-async')
```

### Use in a browser with browserify, webpack or any other bundler

The code published to npm that gets loaded on require is in fact a ES5 transpiled
version with the right shims added. This means that you can require it and use with
your favourite bundler without having to adjust asset management process.

```js
const multihashing = require('multihashing-async')
```

### Use in a browser Using a script tag

Loading this module through a script tag will make the `multihashing` obj
available in the global namespace.

```html
<script src="https://unpkg.com/multihashing-async/dist/index.min.js"></script>
<!-- OR -->
<script src="https://unpkg.com/multihashing-async/dist/index.js"></script>
```

#### Gotchas

You will need to use Node.js `Buffer` API compatible, if you are running inside the browser, you can access it by `multihashing.Buffer` or you can install Feross's [Buffer](https://github.com/feross/buffer).

## Usage

```js
const multihashing = require('multihashing-async')
const buf = new Buffer('beep boop')

multihashing(buf, 'sha1', (err, multihash) => {
  // by default calls back with a multihash.
})

// Use `.digest(...)` if you want only the hash digest (drops the prefix indicating the hash type).
multihashing.digest(buf, 'sha1', (err , digest) => {
  // digest is the raw digest
})

// Use `.createHash(...)` for the raw hash functions
const h = multihashing.createHash('sha1')
h(buf, (err, digest) => {
  // digest is a buffer of the sha1 of buf
})
```

## Examples

### Multihash output

```js
> const multihashing = require('multihashing')
> const buf = new Buffer('beep boop')

> multihashing(buf, 'sha1'), (err, mh) => console.log(mh))
// => <Buffer 11 14 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21>

> multihashing(buf, 'sha2-256', (err, mh) => onsole.log(mh))
// => <Buffer 12 20 90 ea 68 8e 27 5d 58 05 67 32 50 32 49 2b 59 7b c7 72 21 c6 24 93 e7 63 30 b8 5d dd a1 91 ef 7c>

> multihashing(buf, 'sha2-512'), (err, mh) => console.log(mh))
// => <Buffer 13 40 14 f3 01 f3 1b e2 43 f3 4c 56 68 93 78 83 77 1f a3 81 00 2f 1a aa 5f 31 b3 f7 8e 50 0b 66 ff 2f 4f 8e a5 e3 c9 f5 a6 1b d0 73 e2 45 2c 48 04 84 b0 ...>
```

## API

### `multihashing(buf, func, [length,] callback)`

### `digest(buf, func, [length,] callback)`

### `createHash(func)`

### `functions`

An object mapping hexcodes to their hash functions.

## Maintainers

Captain: [@diasdavid](https://github.com/diasdavid).

## Contribute

Contributions welcome. Please check out [the issues](https://github.com/multiformats/js-multihashing-async/issues).

Check out our [contributing document](https://github.com/multiformats/multiformats/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to multiformats are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT](LICENSE) © Protocol Labs Inc.
