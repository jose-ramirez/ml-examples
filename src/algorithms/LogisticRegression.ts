import utils from '../utils/math'

export default class logreg {

    public data: any[] = []
    public parameters: any = {}
    public tolerance: number = 0.0001
    public steps: number = 10

    constructor(data: any){
      this.data = data
    }

    cost(){
        let total = 0
        return total
    }

    step(){
      // define the train step here
    }

    train(){
        let i = 0
        while(i < this.steps){
            this.step();
        }
    }
}
