
class Var extends ASTNode {

    constructor(
        token
    ){
        this.token = token
        this.name = this.token.value
    }
    toString(){
        return `Var(${this.token.value})`
    }

}