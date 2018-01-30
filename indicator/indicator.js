const Point = require('@class/point')

class Indicator {
    constructor(symbol, points, interval) {
        this.symbol = symbol
        this.points = points
        this.interval = interval
        this.data = {}
        this.actualTime = new Date(Date.UTC())
    }

    eventNewPoint(newPoint) { // Run is calling each new point

    }

    setNewPoint(point) {
        this.actualTime = point.time;
        console.log(new Date(this.actualTime))

        if (point.time === this.points[this.points.length - 1]) {
            this.points[this.points.length - 1] = point
        }
        else {
            this.points.push(point)
        }

        return this.eventNewPoint(point);
    }

    getData() {
        return this.data;
    }

    print() {
        console.log("Fonction not defined")
    }
}

module.exports = Indicator
