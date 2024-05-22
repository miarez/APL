
    // MONADIC FUNCTION
    class Monad extends ASTNode {
        constructor(
            fn, // ASTNode
            omega // ASTNode
        ){
            super()
            this.fn = fn            
            this.omega = omega
        }
        toString(){
            return `Monad(${this.fn} ${this.omega})`
        }
    }

