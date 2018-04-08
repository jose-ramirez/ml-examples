import utils from '../utils/math'

export default class logreg {

    public data: any[] = [];
    public parameters: any = {};
    public tolerance: number = 0.0001;
    public steps: number = 10;
    public clusters: number = 2;

    constructor(data: any[], clusters: number, initial_centroids: any[]){
        this.data = data
        this.clusters = clusters
        this.parameters = {
            centroids: initial_centroids,
            clusters: initial_centroids.map(c => []),
            cost: -1
        }
    }

    cost(){
        let total = 0
        for (let i = 0; i < this.clusters; i++) {
            let c = this.parameters.clusters[i];
            let e = this.parameters.centroids[i];
            total += c
                .map(p => utils.distance(p, e))
                .reduce((a, b) => a + b)
        }
        return total
    }

    step(){
        // update clusters
        this.parameters.clusters = this.parameters.centroids.map(c => [])
        let indices = this.data
            .map(p => this.parameters.centroids.map(c => utils.distance(c, p)))
            .map(d => utils.min(d))
        indices.forEach((e, i) => {
            this.parameters.clusters[e].push(this.data[i])
        });

        // update centroids
        this.parameters.centroids = this.parameters.clusters.map(c => utils.centroid(c))

        // update cost
        this.parameters.cost = this.cost()
    }

    train(){
        let i = 0
        while(i < this.steps){
            this.step();
        }
    }
}