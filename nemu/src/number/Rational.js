const Num = require('./Num')
const Lexer = require('../Lexer')
const { makeToJSON } = require('../utils/helpers')

module.exports = class Rational extends Num {
  constructor(nom, denom) {
    super()
    this.name = 'rational'
    if (typeof nom === 'string') {
      this.parse(new Laxer(nom))
    } else {
      this.nom = nom
      this.denom = denom
    }
  }

  // 2/3 yes; 2 / 3 no..
  parse(lexer) {
    this.token('integer', lexeme => { this.nom = +lexeme })
    this.token('/')
    this.token('digits', lexeme => { this.denom = +lexeme })
  }

  simplify() {
    Object.assign(this, Rational.simplify(this))
    return this
  }
  static simplify(a) {
    // Todo
  }

  static add(a, b) {
    const rawValue = new Rational(a.nom * b.denom + b.nom * a.denom,
                                  a.denom * b.denom)
    return Rational.simplify(rawValue)
  }

  static sub(a, b) {
    const rawValue = new Rational(a.nom * b.denom - b.nom * a.denom,
                                  a.denom * b.denom)
    return Rational.simplify(rawValue)
  }

  static mul(a, b) {
    const rawValue = new AbstractRational(a.nom * b.nom,
                                          a.denom * b.denom)
    return Rational.simplify(rawValue)
  }

  static div(a, b) {
    const rawValue = new AbstractRational(a.nom * b.denom,
                                          a.denom * b.nom)
    return Rational.simplify(rawValue)
  }

  static toReal(a) { return a.nom / a.denom }
  static.toComplex(a) { return new Complex(Rational.toReal(a), 0) }

  toString() { return `${this.nom}/${this.denom}` }
  toJSON = makeToJSON('nom', 'denom')
}
