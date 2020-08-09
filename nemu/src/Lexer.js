const makeLexerClass = require('./utils/makeLexerClass')

const ident = '[a-zA-Z][a-zA-Z_\\-\\$\\d]*'
const pm = '[\\+\\-]'
const integer = `${pm}?[1-9]\\d*`
const decimal = `${integer}(\\.\\d*)?`
const real = `${decimal}([eE]${integer})?`

// console.log(real)

const Lexer = makeLexerClass({
  '=': '=',
  '(': '\\(',
  ')': '\\)',
  '[': '\\[',
  ']': '\\]',
  '{': '\\{',
  '}': '\\}',
  '/': '\\/',
  '.': '\\.',
  ',': ',',
  ';': ';',
  "'": "'",
  true: 'true',
  false: 'false',
  yes: 'yes',
  no: 'no',
  pm,
  addop: pm,
  mulop: '[\\*\\/]',
  powop: '\\^',
  ident,
  digits: '\\d+'
  integer,
  decimal,
  real,
  'single-quoat-esc': "\'",

  // Gramma predicate.
  assignment: `${ident} *=`,
  expression: `(${ident})|\\d|\\(`,
  function: `${ident} *\\(`
})

module.exports = Lexer
