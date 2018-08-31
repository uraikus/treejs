/* global Element */

import elements from './elements'

var tree = {
  id: {},
  class: {},
  node: {}
}

var State = {}

function createElement () {
  let tagName = 'div'
  let attributes = {}
  let parentElement = document.body
  for (let x = 0; x < arguments.length; x++) {
    if (arguments[x] instanceof Element) parentElement = arguments[x]
    else if (typeof arguments[x] === 'string') tagName = arguments[x]
    else if (typeof arguments[x] === 'object') attributes = arguments[x]
  }
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
  elem.createChildren = createElements
  elem.createTextNode = createNode
  elem.bindState = bindState
  if (attributes.state || attributes.stateHTML) elem.bindState(attributes.state || attributes.stateHTML)
  if (elements[tagName]) elements[tagName](elem)
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
  if (id) tree.node[id] = node
  node.bindState = bindState
  return node
}

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
    get: function () {
      return this.value
    },
    set: function (newValue) {
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
  return State[stateKey]
}

export {createElement, createElements, createNode, tree, setState, getState}
