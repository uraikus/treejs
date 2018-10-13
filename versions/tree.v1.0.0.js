/* global Element */
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

T.State = {}
T.bindState = function (stateKey) {
if (T.State[stateKey] === undefined) {
T.newState(stateKey)
T.State[stateKey].nodes.push(this)
} else if (Array.isArray(T.State[stateKey].nodes) === false) {
return false
} else {
T.State[stateKey].nodes.push(this)
this.textContent = T.State[stateKey].value
return true
}
}
T.newState = function (stateKey, stateValue) {
T.State[stateKey] = {
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
else if (node.innerHTML !== undefined) node.innerHTML = newValue
else node.innerText = newValue
})
}
}
return true
}
T.setState = function (stateKey, stateValue) {
if (T.State[stateKey] === undefined) T.newState(stateKey, stateValue)
else T.State[stateKey].set(stateValue)
}
T.getState = function (stateKey) {
return T.State[stateKey].value
}
