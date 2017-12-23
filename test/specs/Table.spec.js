import expect from 'expect'

import data, { getRandomData } from '../testdata';

import Table from '../../es6/components/Table';


describe('Table', () => {

  const table = new Table;
  const tableWithInterval = new Table(30)

  it('should init with empty rows and handlers', () => {
    expect(table.rows.length).toEqual(0)
    expect(table.handlers.length).toEqual(0)
    expect(table.sparkLineHandlers.length).toEqual(0)
    expect(Object.keys(table.presentCurrencies).length).toEqual(0)
    expect(table.sparkLineIntervalID).toEqual(null)
  })

  it('should have an interval ID if sparkline interval is non null', () => {
    expect(tableWithInterval.sparkLineIntervalID).toNotEqual(null)
  })

  it('should call the subscribed listener on data change', () => {
    let initVal = -1
    const func = () => {
      initVal = 1
    }
    table.subscribe(func)
    expect(initVal).toEqual(-1)
    table.updateRows(getRandomData())
    expect(initVal).toEqual(1)
    table.unsubscribe(func)
    expect(table.handlers.length).toEqual(0)
  })

  it('should return sorted list of TableRows data on every update to subscribe functions', () => {
    expect(table.rows.length).toEqual(1)
    let numberOfCalls = 0
    const checkSorting = (rows) => {
      numberOfCalls++
      if (rows.length <= 1) {
        return
      }
      for(var i=1; i<rows.length; i++) {
        expect(rows[i].currency.lastChangeBid).toBeGreaterThanOrEqualTo(rows[i-1].currency.lastChangeBid)
      }
      expect(rows.length).toEqual(Object.keys(table.presentCurrencies).length)
    };
    table.subscribe(checkSorting)
    for(var i=0; i<10; i++) {
      table.updateRows(getRandomData())
    }
    expect(numberOfCalls).toEqual(10)
    table.unsubscribe(checkSorting)
  })

})
