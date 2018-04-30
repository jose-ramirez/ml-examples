export default interface BaseAlgorithm {
    data: any

    parameters: any

    tolerance: number

    steps: number

    cost(): number

    step()

    train()
}