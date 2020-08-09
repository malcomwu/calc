const Num = require('./Num')
const Lexer = require('../Lexer')
const { makeToJSON } = require('../utils/helpers')

module.exports = class Complex extends Num {
  constructor(re, im) {
    super()
    this.name = 'complex'
    if (type of re === 'string') {
      this.parse(new Lexer(re))
    } else {
      this.re = re
      this.im = im
    }
  }

  parse(lexer) {
    let imsign
    lexer.token('real', lexeme => { this.re = +lexeme })
    lexer.skipWhite()
    lexer.token('pm', lexme => { imsign = lexeme === '+' ? 1 : -1 })
    lexer.skipWhite()
    lexer.token('real', lexeme => { this.re = imsign * lexeme })
  }

  add(b) { return Complex.add(this, b) }
  sub(b) { return Complex.sub(this, b) }
  mul(b) { return Complex.mul(this, b) }
  div(b) { return Complex.div(this, b) }

  get conjugate() { return Complex.conjugate(this) }
  get conjugateProduct() { return Complex.conjugateProduct(this) }

  get phase() { return Math.tan(this.im / this.re)}

  static conjugate(a) { return new Complex(a.re, -a.im)}
  static conjugateProduct(a) { return a.re * a.re + a.im * a.im }

  static add(a, b) {
    return new Complex(a.re + b.re, a.im + b.im)
  }

  static sub(a, b) {
    return new Complex(a.re - b.re, a.im - b.im)
  }
  static mul(a, b) {
    return new Complex(a.re * b.re - a.im * b.im,
                       a.re * b.im + a.im * b.re)
  }
  static div(a, b) {
    const denom = b.re * b.re + b.im * b.im
    return new Complex((a.re * b.re + a.im * b.im) / denom,
                       (-a.re * b.im + a.im * b.re) / denom)
  }

  toString() {
    const { re, im } = this
    if (re === 0) return `${im}i`
    return im >= 0 ? `(${re} + ${im}i)` : `(${re} - ${-im}i)`
  }

  toJSON = makeToJSON('re', 'im')
}
