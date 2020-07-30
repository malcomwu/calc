const makeLexerClass = require('./utils/makeLexerClass')

const Lexer = makeLexerClass({
  '(': '\\(',
  ')': '\\)',
  '[': '\\[',
  ']': '\\]',
  '{': '\\{',
  '}': '\\}',
  '.': '\\.',
  "'": "'",
  true: 'true',
  false: 'false',
  yes : 'yes',
  no : 'no',
  'single-quoat-esc': "\'",
  addop : /[\+\-]/,
  mulop : /[\*\/]/,
  powop : '^',
  ident : /[a-zA-Z][a-zA-Z_\-\$]*/      // $ is reserved for $
})

module.exports = Lexer
