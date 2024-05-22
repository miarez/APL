
    // MONADIC_OPERATOR
    class MOp extends ASTNode {
        constructor(
            token,
            child
        ){
            super()
            this.token      = token
            this.operator   = this.token.value
            this.child      = child
        }
        toString(){
            return `MO(${this.operator} ${this.child})`
        }
    }