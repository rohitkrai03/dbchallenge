import expect from 'expect'

import data from '../testdata';

import TableRow from '../../es6/components/TableRow';

describe('TableRow', () => {
  const row = new TableRow(data)
  it('should have null node initially', () => {
    expect(row.rowNode).toEqual(null)
    expect(row.sparkLine).toEqual(null)
  })

  it('should update history on updateData', () => {
    row.updateData(data)
    expect(row.currency.historicalData.length).toEqual(2)
  })

  it('should return tr node using getNode', () => {
    const node = row.getNode()
    expect(node.tagName).toEqual('TR')
    expect(node.children.length).toEqual(6)
    for(var i=0; i<node.children.length; i++) {
      expect(node.children[i].tagName).toEqual('TD')
    }
    expect(node.children[0].textContent).toEqual(data.name)
  })

  it('should update name in dom when data changes', () => {
    const newData = Object.assign({}, data, {
      name: 'inrusd'
    });
    row.updateData(newData)
    const node = row.getNode()
    expect(node.children[0].textContent).toEqual(newData.name)
  })
})
