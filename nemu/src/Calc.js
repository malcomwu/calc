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

  ans(src) {
    console.log('1> calc ' + src)
    const result = this.run(src)
    const str = this.currSymbol ? `${this.currSymbol} = ${result}` : `ans = ${result}`
    console.log(str, '\n')
  }

  session(src) {
    console.log('1> calc\nEnter the calculation session.')
    console.log(`Version A (same as in the command line):
> x = 1 + 2
x = 3
> y = 3 + 4
y = 7
> z = a * b
z = 21
exit
`)
    console.log(`Version B (Concise)
x = 1 + 2 => 3
y = 3 + 4 => 7
z = a * b => 21
sin(0) = 0`)
    console.log('exit\nExit the calculation session.\n')
  }

  get env() {
    console.log('1> calc env')
    Object.keys(this.symbolTable).forEach(ident => {
      console.log(`${ident} = ${this.symbolTable[ident]}`)
    })
    console.log(`ans = ${this.currAns}`, '\n')

    // Todo:
    // calc env clear
    // calc env clear a
    // calc env clear a, b, x
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
