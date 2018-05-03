import NumericAlgorithm from "./NumericAlgorithm";

export default class logreg implements NumericAlgorithm {

    parameters: any = {}
    
    tolerance: number = 0.0001
    
    steps: number = 10

    constructor() {
    }

    cost(){
        return -1
    }

    step(data) {
        throw new Error("Method not implemented.");
    }

    train(data) {
        throw new Error("Method not implemented.");
    }

    gradient(){
        // depends on the parameters
        return -1
    }
}