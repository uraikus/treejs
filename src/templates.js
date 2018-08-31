import {createElement} from './tree'

var Templates = {}

class ComponentTemplate {
  constructor (name, defaultAttributes) {
    Templates[name] = this
    this.attributes = defaultAttributes
  }
}

function createComponent (elem, template) {
  assignAttributes(elem, Templates[template].attributes)
  Templates[template].children.forEach(child => {
    createElement(child, elem)
  })
}

function assignParts (elem, attributes) {
  elem.$ = {}
  for (let $ in attributes) {
    elem.$[$] = {
      value: attributes[$],
      nodes: new Map(),
      get: function () { return true },
      set: function (newValue) {
        this.value = newValue
        for (let [key, value] of this.nodes.entries()) {
          key[value] = this.value
        }
      }
    }
  }
}

function bindPart (elem, key, part) {
  let parsedPart = part.replace('$', '')
  let parent = elem.parentElement
  while ((!parent.$ || !parent.$[parsedPart]) && parent !== document.body) {
    parent = elem.parentElement
  }
  if (parent.$[parsedPart]) {
    elem[key] = parent.$[parsedPart].value
    if (parent.$[parsedPart].has(elem)) parent.$[parsedPart].get(elem).push(key)
    else parent.$[parsedPart].set(elem, [key])
  }
}

function assignAttributes (elem, attributes) {
  if (attributes.$) assignParts(elem, attributes.$)
  if (attributes.template && Templates[attributes.template]) createComponent(elem, attributes.template)
  delete attributes.$
  for (let attr in attributes) {
    if (attributes[attr][0] === '$' && attributes[attr][0].includes(' ') === false) bindPart(elem, attr, attributes[attr])
    else elem[attr] = attributes[attr]
  }
}

export {assignAttributes, ComponentTemplate}
