import test from 'tape'
import {
  encode,
  decode
} from './base-64.js'

let to64 = text => new Buffer(text).toString('base64')

test('Base 64', t => {
  let man = 'Man'
  let encodedMan = to64(man)
  let helloWorld = 'Hello World'
  let encodedHelloWorld = to64(helloWorld)
  let phrase =
    `Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.`
  let encodedPhrase = to64(phrase)
  t.test('Encoding', t => {
    t.plan(4)
    t.equal(encode(man), encodedMan)
    t.equal(encode(helloWorld), encodedHelloWorld)
    t.equal(encode(phrase), encodedPhrase)
    t.throws(() => encode(`${String.fromCharCode(256)} hello!`))
  })

  t.test('Decoding', t => {
    t.plan(6)
    t.equal(decode(encodedMan), man)
    t.equal(decode(encodedHelloWorld), helloWorld)
    t.equal(decode(encodedPhrase), phrase)
    t.equal(decode(to64('a')), 'a')
    t.throws(() => decode('aGF,0Y2g'), 'invalid character')
    t.throws(() => decode('aGF0Y2g=='), 'invalid string')
  })
})
