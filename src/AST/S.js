
class S extends ASTNode {
    constructor(
        token
    ){
        super()
        this.token = token
        this.value = this.token.value
    }
    toString(){
        return `S(${this.value})`
    }
}