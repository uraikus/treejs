import T from '../src/tree.js'

describe('createElement:', () => {
  test('Should create a <div />:', () => {
    let div = T.createElement()
    expect(div.tagName).toEqual('DIV')
  })
  test('Should create a <b />', () => {
    let b = T.createElement('b')
    expect(b.tagName).toEqual('B')
  })
})
