import utils from '../utils/math'
import mathjs from 'mathjs'
import numeric from 'numeric'
import _ from 'lodash'

export default class pca {

    public data: any[] = []
    public parameters: any = {}
    public tolerance: number = 0.0001
    public steps: number = 10

    constructor(data: any){
      // now it's the iris dataset
      this.data = utils.normalize(data.map(o => Object.keys(o).slice(0, 4).map(k => o[k])))
    }

    step(){
      // Get the eigen-stuff:
      let t = this.data.length
      let T = numeric.transpose
      let mu = mathjs.mean(this.data, 0)
      let b = this.data.map(r => mathjs.subtract(r, mu))
      let m = numeric.dotMMbig(T(b), b)
      let s = mathjs.multiply(m, 1 / (t - 1))
      let {E, lambda} = numeric.eig(s)
      this.parameters.values = _
        .zip(lambda.x, T(E.x))
        .sort((a: any, b: any) => b[0] - a[0])
 
      // project the dataset through(?) the principal components :)
      this.transform(2)
    }

    transform(num_components){
        let T = numeric.transpose
        let M = T(this.parameters.values.slice(0, num_components).map(v => v[1]))
        this.parameters.projected_data = mathjs.multiply(this.data, M)
    }

    train(){
        let i = 0
        while (i < this.steps){
            this.step()
            i += 1
        }
    }
}
