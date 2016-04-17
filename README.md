js-multihashing
===============

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Coverage Status](https://coveralls.io/repos/github/jbenet/js-multihashing/badge.svg?branch=master)](https://coveralls.io/github/jbenet/js-multihashing?branch=master)
[![Travis CI](https://travis-ci.org/jbenet/js-multihashing.svg?branch=master)](https://travis-ci.org/jbenet/js-multihashing)
[![Circle CI](https://circleci.com/gh/jbenet/js-multihashing.svg?style=svg)](https://circleci.com/gh/jbenet/js-multihashing)
[![Dependency Status](https://david-dm.org/jbenet/js-multihashing.svg?style=flat-square)](https://david-dm.org/jbenet/js-multihashing) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Use all the functions in [multihash](//github.com/jbenet/multihash).

> Wait, why, how is this different from Node `crypto`?

This module just makes working with multihashes a bit nicer.
[js-multihash](//github.com/jbenet/js-multihash) is only for
encoding/decoding multihashes, and does not depend on other libs.
This module will depend on various implementations for each hash.
For now, it just uses `crypto`, but will use `sha3` and `blake2`, etc.

## Installation

### In Node.js through npm

```bash
$ npm install --save multihashing
```

```js
var multihashing = require('multihashing')
```

## Use in a browser with browserify, webpack or any other bundler

The code published to npm that gets loaded on require is in fact a ES5 transpiled version with the right shims added. This means that you can require it and use with your favourite bundler without having to adjust asset management process.

```js
var multihashing = require('multihashing')
```

## Use in a browser Using a script tag

Loading this module through a script tag will make the `multihashing` obj available in the global namespace.

```html
<script src="https://npmcdn.com/multihashing/dist/index.min.js"></script>
<!-- OR -->
<script src="https://npmcdn.com/multihashing/dist/index.js"></script>
```

#### Gotchas

You will need to use Node.js `Buffer` API compatible, if you are running inside the browser, you can access it by `multihashing.Buffer` or you can install Feross's [Buffer](https://github.com/feross/buffer).

## Usage

```js
var multihashing = require('multihashing')
var buf = new Buffer('beep boop')

// by default returns a multihash.
multihashing(buf, 'sha1')

// Use `.digest(...)` if you want only the hash digest.
multihashing.digest(buf, 'sha1')

// Use `.createHash(...)` for a `crypto.createHash` interface.
var h = multihashing.createHash('sha1')
h.update(buf)
h.digest()
```

## Examples

### Multihash output

```js
> var multihashing = require('multihashing')
> var buf = new Buffer('beep boop')

> console.log(multihashing(buf, 'sha1'))
<Buffer 11 14 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21>

> console.log(multihashing(buf, 'sha2-256'))
<Buffer 12 20 90 ea 68 8e 27 5d 58 05 67 32 50 32 49 2b 59 7b c7 72 21 c6 24 93 e7 63 30 b8 5d dd a1 91 ef 7c>

> console.log(multihashing(buf, 'sha2-512'))
<Buffer 13 40 14 f3 01 f3 1b e2 43 f3 4c 56 68 93 78 83 77 1f a3 81 00 2f 1a aa 5f 31 b3 f7 8e 50 0b 66 ff 2f 4f 8e a5 e3 c9 f5 a6 1b d0 73 e2 45 2c 48 04 84 b0 ...>
```

### Raw digest output

```js
> var multihashing = require('multihashing')
> var buf = new Buffer('beep boop')

> console.log(multihashing.digest(buf, 'sha1'))
<SlowBuffer 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21>

> console.log(multihashing.digest(buf, 'sha2-256'))
<SlowBuffer 90 ea 68 8e 27 5d 58 05 67 32 50 32 49 2b 59 7b c7 72 21 c6 24 93 e7 63 30 b8 5d dd a1 91 ef 7c>

> console.log(multihashing.digest(buf, 'sha2-512'))
<SlowBuffer 14 f3 01 f3 1b e2 43 f3 4c 56 68 93 78 83 77 1f a3 81 00 2f 1a aa 5f 31 b3 f7 8e 50 0b 66 ff 2f 4f 8e a5 e3 c9 f5 a6 1b d0 73 e2 45 2c 48 04 84 b0 2e 03 ...>
```

## API

### `multihashing(buf, func, length)`

### `digest(buf, func, length)`

### `createHash(func, length)`

### `functions`

An object mapping hexcodes to their hash functions.

## License

MIT
