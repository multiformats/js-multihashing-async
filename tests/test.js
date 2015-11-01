var test = require('tape')
var multihashing = require('../src')

test('sha1', function (t) {
  var buf = new Buffer('beep boop')

  var mh = multihashing(buf, 'sha1')
  t.deepEqual(mh, new Buffer(
    '11147c8357577f51d4f0a8d393aa1aaafb28863d9421'
  , 'hex'))

  t.end()
})

test('sha2-256', function (t) {
  t.end()
})

test('sha2-512', function (t) {
  t.end()
})

/*
> var buf = new Buffer('beep boop')

> console.log(multihashing(buf, 'sha1'))
<Buffer 11 14 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21>

> console.log(multihashing(buf, 'sha2-256'))
<Buffer 12 20 90 ea 68 8e 27 5d 58 05 67 32 50 32 49 2b 59 7b c7 72 21 c6 24 93 e7 63 30 b8 5d dd a1 91 ef 7c>

> console.log(multihashing(buf, 'sha2-512'))
<Buffer 13 40 14 f3 01 f3 1b e2 43 f3 4c 56 68 93 78 83 77 1f a3 81 00 2f 1a aa 5f 31 b3 f7 8e 50 0b 66 ff 2f 4f 8e a5 e3 c9 f5 a6 1b d0 73 e2 45 2c 48 04 84 b0 ...>

*/
