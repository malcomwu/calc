const Num = require('./Num')
const Lexer = require('../Lexer')
const { makeToJSON } = require('../utils/helpers')

module.exports = class Decimal extends Num {
  constructor(dec, fix = 6 /* ? */) {
    super()
    this.name = 'decimal'
    if (typeof dec === 'string') {
      this.parse(new Lexer(dec))
    } else if (typeof dec === 'object') {
      // quick-and-dirty
      this.nom = dec.nom
      this.denom = dec.denom
      this.fix = dec.fix
    } else {
      this.nom = dec * Math.pow(10, fix).round()
      this.denom = Math.pow(10, fix)
    }
  }

  parse(lexer) {
    let pre, suf
    lexer.token('integer', lexeme => { pre = lexeme })
    lexer.token('.')
    lexer.token('digits', lexeme => { suf = lexeme })
    this.fix = suf.length
    this.nom = +(pre + suf)
    this.denom = Math.pow(10, fix)
  }

  static add(a, b) { return Decimal.toFix(a, b, Rational.add(a, b)) }
  static sub(a, b) { return Decimal.toFix(a, b, Rational.sub(a, b)) }
  static mul(a, b) { return Decimal.toFix(a, b, Rational.mul(a, b)) }
  static div(a, b) { return Decimal.toFix(a, b, Rational.div(a, b)) }

  static toFix(a, b, rational) {
    const fix = Math.max(a.fix, b.fix)    // ~hoist the fix

    // Todo

    return new Decimal({ nom, denom, fix })
  }

  toString() { return '' + this.nom / this.denom }
  toJSON = makeToJSON('nom', 'denom', 'fix')
}
