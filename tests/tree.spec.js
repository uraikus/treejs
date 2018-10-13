/* global jest, describe, test, expect, beforeEach */

import T from '../src/tree.js'

T.bindState = jest.fn()

describe('createElement:', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Create a <div />:', () => {
    let div = T.createElement()
    expect(div.tagName).toEqual('DIV')
  })
  test('Create a <b />:', () => {
    let b = T.createElement('b')
    expect(b.tagName).toEqual('B')
  })
  test('Index "id"\'d element:', () => {
    let div = T.createElement({ id: 'test1', tagName: 'span' })
    expect(T.id['test1'].tagName).toEqual('SPAN')
    expect(div.id).toEqual('test1')
  })
  test('Bind state:', () => {
    let div = T.createElement({ state: 'test' })
    expect(div.bindState.mock.calls.length).toEqual(1)
  })
  test('Bind stateHTML:', () => {
    let div = T.createElement({ stateHTML: 'test' })
    expect(div.bindState.mock.calls.length).toEqual(1)
  })
  test('Run afterCreate function:', () => {
    let div = T.createElement({ afterCreate: function () { this.innerHTML = 'worked!' } })
    expect(div.innerHTML).toEqual('worked!')
  })
  test('Create <div><div /></div>:', () => {
    let div = T.createElement()
    let div2 = T.createElement(div)
    expect(div.firstChild).toEqual(div2)
  })
  test('Append <div /> to element by binding:', () => {
    let div = T.createElement()
    let div2 = div.createChild()
    expect(div.firstChild).toEqual(div2)
  })
  test('Create and assign classes:', () => {
    expect(T.class['test']).toBeUndefined()
    T.createElement({ className: 'test' })
    expect(T.class['test'].length).toEqual(1)
    T.createElement({ className: 'test' })
    expect(T.class['test'].length).toEqual(2)
  })
  test('All three arguments:', () => {
    let div = T.createElement()
    let b = T.createElement('b', { id: 'test' }, div)
    expect(b.tagName).toEqual('B')
    expect(b.id).toEqual('test')
    expect(b.parentElement).toEqual(div)
  })
})

describe('createElements():', () => {
  test('Return false:', () => {
    expect(T.createElements()).toEqual(false)
  })
  test('Return array of 3 elements:', () => {
    let elems = T.createElements([
      {}, {}, {}
    ])
    expect(elems.length).toEqual(3)
  })
  test('Create children on element:', () => {
    let div = T.createElement()
    T.createElements.bind(div)([
      {}, {}, {}
    ])
    expect(div.children.length).toEqual(3)
  })
  test('Create child on assigned element:', () => {
    let div = T.createElement()
    T.createElements([
      {}, {}, {}
    ], div)
    expect(div.children.length).toEqual(3)
  })
  test('Children default created on body:', () => {
    document.body.innerHTML = ''
    T.createElements([
      {}, {}, {}
    ])
    expect(document.body.children.length).toEqual(3)
  })
})
