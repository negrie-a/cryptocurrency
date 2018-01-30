const Indicator = require("./indicator")
const KLine = require('@services/kline')
const Point = require('@class/point')

class MMA extends Indicator {

    constructor(symbol, points, interval, period) {
        super(symbol, points, interval);

        this.period = period
        this.data = []
        this.mmaCulcul();
    }

    eventNewPoint(newPoint) {
        let lastPointCalculate = this.data[this.data.length - 1]

        if (lastPointCalculate.time !== newPoint.time) {
            this.data.push(this.formule(this.points, this.points.length - 1))
        }
        else {
            this.data[this.data.length - 1] = this.formule(this.points, this.points.length - 1)
        }
    }

    mmaCulcul() {
        this.data = this.points.map((point, index) => {
            return this.formule(this.points, index)
        })
    }

    formule(points, indexPoint) {
        let totalPoint = 0;

        if (indexPoint < this.period - 1)
            return new Point(0, 0, 0, 0, 0)

        let point = new Point(points[indexPoint].time, 0, 0, 0, 0)

        for (let i = 0 ; i < this.period ; i++) {
            let curentIndexPoint = indexPoint - i;

            point.close += this.points[curentIndexPoint].close;
            point.open += this.points[curentIndexPoint].open;
            point.high += this.points[curentIndexPoint].high;
            point.low += this.points[curentIndexPoint].low;
        }

        point.close = point.close / this.period
        point.open = point.open / this.period
        point.high = point.high / this.period
        point.low = point.low / this.period

        return point
    }

    print() {
        this.data.forEach((point) => {
            point.print();
        })
    }
}

module.exports = MMA
