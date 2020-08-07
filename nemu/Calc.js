const Lexer = require('./Lexer')
const Expression = require('./Expression')

/**
  calc := '' | stmt (';' stmt)*
  stmt := assign | expr
  assign := ident '=' expr
 **/

module.exports = class Calc {
  constructor() {
    this.name = 'calc'
    this.symbolTable = {}
  }

  run(src) {
    this.parse(new Lexer(src))
    return this.value
  }

  log(src) { console.log(this.run(src)) }

  ans(src) {
    const result = this.run(src)
    const str = this.currSymbol ? `${this.currSymbol} = ${result}` : `ans = ${result}`
    console.log(str)
  }

  get env() {
    Object.keys(this.symbolTable).forEach(ident => {
      console.log(`${ident} = ${this.symbolTable[ident]}`)
    })
    console.log(`ans = ${this.currAns}`)
  }

  parse(lexer) {
    lexer.skipWhite()
    while (!lexer.eof) {
      if (lexer.is('assignment')) {
        this.value = this.parseAssignment(lexer)
      } else if (lexer.is('expression')) {
        this.value = new Expression(lexer, this.symbolTable).value
        this.currSymbol = ''
      } else {
        lexer.error('Syntax error')
      }
      lexer.skipWhite()
      lexer.optional(';')
      lexer.skipWhite()
      this.currAns = this.value
    }
  }

  parseAssignment(lexer) {
    let ident
    lexer.token('ident', lexeme => { ident = lexeme })
    lexer.skipWhite()
    lexer.token('=')
    lexer.skipWhite()
    this.currSymbol = ident
    this.symbolTable[ident] = new Expression(lexer, this.symbolTable).value
    return this.symbolTable[ident]
  }

  toString() {}
  toJSON() {}
}
