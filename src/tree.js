import elements from './elements'

var tree = {
  id: {},
  class: {},
  node: {}
}

function createElement (tagName, attributes, parentElement) {
  if (typeof tagName === 'object') {
    parentElement = attributes
    attributes = tagName
    if (attributes.tagName) {
      tagName = attributes.tagName
      delete attributes.tagName
    } else tagName = 'div'
  } else tagName = tagName || 'div'
  parentElement = parentElement || this || document.body
  let elem = document.createElement(tagName)
  if (typeof attributes === 'object' && attributes) Object.assign(elem, attributes)
  if (attributes.id) {
    tree.id[attributes.id] = elem
  }
  if (attributes.className) {
    if (Array.isArray(tree.class[attributes.className])) tree.class[attributes.className].push(elem)
    else tree.class[attributes.className] = [elem]
  }
  parentElement.appendChild(elem)
  elem.createChild = createElement
  elem.createChildren = createChildren
  elem.createTextNode = createNode
  if (elements[tagName]) elements[tagName](elem)
  return elem
}

function createChildren (children) {
  if (Array.isArray(children) === false) return false
  let childElements = []
  for (let x = 0; x < children.length; x++) {
    childElements.push(this.createChild(children[x]))
  }
  return childElements
}

function createNode (text, parentElement, id) {
  parentElement = parentElement || this || document.body
  let node = document.createTextNode(text || '')
  parentElement.appendChild(node)
  if (id) tree.node[id] = node
  node.bind = bindState
  return node
}

function bindState (stateKey) {
  if (tree.state[stateKey] === undefined) {
    tree.state[stateKey] = {
      nodes: [this],
      value: '',
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.value = newValue
        this.nodes.forEach(node => {
          node.textContent = newValue
        })
      }
    }
    return true
  } else if (Array.isArray(tree.state[stateKey].nodes) === false) {
    return false
  } else {
    tree.state[stateKey].nodes.push(this)
    return true
  }
}

export {createElement, createNode, tree}
