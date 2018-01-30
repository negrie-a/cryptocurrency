// variable protected
// symbol
// points
// interval
// actualTime (UTC)

class Algorythme {
    constructor(symbol, points, interval) {
        this.symbol = symbol
        this.points = points
        this.interval = interval
        this.actualTime = 0;
        this.indicators = []; // set all the indicators inside !!
    }

    run(lastPoint) { // Run is calling each new point

    }

    setNewPoint(point) {
        this.actualTime = point.time;

        if (point.time === this.points[this.points.length - 1]) {
            this.points[this.points.length - 1] = point
        }
        else {
            this.points.push(point)
        }

        this.actualizeIndicator(point);
        return this.run(point);
    }

    actualizeIndicator(newPoint) {
        // send to all indicators the new point
        this.indicators.forEach(indicator => {
            indicator.setNewPoint(newPoint)
        });
    }
}

module.exports = Algorythme
