import mathjs from 'mathjs'
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
        let mu = mathjs.mean(dataset, 0)

        // the columns' sigmas
        let sigma = numeric
            .transpose(dataset)
            .map(r => mathjs.std(r))
            .map(x => 1 / x)

        // the normalization (X => ((X - mu) / sigma))
        return dataset
            .map(r => mathjs.chain(r)
                .subtract(mu)
                .dotMultiply(sigma)
                .done())
    },

    sigmoid: (x) => {
        return 1 / (1 + mathjs.exp(-x))
    },

    zeros: (x) => {
        var r = new Array(x);
        for (var i = 0; i < x; ++i) { 
            r[i] = 0;
        }
        return r;
    },

    dot: (a, b) => {
        var ret = 0;
        for (var i = 0; i < a.length; ++i) {
            ret += a[i] * b[i];
        }
        return ret;
    },

    scale(ret, value, c) {
        for (var i = 0; i < value.length; ++i) {
            ret[i] = value[i] * c;
        }
    },

    weightedSum(ret, w1, v1, w2, v2) {
        for (var j = 0; j < ret.length; ++j) {
            ret[j] = w1 * v1[j] + w2 * v2[j];
        }
    }

}