
export default class Currency {
  constructor() {
    this.historicalData = [];
  }

  updateData(data) {
    const name = data.name;
    this.name = name.slice(0, name.length/2) + '/' + name.slice(name.length/2);
    this.bestBid = data.bestBid;
    this.bestAsk = data.bestAsk;
    this.lastBid = data.lastChangeBid;
    this.lastAsk = data.lastChangeAsk;
    this.historicalData.push([data.bestBid, data.bestAsk]);
  }

  getSparkLineData() {
    const data = this.historicalData.map(item => {
      return (item[0] + item[1]) / 2;
    });
    return data;
  }

  resetHistoricalData() {
    this.historicalData = [];
  }
}