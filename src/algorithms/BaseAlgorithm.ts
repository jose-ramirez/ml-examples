export default interface BaseAlgorithm {

    parameters: any

    tolerance: number

    steps: number

    cost(): number

    step(data: any[])

    train(data: any[])
}