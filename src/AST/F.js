
class F extends ASTNode {

    constructor(
        token
    ){
        this.token  = token 
        this.fn     = this.token.value
    }

    toString(){
        return `F(${this.fn})`
    }



}