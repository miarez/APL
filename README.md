

Step 1: Re-write all of this into JS and understand what's happening :) 

https://mathspp.com/blog/lsbasi-apl-part1

Simple AST:
https://ruslanspivak.com/lsbasi-part7/




This AST structure will make it much easier for us to interpret an APL program; the price we have to pay is in building the tree first, which we do by traversing the Token list (from right to left once more) and then determining what are scalars, what are arrays, what are operators and what are dyadic/monadic functions. This is the job our AST will do. After that, interpreting a program becomes really easy.


Backus–Naur form of our APL interpreter
```txt
PROGRAM := EOF STATEMENT
STATEMENT := ( ARRAY FUNCTION | FUNCTION )* ARRAY
ARRAY := ( "(" STATEMENT ")" | SCALAR )+
SCALAR := INTEGER | FLOAT
FUNCTION := F | FUNCTION "⍨"
F := "+" | "-" | "×" | "÷"
```