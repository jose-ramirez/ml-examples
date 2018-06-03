import utils from '../utils/math'
import BaseAlgorithm from './BaseAlgorithm'

export default class kmeans implements BaseAlgorithm {

    public parameters: any = {};
    public tolerance: number = 0.0001;
    public steps: number = 10;
    public num_clusters: number = 2;

    constructor(num_clusters: number, initial_centroids: any[]) {
        this.num_clusters = num_clusters
        this.parameters = {
            centroids: initial_centroids,
            clusters: initial_centroids.map(c => []),
            cost: -1
        }
    }

    cost() {
        let total = 0
        for (let i = 0; i < this.num_clusters; i++) {
            let c = this.parameters.clusters[i];
            let e = this.parameters.centroids[i];
            total += c
                .map(p => utils.distance(p, e))
                .reduce((a, b) => a + b)
        }
        return total
    }

    step(data) {
        // update clusters
        this.parameters.clusters = this.parameters.centroids.map(c => [])
        let indices = data
            .map(p => this.parameters.centroids.map(c => utils.distance(c, p)))
            .map(d => utils.min(d))
        indices.forEach((e, i) => {
            this.parameters.clusters[e].push(data[i])
        });

        // update centroids
        this.parameters.centroids = this.parameters.clusters.map(c => utils.centroid(c))

        // update cost
        this.parameters.cost = this.cost()
    }

    train(data) {
        let i = 0
        while (i < this.steps) {
            this.step(data);
        }
    }
}