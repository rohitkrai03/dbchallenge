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
      this.lastBid.textContent = this.currency.lastBid
      this.lastAsk.textContent = this.currency.lastAsk
      return this.rowNode
    }
    const row = document.createElement('tr')
    const name = document.createElement('td')
    const bestBid = document.createElement('td')
    const bestAsk = document.createElement('td')
    const lastBid = document.createElement('td')
    const lastAsk = document.createElement('td')
    const sparkLine = document.createElement('td')
    const sparks = document.createElement('span')
    
    name.textContent = this.currency.name
    name.setAttribute('data-label', 'Name')
    name.setAttribute('class', 'currency-name')
    
    bestBid.textContent = this.currency.bestBid
    bestBid.setAttribute('data-label', 'Current Best Bid')
    
    bestAsk.textContent = this.currency.bestAsk
    bestAsk.setAttribute('data-label', 'Current Best Ask')
    
    lastBid.textContent = this.currency.lastBid
    lastBid.setAttribute('data-label', 'Last Best Bid')
    
    lastAsk.textContent = this.currency.lastAsk
    lastAsk.setAttribute('data-label', 'Last Besk Ask')
    
    sparkLine.setAttribute('class', 'sparkline');
    sparkLine.appendChild(sparks)

    row.appendChild(name)
    row.appendChild(bestBid)
    row.appendChild(bestAsk)
    row.appendChild(lastBid)
    row.appendChild(lastAsk)
    row.appendChild(sparkLine)

    this.rowNode = row
    this.name = name
    this.bestBid = bestBid
    this.bestAsk = bestAsk
    this.lastBid = lastBid
    this.lastAsk = lastAsk
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