var Templates = {}

export default class ComponentTemplate {
  constructor (name, defaultAttributes) {
    Templates[name] = this
    this.attributes = defaultAttributes
  }
}

export {Templates}

/*
  new ComponentTemplate('sample', {tagName: 'p'}).children = [
    {tagName: 'h1', innerText: '$header'},
    {innerText: '$content'}
  ]
  createElement({template: 'sample', $:{header: 'Hello World!', content: 'This is a div with text!'}})

*/
