/* global Element */

import ComponentTemplate, {assignAttributes} from './templates'
import {setState, getState, bindState} from './state'

var Tree = {
  id: {},
  class: {},
  node: {}
}

function createElement () {
  let tagName = 'div'
  let attributes = {}
  let parentElement = this || document.body
  for (let x = 0; x < arguments.length; x++) {
    if (arguments[x] instanceof Element) parentElement = arguments[x]
    else if (typeof arguments[x] === 'string') tagName = arguments[x]
    else if (typeof arguments[x] === 'object') attributes = arguments[x]
  }
  if (attributes.tagName) {
    tagName = attributes.tagName
    delete attributes.tagName
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

export {createElement, createElements, createNode, Tree, setState, getState, ComponentTemplate}
