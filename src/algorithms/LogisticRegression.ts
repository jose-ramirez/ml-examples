import NumericAlgorithm from "./NumericAlgorithm";
import math from '../utils/math'
import mathjs from 'mathjs'
import numeric from 'numeric'
import _ from 'lodash'
import { nelderMead } from './NelderMead'

export default class logreg implements NumericAlgorithm {

    parameters: any = {}
    
    tolerance: number = 0.0001
    
    steps: number = 10

    constructor() { 
        this.parameters = {
            alpha: 0.005,
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

    _cost(data, theta){
        let {X, y} = data
        let m = X.length
        let _h = X.map(x => this._h(theta, x))
        let _1_h = _h.map(a => 1 - a)
        let _1_y = y.map(a => 1 - a)
        let r1 = mathjs.chain(_h).map(a => mathjs.log(a)).dotMultiply(y).done() 
        let r2 = mathjs.chain(_1_h).map(a => mathjs.log(a)).dotMultiply(_1_y).done()
        let r = mathjs.chain(r1).add(r2).sum().done()
        let c = (-1 / m) * r
        return c
    }

    h(x) {
        return this._h(this.parameters.theta, x)
    }

    _h(theta, x){
        let th_x = mathjs.dot(theta, x)
        return math.sigmoid(th_x)
    }

    step(data) {
        let t = this.parameters.theta
        let a = this.parameters.alpha
        let g = this.gradient(data)
        console.log(`cost: ${this.cost(data)}, gradient: ${g}`)
        let dg = mathjs.chain(a).multiply(g).done()
        t = mathjs.chain(t).subtract(dg).done()
        this.parameters.theta = t
        
    }

    train(data) {
        let f = (th) => this._cost(data, th)
        let sol = nelderMead(f, [0, 0, 0], undefined)
        this.parameters.theta = sol.x
        this.parameters.cost = sol.x.fx
    }

    gradient(data){
        let {X, y} = data
        let m = X.length
        let _h = X.map(x => this.h(x))
        let _h_y = mathjs.chain(_h).subtract(y).done()
        let g = mathjs.chain((1 / m)).multiply(_h_y).multiply(X).done()
        return g
    }
}