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

    step(){
      // Get the eigen-stuff:
      let t = this.data.length
      let T = numeric.transpose
      let mu = math.mean(this.data, 0)
      let b = this.data.map(r => math.subtract(r, mu))
      let m = numeric.dotMMbig(T(b), b)
      let s = math.multiply(m, 1 / (t - 1))
      let {E, lambda} = numeric.eig(s)
      this.parameters.values = _
        .zip(lambda.x, T(E.x))
        .sort((a, b) => b[0] - a[0])
      this.transform(2)
    }

    transform(num_components){
        let T = numeric.transpose
        let M = T(this.parameters.values.slice(0, num_components).map(v => v[1]))
        this.parameters.projected_data = math.multiply(this.data, M)
    }

    train(){
        let i = 0
        while (i < this.steps){
            this.step()
            i += 1
        }
    }
}
