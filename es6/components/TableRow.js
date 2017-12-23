import Currency from '../model/Currency';

export default class TableRow {
  constructor(data) {
    this.currency = new Currency(data);

    this.rowNode = null
    this.sparkLine = null
    this.initialSparklineRendered = false
  }

  updateData(data) {
    this.currency.updateData(data)
  }

  getNode() {
    if (this.rowNode) {
      this.name.textContent = this.currency.name
      this.bestBid.textContent = this.currency.bestBid
      this.bestAsk.textContent = this.currency.bestAsk
      this.lastChangeBid.textContent = this.currency.lastChangeBid
      this.lastChangeAsk.textContent = this.currency.lastChangeAsk
      return this.rowNode
    }
    const row = document.createElement('tr')
    const name = document.createElement('td')
    const bestBid = document.createElement('td')
    const bestAsk = document.createElement('td')
    const lastChangeBid = document.createElement('td')
    const lastChangeAsk = document.createElement('td')
    const sparkLine = document.createElement('td')
    const sparks = document.createElement('span')
    
    name.textContent = this.currency.name
    name.setAttribute('data-label', 'Name')
    name.setAttribute('class', 'currency-name')
    
    bestBid.textContent = this.currency.bestBid
    bestBid.setAttribute('data-label', 'Current Best Bid')
    
    bestAsk.textContent = this.currency.bestAsk
    bestAsk.setAttribute('data-label', 'Current Best Ask')
    
    lastChangeBid.textContent = this.currency.lastChangeBid
    lastChangeBid.setAttribute('data-label', 'Last Change Best Bid')
    
    lastChangeAsk.textContent = this.currency.lastChangeAsk
    lastChangeAsk.setAttribute('data-label', 'Last Change Besk Ask')
    
    sparkLine.setAttribute('class', 'sparkline');
    sparkLine.appendChild(sparks)

    row.appendChild(name)
    row.appendChild(bestBid)
    row.appendChild(bestAsk)
    row.appendChild(lastChangeBid)
    row.appendChild(lastChangeAsk)
    row.appendChild(sparkLine)

    this.rowNode = row
    this.name = name
    this.bestBid = bestBid
    this.bestAsk = bestAsk
    this.lastChangeBid = lastChangeBid
    this.lastChangeAsk = lastChangeAsk
    this.sparks = sparks
    return this.rowNode
  }

  drawSparkLine() {
    const data = this.currency.getSparkLineData()
    if (!this.sparkLine) {
      this.sparkLine = new Sparkline(this.sparks)
    }
    this.sparkLine.draw(data)
    this.currency.resetHistoricalData();
  }

  drawInitialSparkLine() {
    if (this.initialSparklineRendered) {
      return
    }
    this.initialSparklineRendered = true
    const data = this.currency.getSparkLineData()
    if (!this.sparkLine) {
      this.sparkLine = new Sparkline(this.sparks)
    }
    this.sparkLine.draw(data)
  }

}