
    // DYADIC FUNCTION
    class Dyad extends ASTNode {
        constructor(
            token,
            left,
            right
        ){
            super()
            this.token  = token            
            this.left   = left
            this.right  = right        
        }
        toString(){
            return `Dyad(${this.token.value} ${this.left} ${this.right})`
        }
    }