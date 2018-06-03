export default interface BaseAlgorithm {

    cost(data: any[], model: any): number

    train(data: any[])
}