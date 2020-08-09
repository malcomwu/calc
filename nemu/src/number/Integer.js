const Num = require('./Num')
const Lexer = require('../Lexer')
const { makeToJSON } = require('../utils/helpers')

module.exports = class Integer extends Num {
  constructor(value) {
    super()
    this.name = 'integer'
    this.value = +value
  }

  add(b) { return this.value + b }
  sub(b) { return this.value - b }
  mul(b) { return this.value * b }
  div(b) { return this.value / b }

  static add(a, b) { return a + b }
  static sub(a, b) { return a - b }
  static mul(a, b) { return a * b }
  static div(a, b) { return a / b }

  toString() { return '' + this.value }
  toJSON = makeToJSON(value)
}
