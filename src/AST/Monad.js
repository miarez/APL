
    // MONADIC FUNCTION
    class Monad extends ASTNode {
        constructor(
            token,
            child
        ){
            super()
            this.token = token            
            this.child = child
        }
        toString(){
            return `Monad(${this.token.value} ${this.child})`
        }
    }

