const startPrices = {
  'gbp/usd': 1.4587,
  'gbp/eur': 1.288,
  'gbp/aud': 1.9107,
  'usd/eur': 0.883,
  'gbp/jpy': 158.29,
  'usd/jpy': 108.505,
  'eur/jpy': 122.91,
  'gbp/chf': 1.4126,
  'eur/aud': 1.4834,
  'eur/chf': 1.0969,
  'eur/cad': 1.4214,
  'gbp/cad': 1.8303
}

const currencies = Object.keys(startPrices)
const publicData = {}
const internal = {}
for (let ccy in startPrices) {
  const spread = Math.random() * 0.05
  const mid = startPrices[ccy]
  internal[ccy] = mid
  publicData[ccy] = {
    name: ccy,
    bestBid: mid - mid * (spread / 2),
    bestAsk: mid + mid * (spread / 2),
    openBid: mid - mid * (spread / 2),
    openAsk: mid + mid * (spread / 2),
    lastChangeAsk: 0,
    lastChangeBid: 0
  }
}

export const getRandomData = () => {
  const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]
  const mid = internal[randomCurrency]
  const spread = Math.random() * 0.05
  const diff = (Math.random() * 0.08 - 0.04) * mid
  const newMid = (mid + diff)
  const bid = newMid - newMid * (spread / 2)
  const ask = newMid + newMid * (spread / 2)
  const data = publicData[randomCurrency]
  data.lastChangeBid = bid - data.bestBid
  data.lastChangeAsk = ask - data.bestAsk
  data.bestBid = bid
  data.bestAsk = ask
  return data
}


export default {
  "name": "usd/jpy",
  "bestBid": 106.7297012204255,
  "bestAsk": 107.25199883791178,
  "openBid": 107.22827132623534,
  "openAsk": 109.78172867376465,
  "lastChangeAsk": -4.862314256927661,
  "lastChangeBid": -2.8769211401569663
}
