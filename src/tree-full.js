var Tree = {
  id: {},
  class: {},
  node: {}
}

function createElement () {
  let tagName = 'div'
  let attributes = {}
  let parentElement = (this !== window && this) || document.body
  for (let x = 0; x < arguments.length; x++) {
    if (arguments[x] instanceof Element) parentElement = arguments[x]
    else if (typeof arguments[x] === 'string') tagName = arguments[x]
    else if (typeof arguments[x] === 'object') attributes = arguments[x]
  }
  if (attributes.tagName) {
    tagName = attributes.tagName
  }

  let elem = document.createElement(tagName)
  if (attributes.id) {
    Tree.id[attributes.id] = elem
  }
  if (attributes.className) {
    if (Array.isArray(Tree.class[attributes.className])) Tree.class[attributes.className].push(elem)
    else Tree.class[attributes.className] = [elem]
  }
  parentElement.appendChild(elem)
  elem.createChild = createElement
  elem.createChildren = createElements
  elem.createTextNode = createNode
  elem.bindState = bindState
  if (attributes.state || attributes.stateHTML) elem.bindState(attributes.state || attributes.stateHTML)
  assignAttributes(elem, attributes)
  if (typeof elem.afterCreate === 'function') elem.afterCreate()
  return elem
}

function createElements (children, parentElement) {
  parentElement = parentElement || this || document.body
  if (Array.isArray(children) === false) return false
  let childElements = []
  for (let x = 0; x < children.length; x++) {
    childElements.push(createElement(children[x], parentElement))
  }
  return childElements
}

function createNode (text, parentElement, id) {
  if (!id && typeof parentElement === 'string') id = parentElement
  else if (parentElement instanceof Element === false) parentElement = this || document.body
  let node = document.createTextNode(text || '')
  parentElement.appendChild(node)
  if (id) Tree.node[id] = node
  node.bindState = bindState
  return node
}
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

function bindPart (elem, key, part) {
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

function assignAttributes (elem, attributes) {
  if (attributes.$) assignParts(elem, attributes.$)
  if (attributes.template && Templates[attributes.template]) createComponent(elem, attributes.template)
  delete attributes.$
  for (let attr in attributes) {
    if (attr === 'tagName') continue
    if (attributes[attr][0] === '$' && attributes[attr][0].includes(' ') === false) bindPart(elem, attr, attributes[attr])
    else elem[attr] = attributes[attr]
  }
}

var State = {}

function bindState (stateKey) {
  if (State[stateKey] === undefined) {
    newState(stateKey)
    State[stateKey].nodes.push(this)
  } else if (Array.isArray(State[stateKey].nodes) === false) {
    return false
  } else {
    State[stateKey].nodes.push(this)
    this.textContent = State[stateKey].value
    return true
  }
}

function newState (stateKey, stateValue) {
  State[stateKey] = {
    nodes: [],
    value: stateValue || '',
    get () {
      return this.value
    },
    set (newValue) {
      this.value = newValue
      this.nodes.forEach(node => {
        if (node.nodeType === 3) node.textContent = newValue
        else if (node.tagName === 'input') node.value = newValue
        else if (node.stateHTML) node.innerHTML = newValue
        else node.innerText = newValue
      })
    }
  }
  return true
}

function setState (stateKey, stateValue) {
  if (State[stateKey] === undefined) newState(stateKey, stateValue)
  else State[stateKey] = stateValue
}

function getState (stateKey) {
  return State[stateKey].value
}
