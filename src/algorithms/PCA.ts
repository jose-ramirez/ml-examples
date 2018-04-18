import utils from '../utils/math'
import math from 'mathjs'
import numeric from 'numeric'
import _ from 'lodash'

export default class pca {

    public data: any[] = []
    public parameters: any = {}
    public tolerance: number = 0.0001
    public steps: number = 10

    constructor(data: any){
      this.data = data.map(o => Object.keys(o).slice(1, 4).map(k => o[k]))
    }

    cost(){
        let total = 0
        return total
    }

    step(){
      let t = this.data.length
      let mu = numeric.transpose(this.data).map(r => math.mean(r))
      let b = this.data.map(r => math.add(r, math.unaryMinus(mu)))
      let m = numeric.dotMMbig(numeric.transpose(b), b)
      let s = math.map(m, r => math.multiply(r, 1 / (t - 1)))
      let {E, lambda} = numeric.eig(s)
      let values = _.zip(lambda.x, numeric.transpose(E.x)).sort((a, b) => b[0] - a[0])
    }

    train(){
        let i = 0
        while(i < this.steps){
            this.step();
        }
    }
}
