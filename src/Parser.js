class Parser {
    constructor(tokenizer, debug = false) {
        this.tokens = tokenizer.tokenize();
        this.pos = this.tokens.length - 1;
        this.token_at = this.tokens[this.pos];
        this.debug_on = debug;
    }

    debug(message) {
        if (this.debug_on) {
            console.log(`PD @ ${message}`);
        }
    }

    error(message) {
        throw new Error(`Parser: ${message}`);
    }

    eat(token_type) {
        if (this.token_at.type !== token_type) {
            this.error(`Expected ${token_type} and got ${this.token_at.type}.`);
        } else {
            this.pos -= 1;
            this.token_at = this.pos < 0 ? null : this.tokens[this.pos];
        }
    }

    peek() {
        const peek_at = this.pos - 1;
        return peek_at < 0 ? null : this.tokens[peek_at].type;
    }

    parseProgram() {
        this.debug(`Parsing program from ${this.tokens}`);
        const node = this.parseStatement();
        this.eat(Token.EOF);
        return node;
    }

    parseStatement() {
        this.debug(`Parsing statement from ${this.tokens.slice(0, this.pos + 1)}`);
        let node = this.parseArray();
        while (Token.FUNCTIONS.includes(this.token_at.type) || Token.MONADIC_OPS.includes(this.token_at.type)) {
            const [func, base] = this.parseFunction();
            if (base instanceof Dyad) {
                base.right = node;
                base.left = this.parseArray();
            } else if (base instanceof Monad) {
                base.child = node;
            } else {
                this.error(`Got ${typeof base} instead of a Monad/Dyad.`);
            }
            node = func;
        }
        return node;
    }

    parseArray() {
        this.debug(`Parsing array from ${this.tokens.slice(0, this.pos + 1)}`);
        const nodes = [];
        while ([Token.RPARENS, Token.INTEGER, Token.FLOAT, Token.NEGATE].includes(this.token_at.type)) {
            if (this.token_at.type === Token.RPARENS) {
                this.eat(Token.RPARENS);
                nodes.push(this.parseStatement());
                this.eat(Token.LPARENS);
            } else {
                nodes.push(this.parseScalar());
            }
        }
        const reversedNodes = nodes.reverse();
        if (!nodes.length) {
            this.error("Failed to parse scalars inside an array.");
        } else if (nodes.length === 1) {
            return nodes[0];
        } else {
            return new ArrayNode(nodes.reverse());
        }
    }

    parseScalar() {
        this.debug(`Parsing scalar from ${this.tokens.slice(0, this.pos + 1)}`);
        let node;

        if (this.token_at.type === Token.INTEGER || this.token_at.type === Token.FLOAT) {
            node = new Scalar(this.token_at);
            this.eat(this.token_at.type);
        } else {
            this.error("Expected scalar value.");
        }

        if (this.token_at && this.token_at.type === Token.NEGATE) {
            node.value = -node.value;
            node.token.value = -node.token.value; // Also update the token value
            this.eat(Token.NEGATE);
        }

        return node;
    }

    parseFunction() {
        this.debug(`Parsing function from ${this.tokens.slice(0, this.pos + 1)}`);
        let node, base;
        if (Token.MONADIC_OPS.includes(this.token_at.type)) {
            node = new MO(this.token_at, null);
            this.eat(this.token_at.type);
            [node.child, base] = this.parseFunction();
        } else {
            base = node = this.parseF();
        }
        return [node, base];
    }

    parseF() {
        this.debug(`Parsing f from ${this.tokens.slice(0, this.pos + 1)}`);
        let node;
        if ([Token.RPARENS, Token.INTEGER, Token.FLOAT, Token.NEGATE].includes(this.peek())) {
            node = new Dyad(this.token_at, null, null);
        } else {
            node = new Monad(this.token_at, null);
        }
        this.eat(node.token.type);
        return node;
    }

    parse() {
        return this.parseProgram();
    }
}
