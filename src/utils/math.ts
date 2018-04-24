import math from 'mathjs'
import numeric from 'numeric'

export default {

    // centroid for a set of 2d points, assuming the usual (cartesian) structure for them.
    centroid: (points) => {
        let len = points.length
        return {
            x: points.map(p => p.x).reduce((a, b) => a + b) / len,
            y: points.map(p => p.y).reduce((a, b) => a + b) / len,
        }
    },

    distance: (p1, p2) => {
        let dx = p1.x - p2.x
        let dy = p1.y - p2.y
        return dx * dx + dy * dy
    },

    min: (a) => {
        return a.indexOf(Math.min(...a))
    },

    normalize(dataset) {
        let mu = math.mean(dataset, 0)
        let sigma = numeric
            .transpose(dataset)
            .map(r => math.std(r))
            .map(x => 1 / x)
        let m = dataset.map(r => math.chain(r).subtract(mu).dotMultiply(sigma).done())  
        return m
    }
}