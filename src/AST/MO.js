
    // MONADIC_OPERATOR
    class MO extends ASTNode {
        constructor(
            token,
            child
        ){
            super()
            this.token = token            
            this.child = child
        }
        toString(){
            return `MO(${this.token.value} ${this.child})`
        }
    }