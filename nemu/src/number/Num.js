
// Binary types will be considerd later..

// Supported number type names:
const TYPES = ['integer', 'decimal', 'rational', 'real', 'complex']
const TYPE_RANK = TYPES.map((type, i) => {
  const result = {}
  result[type] = i
  return result
})

// The opposite of hoist will not be supported; not sure yet?

// Num is an abstract class with some concret interfaces.
module.exports = class Num {

  add(b) {
    // hoist this? or b
    // that = hoist(this) || this (and hoist(b))
    // that.add(b)
    // ??
  }

  sub(b) {}
  mul(b) {}
  div(b) {}

  toComplex() {

  }

  toReal() {

  }

  toRational() {

  }

  toDecimal() {

  }

  // No toInteger() currently.

  static add(a, b) {}   // ?
  static sub(a, b) {}   // ?
  static mul(a, b) {}   // ?
  static div(a, b) {}   // ?

  static type(a) { return typeof a === 'number' ? 'real' : a.name }
  static typeRank(a) { return TYPE_RANK[Num.type(a)] }

  static hoist(a, b) {
    const typeRankA = Num.typeRank(a)
    const typeRankB = Num.typeRank(b)
    if (typeRankA === typeRankB) return
    const maxRank = Math.max(typeRankA, typeRankB)
    if (typeRankA < maxRank) {
      // hoist a
      // Num.hoistToRational(a)   // => new R()?
      // a.hoistToRational()  // => new R()?
    } else {
      // hoist b
    }
  }
}

// Num.type(a): the eaist is to wrap Real(..), but my purpose is to do:
// const a = [1, 2, 3]
// const b = 5
// const c = M('a + b')   // [6, 7, 8]
// the convenience for the built in number for the M() embeding.
// The rest will return the certain type of instance.
