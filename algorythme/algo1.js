const EMV = require("@indicator/emv")
const MMA = require("@indicator/mma")

const Algorythme = require("./algorythme");

class Algo1 extends Algorythme{

    constructor(symbol, points, interval) {
        super(symbol, points, interval);

        this.emv = new EMV(symbol, points)
        this.mma = new MMA(symbol, points, interval, 20);

        this.indicators = [this.emv, this.mma] // actualize indicators before to start run function
    }

    run(lastPoint) {
        let pivot = this.emv.getData().pivot
        let closeP = lastPoint.close;

        if (closeP > pivot) {
            console.log(`Vendre car ${pivot} < ${closeP}`);
        }
        else {
            console.log(`Acheter car ${pivot} > ${closeP}`);
        }
    }
}

module.exports = Algo1
