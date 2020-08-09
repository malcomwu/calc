
/**
  expr := term (addop term)*
  term := factor (mulop factor)*
  factor := value (powop value)*
  value := func | deref | '(' expr ')' | literal
  deref := ident (('[' expr ']') | ('.' ident))*
  func := ident '(' expr-list ')'
  expr-list := '' | expr (',' expr)*
  literal := bin-literal | str-literal | num-literal | range-literal | vec-literal |
             obj-literal | mat-literal
 **/

/**
  expr :=
 **/

module.exports = class Expression {
  constructor(lexer, symbolTable) {
    this.name = 'expression'
    this.symbolTable = symbolTable
    this.value = this.parseExpression(lexer)
  }

  parseExpression(lexer) {
    let result = this.parseTerm(lexer)   // typed
    while (lexer.is('addop')) {
      let sign
      lexer.token('addop', lexeme => { sign = lexeme === '+' ? 1 : -1 })
      lexer.skipWhite()
      result += sign * this.parseTerm(lexer)

     // result = result//
     // result = pos ? Num.add(result, this.parseTerm(lexer)) :
     //                Num.sub(result, this.parseTerm(lexer))
     // how about Vector \pm Num|Vector // Vector is not Num..
     // Todo/

      lexer.skipWhite()
    }
    lexer.skipWhite()
    return result
  }

  parseTerm(lexer) {
    let result = this.parseFactor(lexer)
    while (lexer.is('mulop')) {
      let op
      lexer.token('mulop', lexeme => { op = lexeme })
      lexer.skipWhite()
      result = op === '*' ? result * this.parseFactor(lexer) :
                            result / this.parseFactor(lexer)
      lexer.skipWhite()
    }
    lexer.skipWhite()
    return result
  }

  parseFactor(lexer) {
    let result = this.parseValue(lexer)
    while (lexer.is('powop')) {
      lexer.token('powop')
      lexer.skipWhite()
      result = Math.pow(result, this.parseValue(lexer))
      lexer.skipWhite()
    }
    lexer.skipWhite()
    return result
  }

  parseValue(lexer) {
    let result
    if (lexer.is('(')) {
      lexer.token('(')
      result = this.parseExpression(lexer)
      lexer.token(')')
    } else if (lexer.is('function')) {
      result = this.parseFunction(lexer)
    } else if (lexer.is ('ident')) {
      lexer.token('ident', lexeme => { result = this.symbolTable[lexeme] })
    } else if (lexer.is('number')) {
      lexer.token('number', lexeme => { result = +lexeme })
    } else {
      lexer.error('Invalid value')
    }
    lexer.skipWhite()
    return result
  }

  parseFunction(lexer) {
    let ident, result
    lexer.token('ident', lexeme => { ident = lexeme })
    lexer.skipWhite()
    lexer.token('(')
    lexer.skipWhite()
    const list = this.parseCSL(lexer)
    result = Math[ident].apply(null, list)
    lexer.skipWhite()
    lexer.token(')')
    return result
  }

  parseCSL(lexer) {
    const list = []
    while (!lexer.eof) {
      list.push(this.parseExpression(lexer))
      if (!lexer.is(',')) break
      lexer.token(',')
      lexer.skipWhite()
    }
    return list
  }

  toString() {}
  toJSON() {}
}
