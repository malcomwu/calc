# calc
An enhanced calc command in shell.

## Type (Draft)

1. Complex: Real1 + Real2 i ; C(Re, Im)
2. Real: by IEEE double specification
3. Rational: nom / denom ; R(nom, denom), in which nom is integrer and denom is positive
   integer.
3. Decimal: A subset of Real; i.e., without the [eE].. in D3.1416 ?
   Decimal is also a subset of Rational; e.g., 3.1416 === R(31416, 10000)
   Temporarily the author does not want to simplify the rational such as
   R(12, 10) ==> R(6, 5). The reason is to preserve the original data.
   The assertion will be === the same. Say, if we make a nom-demon in x-y
   axis, the (12, 10) and (6, 5) are in the different position but the value
   are exactly the same.
4. Integer; there is no built-in integer. The reason is that the philosophy of
   this calc is as simple as JavaScript. We only have a number type real and
   other's are all derived types. You may imagine this is the human logic while
   the C-like a bounch of number type is for the more machine think for optimization.
   To continue a bit this philosophy, if you have big O(n) n = .., say, in the
   cal, the real (double) can be optimized befor entering the algorithm. It means
   that someone love the calc and he or she can make something add on.
   The definiation of the Interger need a long introduce because it is the other
   way around. The interger is a R(int, 1) some surrogation. Any int op in will
   fall in R(nom, denom). We don't do, as the same as about, the typing but rather
   a function-like. Such as I(123) === R(123, 1) internally. The operations do
   simplify the R() so that it is trival to test the denome === 1, the integer.

5. What else? No information.. All the compond number are not done yet. It's very
   complicated. The simplist is a vector........

6. One type I have been and you know that very intersting is the Categorical. I would
   say that it much like the JS array. Somehow, I feel that it shoul not go to the
   compond type because I feel many look like an integrity. Can we say that the
   C(Re, Im) and R(nom, demon) two standing alone examples? My point is that I treat
   both Categoricals. The Categoricals can go into the Vectors and Matrics in
   Mathematics. Say Cat(Rat1, Rat2) can be calculated in matrix by their nature,
   cann't it? The Rat1 and Rat2 are the fundamental R(). Our categries are of the
   names or titles. We havn't studied well about the value of the name-titles. It
   might be anlytical solvable or can be numerical solved. For example, the 'popular'
   pandemic; every country/region has its own published data in name of a, b, c, ...
   I haven't seem, perhaps not in public, someone integrate the data to form some
   information for reference. It is very simple, only pick the a to study; then only
   b; only c, and you do (a, b) and (b, c) (a, c) as three categorical for example
   here. You many not see correlation of single a, b, or c but eventally you many
   see the (a, b, c) categoricals in a matrix. I describ it very optimistics. But
   I presume that if you wanted to do, you will suffer a lot becase no one ever done
   it before. The reason we can do is we have powerful computer. It can perhaps be
   done in a PC. The difficulty is to find the name a with the relation of value_a.

7. My goal of Categorical is staying the same: MalcomWu(Assets, Currency, Credit) //tl;debitr


The abbriviation is for temporary test for feelings..




//////////////////////////////////////////////////////////////////////




## Type coercion
Rank:
                               literal
1. Complex: C(re, im)          '(' real '+' real 'i' ')'
2. Real: 123.456e7             double  // last in sequence to be parsed
3. Rational: R(nom, denom)    \pm integer '/' integer
4. Decimal: 123.456           \pm integer '.' integer
5. Integer: 123                \pm [1-9]\d*

5 E 4 E 3 E 2 E 1

Real.toComplex()
Rational.toReal()       // Real is Number in JS (nemu)
        .toComplex()
Decimal.toRational()
       .to(Real)
       .toComplex()
Integer.toDecimal()
       .toRational()
       .to(Real)
       .toComplex()


The 123. or .456 considered invalid.

In nemu th build-in number is only the real (double).
Other types are made base-on the real. It will be the same
in the calc. Because the rational or integer intesive calculation
are supposedly rare. It necessary, it can be quickly convert to int
easily.

It is temporarily considered a varial-literals. It means that the
123 is recognized as Integer, 123.456 the Decimal and 123.456e7 the
Real. The 123.0 is Decimal and the 123e7 or 123.0e7 are Real.

Because the parser does not good in the optimization of coercion.
The simple method is to do it one-by-one when two numbers encounter.

Other compound type, such as Vector, will have uniform number type,
and it will be coerced at once.

Just an idea to see...

For this arrangement, all the ranges of the types are narrower than
some 'normal' way. It was considered OK for most use cases. The range
error or something is not considered too. The author considered this
calc as toy. If the toy was boring, nobody cares; otherwise, perhaps
someone will jump out to reimplement it, because it is very easy.

