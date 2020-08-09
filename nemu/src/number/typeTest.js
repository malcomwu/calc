const Rational = require('./Rational')
const Complex = require('./Complex')

let a = new Rational(2, 3)
let b = new Rational(4, 5)

console.log('' + Rational.add(a, b),  // 2/3 + 4/5 = (10 + 12) / 15 = 22/15
            '' + Rational.sub(a, b),  // 2/3 - 4/5 = (10 - 12) / 15 = -2 / 15
            '' + Rational.mul(a, b),  // 2/3 * 4/5 = 8/15
            '' + Rational.div(a, b))  // 2/3 / 4/5 = 2/3 * 5/4 = 10/12
console.log('' + a.add(b), '' + a.sub(b), '' + a.mul(b), '' + a.div(b))


a = new Complex(2, 3)
b = new Complex(4, 5)

console.log('' + Complex.add(a, b),  // 2 + 3i + 4 + 5i = 6 + 8i
            '' + Complex.sub(a, b),  // 2 + 3i - (4 + 5i) = -2 - 2i
            '' + Complex.mul(a, b),  // (2 + 3i) * (4 + 5i) = 8-15 +(10+12)i
                                     //                     = -7 + 22i
            '' + Complex.div(a, b))  // (2 + 3i) / (4 + 5i) =
console.log('' + a.add(b), '' + a.sub(b), '' + a.mul(b), '' + a.div(b))

let d = a.div(b)
console.log('' + d.mul(b))
console.log('conjugate:', a.conjugate, 'phase:', a.phase)
