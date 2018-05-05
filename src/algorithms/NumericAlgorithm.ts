import BaseAlgorithm from './BaseAlgorithm'
export default interface NumericAlgorithm extends BaseAlgorithm {
    gradient(data: any[]): any
}