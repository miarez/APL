class Tokenizer {

    constructor(query) {
        this.query  = query
        this.len    = this.query.length
        this.pos    = 0
        this.current_char = this.query[this.pos]
    }

    tokenize() {
        let tokens = [this.get_next_token()]

        while (tokens[tokens.length - 1].type !== Token.EOF) {
            tokens.push(this.get_next_token())
        }
        return [tokens[tokens.length - 1]].concat(tokens.slice(0, tokens.length - 1));
    }

    error(e) {
        throw new Error(`Tokenizer Error: ${e}`)
    }

    advance() {
        this.pos += 1
        this.current_char = this.pos > this.len ? null : this.query[this.pos]
    }

    skip_whitespace() {
        while (this.current_char && " \t".includes(this.current_char)) {
            this.advance()
        }
    }

    get_integer() {
        let start_index = this.pos
        while (this.current_char && /\d/.test(this.current_char)) {
            this.advance()
        }
        return this.query.slice(start_index, this.pos)
    }

    get_number_token() {
        let parts = [];
        
        // Handle negation
        if (this.current_char === "¯") {
            this.advance();
            parts.push("¯");
        }        
        parts.push(this.get_integer());
       
        
        if (this.current_char === ".") {
            this.advance();
            parts.push(".");
            parts.push(this.get_integer());
        }
    
        parts = parts.join("");
    
        if (parts.includes(".")) {
            return new Token(Token.FLOAT, parseFloat(parts));
        } else {
            return new Token(Token.INTEGER, parseInt(parts));
        }
    }


    get_id_token(){
        let start = this.pos 
        while(this.current_char && Token.ID_CHARS.includes(this.current_char)){
            this.advance()
        }
        return new Token(Token.ID, this.query.slice(start, this.pos))
    }


    get_wysiwyg_token() {
        let char = this.current_char
        this.advance()
        try {
            return new Token(Token.WYSIWYG_MAPPING[char], char)
        } catch(e){
            this.error("Could not parse WYSIWYG token.")
        }
    }

    get_next_token() {
        this.skip_whitespace()
        if (!this.current_char) {
            return new Token(Token.EOF, null)
        }

        if (Token.NUMS.includes(this.current_char)) {
            return this.get_number_token()
        }

        if(Token.ID_CHARS.includes(this.current_char)){
            return this.get_id_token()
        }

        if (Token.WYSIWYG.includes(this.current_char)) {
            return this.get_wysiwyg_token()
        }

        this.error(`Token of [${this.current_char}] Could Not Be Parsed`)
    }
}