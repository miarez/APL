
class A extends ASTNode {
    constructor(
        children
    ){
        super()
        this.children = children
    }
    toString(){
        return `A(${this.children})`
    }
}