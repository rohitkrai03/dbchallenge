import expect from 'expect';

import data from '../testdata';

import Currency from '../../es6/model/Currency';

describe('Currency', () => {

  const currency = new Currency(data)

  it('should init data', () => {
    expect(currency.name).toEqual(data.name)
    expect(currency.historicalData.length).toEqual(1)
  })

  it('updateData should update history', () => {
    currency.updateData(data)
    expect(currency.historicalData.length).toEqual(2)
  })

  it('should return sparkline data', () => {
    const sparklineData = currency.getSparkLineData()
    expect(sparklineData.length).toEqual(2)
  })

  it('resetHistoricalData should clear history', () => {
    currency.resetHistoricalData()
    expect(currency.historicalData.length).toEqual(0)
  })

})
