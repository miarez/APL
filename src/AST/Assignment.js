
class Assignment extends ASTNode {

    constructor(
        varname,
        value
    ){
        this.varname = varname
        this.value   = value
    }
    toString(){
        return `Assignment(${this.varname.token.value} ← ${this.value})`
    }
}