class Tokenizer {

    constructor(query) {
        this.query = query
        this.pos = this.query.length - 1 // LTR interpretation 
        this.current_char = this.query[this.pos]
    }

    tokenize() {
        let tokens = [this.get_next_token()]

        while (tokens[tokens.length - 1].type !== Token.EOF) {

            cs(tokens)
            tokens.push(this.get_next_token())
        }
        return tokens.reverse()
    }

    error(e) {
        throw new Error(`Tokenizer Error: ${e}`)
    }

    advance() {
        this.pos -= 1
        this.current_char = this.pos < 0 ? null : this.query[this.pos]
    }

    skip_whitespace() {
        while (this.current_char && " \t".includes(this.current_char)) {
            this.advance()
        }
    }

    get_integer() {
        let end_index = this.pos
        while (this.current_char && /\d/.test(this.current_char)) {
            this.advance()
        }
        return this.query.slice(this.pos + 1, end_index + 1)
    }

    get_number_token() {
        let parts = [];
        
        // Handle negation
        if (this.current_char === "¯") {
            parts.push("¯");
            this.advance();
        }
        
        parts.push(this.get_integer());
        
        if (this.current_char === ".") {
            this.advance();
            parts.push(".");
            parts.push(this.get_integer());
        }
    
        parts = parts.reverse().join("");
    
        if (parts.includes(".")) {
            return new Token(Token.FLOAT, parseFloat(parts));
        } else {
            return new Token(Token.INTEGER, parseInt(parts));
        }
    }

    get_wysiwyg_token() {
        let char = this.current_char
        if (Token.WYSIWYG_MAPPING.hasOwnProperty(char)) {
            this.advance()
            return new Token(Token.WYSIWYG_MAPPING[char], char)
        }
        this.error("Could not parse WYSIWYG token.")
    }

    get_next_token() {
        this.skip_whitespace()
        if (!this.current_char) {
            return new Token(Token.EOF, null)
        }

        if (Token.NUMS.includes(this.current_char)) {
            return this.get_number_token()
        }

        if (Token.WYSIWYG.includes(this.current_char)) {
            return this.get_wysiwyg_token()
        }

        this.error(`Token of [${this.current_char}] Could Not Be Parsed`)
    }
}