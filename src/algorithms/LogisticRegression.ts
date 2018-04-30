import BaseAlgorithm from "./BaseAlgorithm";

export default class logreg implements BaseAlgorithm {
    data: any[] = []

    parameters: any = {}
    
    tolerance: number = 0.0001
    
    steps: number = 10

    constructor(data) {
        this.data = data
    }

    cost(): number {
        return -1
    }

    step() {
        throw new Error("Method not implemented.");
    }

    train() {
        throw new Error("Method not implemented.");
    }

    gradient(){
        // depends on the parameters
    }
}