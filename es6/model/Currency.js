
export default class Currency {
  constructor(data) {
    this.historicalData = [];

    this.updateData = this.updateData.bind(this)
    this.getSparkLineData = this.getSparkLineData.bind(this)
    this.resetHistoricalData = this.resetHistoricalData.bind(this)

    this.updateData(data)
  }

  updateData(data) {
    this.name = data.name;
    this.bestBid = data.bestBid;
    this.bestAsk = data.bestAsk;
    this.lastChangeBid = data.lastChangeBid;
    this.lastChangeAsk = data.lastChangeAsk;
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