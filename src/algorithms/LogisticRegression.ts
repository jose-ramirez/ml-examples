import NumericAlgorithm from "./NumericAlgorithm";
import math from '../utils/math'
import mathjs from 'mathjs'
import numeric from 'numeric'

export default class logreg implements NumericAlgorithm {

    parameters: any = {}
    
    tolerance: number = 0.0001
    
    steps: number = 10

    constructor() { 
        this.parameters = {
            alpha: 0.001,
            theta: [0, 0, 0]
        }
    }

    cost(data){
        let {X, y} = data
        let m = X.length
        let _h = X.map(x => this.h(x))
        let _1_h = _h.map(a => 1 - a)
        let _1_y = y.map(a => 1 - a)
        let r1 = mathjs.chain(_h).map(a => mathjs.log(a)).dotMultiply(y).done() 
        let r2 = mathjs.chain(_1_h).map(a => mathjs.log(a)).dotMultiply(_1_y).done()
        let r = mathjs.chain(r1).add(r2).sum().done()
        let c = (-1 / m) * r
        return c
    }

    h(x) {
        return math.sigmoid(mathjs.dot(this.parameters.theta, x))
    }
    step(data) {
        console.log(this.cost(data))
    }

    train(data) {
        throw new Error("Method not implemented.");
    }

    gradient(){
        // depends on the parameters
        return -1
    }
}