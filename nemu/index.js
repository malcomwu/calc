const Calc = require('./Calc')

const calc = new Calc()

calc.ans('5 + 2 - 10')
calc.ans('1 + 2 * 3')
calc.ans('(1 + 2) * 3')
calc.ans('1 + 2^3')
calc.ans('2^3^4 / 2^2')

calc.ans('a = 1 + 2')
calc.ans('b = 3 + 4')
calc.ans('c = a + b')

calc.session(`x = 1 + 2
y = 3 + 4
z = a * b
`)

// calc.ans('s1 = sin(3.14)')
// calc.ans('c1 = cos(3.14)')
// calc.ans('s2 = sin(3.14 * 2)')
// calc.ans('s3 = sin(3.14 * 2 + 1)')
// calc.ans('p1 = pow(5, 5)')
// calc.ans('p2 5^3')

// calc.env

// calc.ans('test = min(5, 9, 2)')
