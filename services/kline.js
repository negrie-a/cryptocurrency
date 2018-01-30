let Https = require('./https')
const Point = require('@class/point')

class KLine {
    constructor() { }

    static getPoints(symbol, interval, limit = 500) {
        let https = new Https()
        let payload = {
            query : {
                symbol: symbol.toUpperCase(),
                interval,
                limit
            }
        }

        return https.request("GET", "/api/v1/klines", payload)
        .then((points) => {
            let formatPoints = points.map(point => {
                return new Point(Number(point[0]), Number(point[1]), Number(point[2]), Number(point[3]), Number(point[4]));
            });
            return Promise.resolve(formatPoints)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
    }

    static getInformation24h(symbol) {
        let https = new Https()
        let payload = {
            query: {
                symbol
            }
        }
        return https.request("GET", "/api/v1/ticker/24hr", payload)
    }
}

module.exports = KLine
