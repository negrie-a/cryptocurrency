let Https = require('./https')

class Account {
    constructor() {}

    static getInformation() {
        let https = new Https()
        let payload = {
            query: {
                timestamp: Date.now()
            }
        }
        return https.request("GET", "/api/v3/account", {}, "SIGNED")
    }
}

module.exports = Account
