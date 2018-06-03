import BaseAlgorithm from "./BaseAlgorithm";
import math from '../utils/math'
import mathjs from 'mathjs'
import numeric from 'numeric'
import _ from 'lodash'
import { nelderMead } from './NelderMead'

export default class logreg implements BaseAlgorithm {

    cost(data, model){
        let {X, y} = data
        let m = X.length
        let _h = X.map(x => this.h(model, x))
        let _1_h = _h.map(a => 1 - a)
        let _1_y = y.map(a => 1 - a)
        let r1 = mathjs.chain(_h).map(a => mathjs.log(a)).dotMultiply(y).done()
        let r2 = mathjs.chain(_1_h).map(a => mathjs.log(a)).dotMultiply(_1_y).done()
        let r = mathjs.chain(r1).add(r2).sum().done()
        let c = (-1 / m) * r
        return c
    }

    h(model, x) {
        let th_x = mathjs.dot(model, x)
        return math.sigmoid(th_x)
    }

    train(data) {
        let f = (th) => this.cost(data, th)
        return nelderMead(f, [0, 0, 0], undefined)
    }
}