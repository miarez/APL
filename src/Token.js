class Token {

    static INTEGER = "INTEGER"
    static FLOAT = "FLOAT"

    static PLUS = "PLUS"
    static MINUS = "MINUS"
    static TIMES = "TIMES"
    static DIVIDE = "DIVIDE"

    static NEGATE = "NEGATE"

    static COMMUTE = "COMMUTE"

    static LPARENS = "LPARENS"
    static RPARENS = "RPARENS"

    static EOF = "EOF"

    static FUNCTIONS = [
        Token.PLUS,
        Token.MINUS,
        Token.TIMES,
        Token.DIVIDE
    ]

    static MONADIC_OPS = [
        Token.COMMUTE
    ]

    static NUMS = "0123456789"
    static WYSIWYG = "+-×÷()⍨¯"

    static WYSIWYG_MAPPING = {
        "+": Token.PLUS,
        "-": Token.MINUS,
        "×": Token.TIMES,
        "÷": Token.DIVIDE,
        "(": Token.LPARENS,
        ")": Token.RPARENS,
        "⍨": Token.COMMUTE,
        "¯": Token.NEGATE 
    }

    constructor(type, value) {
        this.type = type
        this.value = value
    }

    toString() {
        return `Token(${this.type}, ${this.value})`
    }
}
