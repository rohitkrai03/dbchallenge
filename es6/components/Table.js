import TableRow from './TableRow'


export default class Table {

  constructor(interval = null) {
    this.rows = []
    this.presentCurrencies = {}

    this.handlers = []
    this.sparkLineHandlers = []

    this.updateRows = this.updateRows.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.fire = this.fire.bind(this)
    this.fireSparkLine = this.fireSparkLine.bind(this)

    if (interval !== null) {
      this.sparkLineIntervalID = setInterval(this.fireSparkLine, interval)
    } else {
      this.sparkLineIntervalID = null
    }
  }

  updateRows(data) {
    if (this.presentCurrencies.hasOwnProperty(data.name)) {
      this.presentCurrencies[data.name].updateData(data)
    } else {
      this.presentCurrencies[data.name] = new TableRow(data)
      this.rows.push(this.presentCurrencies[data.name])
      console.log(this.rows);
    }
    this.rows.sort((row1, row2) => {
      return row1.currency.lastChangeBid - row2.currency.lastChangeBid;
    });
    this.fire()
  }

  subscribe(listener) {
    this.handlers.push(listener)
  }

  unsubscribe(fn) {
    this.handlers = this.handlers.filter(item => item !== fn)
  }

  subscribeToSparkLineEvent(handler) {
    this.sparkLineHandlers.push(handler);
  }

  unsubscribeFromSparkLineEvent(fn) {
    this.sparkLineHandlers = this.sparkLineHandlers.filter(item => item !== fn)
  }

  fireSparkLine() {
    this.sparkLineHandlers.forEach(fn => {
      fn(this.rows)
    })
  }

  fire() {
    this.handlers.forEach(fn => {
      fn(this.rows)
    })
  }
}
