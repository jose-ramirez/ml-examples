import * as Utils from '../utils/stats'

export default class kmeans {

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
            clusters: initial_centroids.map(c => [])
        }
    }

    cost(params){
        // distortion function goes here
    }

    step(){
        // update clusters
        this.parameters.clusters = this.parameters.centroids.map(c => [])
        let indices = this.data
            .map(p => this.parameters.centroids.map(c => Utils.default.distance(c, p)))
            .map(d => Utils.default.min(d))
        indices.forEach((e, i) => {
            this.parameters.clusters[e].push(this.data[i])
        });

        //update centroids
        this.parameters.centroids = this.parameters.clusters.map(c => Utils.default.centroid(c))

        //print the cost function, to see how it goes down on each step:
        //console.log(this.cost(this.parameters));
    }

    train(){
        let i = 0
        while(i < this.steps){
            this.step();
        }
    }
}