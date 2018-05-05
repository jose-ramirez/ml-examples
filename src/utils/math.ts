import math from 'mathjs'
import numeric from 'numeric'

export default {

    // centroid for a set of 2d points, assuming
    // the usual (cartesian) structure for them.
    centroid: (points) => {
        let len = points.length
        return {
            x: points
                .map(p => p.x)
                .reduce((a, b) => a + b) / len,
            y: points
                .map(p => p.y)
                .reduce((a, b) => a + b) / len,
        }
    },

    // euclidian distance function.
    distance: (p1, p2) => {
        let dx = p1.x - p2.x
        let dy = p1.y - p2.y
        return dx * dx + dy * dy
    },

    // minimum element of an array. Goes through the
    // array twice, which is horribly inefficient.
    min: (a) => {
        return a.indexOf(Math.min(...a))
    },

    // normalizes each column of the dataset to have
    // mean 0 and standard deviation 1.
    normalize: (dataset) => {
        // the columns' means
        let mu = math.mean(dataset, 0)

        // the columns' sigmas
        let sigma = numeric
            .transpose(dataset)
            .map(r => math.std(r))
            .map(x => 1 / x)

        // the normalization (X => ((X - mu) / sigma))
        return dataset
            .map(r => math.chain(r)
                .subtract(mu)
                .dotMultiply(sigma)
                .done())  
    },

    sigmoid: (x) => {
        return 1 / (1 + math.exp(-x))
    }
}