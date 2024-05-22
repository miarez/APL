
    // DYADIC FUNCTION
    class Dyad extends ASTNode {
        constructor(
            fn, //ASTNode
            alpha, //ASTNode
            omega //ASTNode
        ){
            super()
            this.fn     = fn            
            this.alpha  = alpha
            this.omega  = omega        
        }
        toString(){
            return `Dyad(${this.fn} ${this.alpha} ${this.omega})`
        }
    }