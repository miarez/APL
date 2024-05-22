class Token {

    // Data types
    static INTEGER  = "INTEGER"
    static FLOAT    = "FLOAT"
    static ID       = "ID"

    // Functions
    static PLUS     = "PLUS"
    static MINUS    = "MINUS"
    static TIMES    = "TIMES"
    static DIVIDE   = "DIVIDE"
    static CEILING  = "CEILING "
    static FLOOR    = "FLOOR"

    // Operators
    static COMMUTE  = "COMMUTE"

    // Misc
    static DIAMOND      = "DIAMOND "
    static NEGATE       = "NEGATE"
    static ASSIGNMENT   = "ASSIGNMENT "
    static LPARENS      = "LPARENS"
    static RPARENS      = "RPARENS"
    static EOF          = "EOF"

    static FUNCTIONS = [
        Token.PLUS,
        Token.MINUS,
        Token.TIMES,
        Token.DIVIDE,
        Token.CEILING,
        Token.FLOOR
    ]

    static MONADIC_OPS = [
        Token.COMMUTE
    ]

    static NUMS = "¯0123456789"
    static WYSIWYG = "+-×÷()⍨¯"

    static WYSIWYG_MAPPING = {
        "+": Token.PLUS,
        "-": Token.MINUS,
        "×": Token.TIMES,
        "÷": Token.DIVIDE,
        "⌈": Token.CEILING,
        "⌊": Token.FLOOR,
        "⍨": Token.COMMUTE,
        "←": Token.ASSIGNMENT,
        "(": Token.LPARENS,
        ")": Token.RPARENS,
        "¯": Token.NEGATE,
        "⋄": Token.DIAMOND         
    }

    static ID_CHARS = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


    static EXPLAIN = {
        COMMUTE : 
        "The commute operator ⍨ reverses the arguments of the function it modifies."+
        "For example, if f is a function, then x f⍨ y is equivalent to y f x."
    }

    constructor(type, value) {
        this.type = type
        this.value = value
    }

    toString() {
        return `Token(${this.type}, ${this.value})`
    }
}
