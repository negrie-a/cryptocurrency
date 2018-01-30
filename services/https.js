const https = require('https');
const fs = require('fs');
const extend = require('extend');
const url = require('url');
const crypto = require('crypto');
const querystring = require('querystring');
const config = require('./../config')

class Https {
    constructor() {
        this.hostname = "api.binance.com";
        this.port = 443;
        this.apiKey = config.apiKey
        this.secretKey = config.secretKey
        this.headerVerb = {
            "GET": { "Content-Type": "application/json" },
            "POST": { "Content-Type": "application/x-www-form-urlencoded" },
            "PUT": { "Content-Type": "application/x-www-form-urlencoded" },
            "DELETE": { "Content-Type": "application/x-www-form-urlencoded" }
        }

        this.security = {
            "NONE": 0,
            "API-KEY": 1,
            "SIGNED": 2
        }
    }

    createParams(verb, path, params, query, security) {
        //headers
        let headers = this.headerVerb[verb]
        let headersAuth = {}
        if (this.security[security] > 0)
            headersAuth = { 'X-MBX-APIKEY': this.apiKey }
        extend(headers, headersAuth, headers)

        //signature
        if (this.security[security] > 1) {
            let queryString = querystring.stringify(query)
            let paramsString = querystring.stringify(params)
            let signature = crypto.createHmac('sha256', this.secretKey)
                .update(`${queryString}${paramsString}`)
                .digest('hex');
            query.signature = signature
        }

        //addQueryToPath
        path += `?${querystring.stringify(query)}`

        return {
            hostname: this.hostname,
            port: this.port,
            path: path,
            method: verb,
            headers: headers
        }
    }

    request(verb, path, { params = {}, query = {} } = { params: {}, query: {} }, security = "NONE") {
        let requestInfo = this.createParams(verb, path, params, query, security);

        // console.log(requestInfo)
        return new Promise((resolve, reject) => {
            const request = https.request(requestInfo,
                (response) => {
                    var value = null;
                    response
                        .on('data', (d) => {
                            if (value === null)
                                value = ""
                            try {
                                value += d.toString()
                            }
                            catch (e) {
                                value = d.toString()
                            }
                        })
                        .on('end', () => { // TODO RETURN STATUS APIGEE
                            if (!value) {
                                return reject(`Not value receive with status code ${response.statusCode}`)
                            }
                            value = JSON.parse(value)

                            resolve(value)
                        })
                        .on('error', (err) => { reject({"error": err}) });
                })
                .on('error', (err) => { reject({ "error": err }) });
            if (params)
                request.write(JSON.stringify(params))
            request.end();
        })
    }
}

module.exports = Https
