import T from './T'

T.Templates = {}

T.ComponentTemplate = class {
  constructor (name, defaultAttributes) {
    T.Templates[name] = this
    this.attributes = defaultAttributes
  }
}

T.createComponent = function (elem, template) {
  T.assignAttributes(elem, T.Templates[template].attributes)
  T.Templates[template].children.forEach(child => {
    T.createElement(child, elem)
  })
}

T.assignParts = function (elem, attributes) {
  elem.$ = {}
  for (let $ in attributes) {
    elem.$[$] = {
      value: attributes[$],
      nodes: new Map(),
      get () { return true },
      set (newValue) {
        this.value = newValue
        for (let [key, value] of this.nodes.entries()) {
          key[value] = this.value
        }
      }
    }
  }
}

T.bindPart = function (elem, key, part) {
  let parsedPart = part.replace('$', '')
  let parent = elem.parentElement
  while ((!parent.$ || !parent.$[parsedPart]) && parent !== document.body) {
    parent = elem.parentElement
  }
  if (parent.$[parsedPart]) {
    elem[key] = parent.$[parsedPart].value
    if (parent.$[parsedPart].nodes.has(elem)) parent.$[parsedPart].nodes.get(elem).push(key)
    else parent.$[parsedPart].nodes.set(elem, [key])
  }
}

T.assignAttributes = function (elem, attributes) {
  if (attributes.$) T.assignParts(elem, attributes.$)
  if (attributes.template && T.Templates[attributes.template]) T.createComponent(elem, attributes.template)
  delete attributes.$
  for (let attr in attributes) {
    if (attr === 'tagName') continue
    if (attributes[attr][0] === '$' && attributes[attr][0].includes(' ') === false) T.bindPart(elem, attr, attributes[attr])
    else elem[attr] = attributes[attr]
  }
}

export default T
