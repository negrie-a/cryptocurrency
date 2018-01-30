const WebSocket = require('ws');
const KLine = require('@services/kline')
const Point = require('@class/point')

class AlgorythmeLauncher {
    constructor(symbol, interval) {
        this.symbol = symbol;
        this.interval = interval;
        this.ws = null;
        this.points = [];
        this.algorythmes = [];
    }

    async start() {
        this.initWebSocket(this.symbol, this.interval)
        this.points = await this.getAllPreviousPoint(this.symbol, this.interval);
        this.initializeAlgorythme(this.symbol, this.points, this.interval)

        this.ws.on('message', (newTrade) => {
            newTrade = JSON.parse(newTrade)

            let newPoint = new Point(Number(newTrade.k.t), Number(newTrade.k.o), Number(newTrade.k.h), Number(newTrade.k.l), Number(newTrade.k.c))
            newPoint.isFinalBar = newTrade.k.x;

            // send to all algorythmes the new point
            this.algorythmes.forEach(algorythme => {
                algorythme.setNewPoint(newPoint)
            });
        });
    }

    initWebSocket(symbol, interval) {
        this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`, {
            perMessageDeflate: false
        });
    }

    getAllPreviousPoint(symbol, interval) {
        return KLine.getPoints(symbol, interval)
    }

    activateAlgorythme(type) {
        this.algorythmes.push(type)
    }

    initializeAlgorythme(symbol, points, interval) {
        this.algorythmes = this.algorythmes.map((algorythme) => {
            return new (require(`@algorythme/${algorythme}`))(symbol, points, interval)
        })
    }
}

module.exports = AlgorythmeLauncher
