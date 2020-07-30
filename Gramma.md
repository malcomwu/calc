# The Gramma of the enhanced calc command

## Usage

**Command flow**
```shell
$ calc a = 1
a = 1
$ calc b = a + 1
b = 2
$ calc 1 + 2
ans = 3
$ calc env
a = 1
b = 2
ans = 3
$ calc a
a = 1
```

**Calculation session**
```
$ calc
Enter the calculation session.
> c = a + b
c = 3
> ^D
The calculation session is closed.
$ _
```


## Gramma in the command line
The command can be seen as a snapshot of the calculation session.
The context goes together with the sessions.

```bnf
calc := '' | stmt (';' stmt)*
stmt := assign | expr 
```

## Gramma in the calculation session
### Lexer
```
'(' := '\\('
')' := '\\)'
'[' := '\\['
']' := '\\]'
'{' := '\\{'
'}' := '\\}'
'.' := '\\.'
"'" := "'"
true := 'true'
false := 'false'
yes := 'yes'
no := 'no'
single-quoat-esc := "\'"
addop := /[\+\-]/
mulop := /[\*\/]/
powop := '^'
ident := /[a-zA-Z][a-zA-Z_\-\$]*/      // $ is reserved for $
```

### Parser
```bnf
calc := '' | stmt (';' stmt)*
stmt := assign | expr 
assign := ident '=' expr
expr := term (addop term)*
term := factor (mulop factor)*
factor := value (powop value)*
value := func | deref | '(' expr ')' | literal
deref := ident (('[' expr ']') | ('.' ident))*
func := ident '(' expr-list ')'
expr-list := '' | expr (',' expr)*
literal := bin-literal | str-literal | num-literal | range-literal | vec-literal |
           obj-literal | mat-literal
```

#### Literal subsection
```
bin-literal := ('true' | 'false') | ('yes' | 'no') ...
str-literal := prim-str-literal | temp-str-literal
prim-str-literal := "'" escwithout("'", 'single-quoat-esc') "'"
num-literal := int-literal | dec-literal | double-literal | ...
range-literal := /[\(\[]/ expr ',' expr /[\)\]]/
vec-literal :=  /[\(\[]/ expr ',' expr ',' expr /[\)\]]/
obj-literal := '{' '}' | '{' nv-pair (',' nv-pair)* '}'
nv-pair := (ident | prim-str-literal | symbol) ':' expr
symbol := '[' ident ']'
mat-literal := '[' expr+ (';' expr+)+ ']'
```
The bitwise will be added in for the later version.


## Build-in functions for data structure
```js
x = pair(a, b)
y = vector(a, b, ..)
z = list(a, b, ..)
w = tuple(a, b, ..)
c = set(a, b)
d = union(a, b)
e = intersection(a, b)
...
```
