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

    normalize(data){
        let x = data.map(p => p.x)
        let y = data.map(p => p.y)

        let xmax = Math.max(...x)
        let xmin = Math.min(...x)
        let ymax = Math.max(...y)
        let ymin = Math.min(...y)

        let xn = x.map(_x => (_x - xmin) / (xmax - xmin))
        let yn = y.map(_y => (_y - ymin) / (ymax - ymin))

        return xn.map((e, i) => ({x: e, y: yn[i]}))
    }
}