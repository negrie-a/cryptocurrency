require('module-alias/register')

const AlgorythmeLauncher = require('@services/algorythme_launcher')

const symbol = "appcbtc"
const interval = "1m"

const algo = new AlgorythmeLauncher(symbol, interval)

algo.activateAlgorythme("algo1")
algo.start()
