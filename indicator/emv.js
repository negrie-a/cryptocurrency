const Indicator = require("./indicator")
const KLine = require('@services/kline')

class EMV extends Indicator {

    constructor(symbol, points, interval) {
        super(symbol, points, interval);
        this.data = {
            support : {
                s1: 0,
                s2: 0,
                s3: 0,
                s4: 0
            },
            resistance : {
                r1: 0,
                r2: 0,
                r3: 0,
                r4: 0
            },
            pivot: 0
        }
        this.emvCalcul()
    }

    eventNewPoint(newPoint) {

    }

    emvCalcul() {
        KLine.getPoints(this.symbol, "1d", 2)
            .then((points) => {
                let lastDayInfo = points[0]
                this.data = this.formule(lastDayInfo.high, lastDayInfo.low, lastDayInfo.close);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    formule(high, low, close) {
        let data = {}

        data.pivot = (high + low + close) / 3;

        data.resistance = {
            r1: (2 * data.pivot) - low,
            r2: data.pivot + (high - low),
            r3: data.pivot + ((high - low) * 2),
            r4: data.pivot + ((high - low) * 3)
        }

        data.support = {
            s1: (2 * data.pivot) - high,
            s2: data.pivot - (high - low),
            s3: data.pivot - ((high - low) * 2),
            s4: data.pivot - ((high - low) * 3)
        }

        return data;
    }

    print() {
        console.log(this.data)
    }
}

module.exports = EMV
