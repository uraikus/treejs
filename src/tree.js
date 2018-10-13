/* global Element */

import { assignAttributes } from './templates'
import { bindState } from './state'

var T = {
  id: {},
  class: {},
  node: {}
}

T.createElement = function () {
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
    T.id[attributes.id] = elem
  }
  if (attributes.className) {
    if (Array.isArray(T.class[attributes.className])) T.class[attributes.className].push(elem)
    else T.class[attributes.className] = [elem]
  }
  parentElement.appendChild(elem)
  elem.createChild = T.createElement
  elem.createChildren = T.createElements
  elem.bindState = bindState
  if (attributes.state || attributes.stateHTML) elem.bindState(attributes.state || attributes.stateHTML)
  assignAttributes(elem, attributes)
  if (typeof elem.afterCreate === 'function') elem.afterCreate()
  return elem
}

T.createElements = function (children, parentElement) {
  parentElement = parentElement || this || document.body
  if (Array.isArray(children) === false) return false
  let childElements = []
  for (let x = 0; x < children.length; x++) {
    childElements.push(T.createElement(children[x], parentElement))
  }
  return childElements
}

export default T
