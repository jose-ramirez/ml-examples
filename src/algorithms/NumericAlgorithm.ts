import BaseAlgorithm from './BaseAlgorithm'

export default interface GradientBasedAlgorithm extends BaseAlgorithm {
    gradient(data: any[]): any
}