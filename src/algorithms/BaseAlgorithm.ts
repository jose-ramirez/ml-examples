export default interface BaseAlgorithm {

    parameters: any

    tolerance: number

    steps: number

    cost(data: any[]): number

    step(data: any[])

    train(data: any[])
}