# TreeJS
[scriptleaf.com](https://scriptleaf.com/)

TreeJS aims to add state, dynamic element creation, and more in a vanilla JavaScript familiar syntax and semantics.

## Getting Started
To install with NPM:
```CLI
  npm i @scriptleaf/treejs
```

To use in your browser:
```JS
  import * as Tree, from '@scriptleaf/treejs'
  // or
  import Tree, {createElement, etc} from '@scriptleaf/treejs'
```

## Creating elements
#### createElement(tagName:string, attributes:object, parentElement:htmlNode)
Arguments will be detected by their type. Allowing you to use them in any order.

**Returns**: Created element's reference.

**tagName**: defaults to 'div'. The tagName of the element. Can also be included in attributes.

**attributes**: defaults to {}. Each key/value will be applied to the new element.

**parentElement**: defaults to document.body. The element to which this will be appended to.
```JS
  // <h1 id="1">Hello World!</h1> // Appends to body due to no parent Element being defined
  let h1 = createElement('h1', {innerText: 'Hello World!', id: 'sample1'})
  // <h1 id="1">Hello World!<h2><b>Hello World Again!</b></h2></h1>
  createElement({tagName: 'h2', innerHTML: '<b>Hello World Again!</b>'}, h1)
  // Default tag is a div, auto appended to body if parent undefined
  let div = createElement()
```
#### createElements (elementObjects:array, parentElement:element)
**Returns:** Array of created elements.

Shorthand for createElement(). **Hint:** *Use 'tagName' in object to give it a particular tagName.*
```JS
  createElements([
    {tagName: 'h1', innerText: 'Hello World!'},
    {tagName: 'input', value: '', placeholder: 'click to enter value...'}
  ])
  let div = createElement() // Auto appends to body since no parent defined
  createElements([
    {id: 'd1'},{id: 'd2'}
  ], div) // appends two divs to div = <div><div id="d1"></div><div id="d2"></div></div>
```
## Element methods
#### createChild (tagName:string, attributes:object)
Elements created with TreeJS also obtain new methods themselves, for instance to add child elements you can do
the following:
```JS
<element>.createChild({tagName: 'h1', innerText: 'Hello World!'}) // <h1>Hello World!</h1>
<element>.createChild('input', {placeholder: 'click to enter value...'}) // <input placeholder="click to enter value...">
<element>.createChild({innerHTML: '<i>Hello World!</i>'}) // <div><i>Hello World!</i></div>
```
#### createChildren (elements:array)
Allows you to create several children.
```JS
<element>.createChildren([
  {tagName: 'h1', innerText: 'Hello World!'},
  {tagName: 'input', value: '', placeholder: 'Click to enter a value!'}
])
```

## State Nodes
#### createNode (text:string, parentElement:htmlNode, id:string)
State nodes are textNodes with extended methods that can be bound to a state.
```JS
  let div = createElement()
  createNode('Some random text!', div, 'exampleNode')
```
to get the above text node you can use the **tree** object:
```JS
  tree.nodes.exampleNode.textContent = "Something new!"
  let exampleNodeId = 'exampleNode'
  tree.nodes[exampleNodeId].textContent = 'Something new again!'
```
You can also bind a state node to a state key: // *State will be explained further later...*
```JS
  let node = createNode() // Node will by default be appended to the body if no parentElement
  node.bindState('stateKey')
```
Now anytime the state 'stateKey' is updated, this node will also change. Regular elements can also be bound to a state:
```JS
  createElement({state: 'stateKey'}) // Only innerText will apply the state
  createElement({stateHTML: 'stateKey'}) // Will apply the state value as html
  createElement().bindState('stateKey') // Only innerText will apply the state
```

## State
#### setState (stateKey:string, stateValue:string)
Modify the global state.
```JS
  setState('stateKey', 'Hello World!')
  let node = createNode().bindState('stateKey') // Will equal "Hello World!"
  setState('stateKey', 'Hello World 2!') // Node textContent will dynamically change to "Hello World 2!"
```
#### getState (stateKey:string)
Get a key's value from the global state.
```JS
  setState('stateKey', 'Hello World!')
  getState('stateKey') // returns "Hello World!"
```

## Tree
The tree object contains all elements created by id, className, or state nodes.
```JS
  import Tree, {createElement} from '@scriptleaf/treejs'
  let elem1 = createElement({id: 'testElement1'})
  Tree.id['testElement1'] // Returns elem1
  Tree.id.testElement1 // Returns elem1
  let elem2 = createElement({className: 'test'})
  let elem3 = createElement({className: 'test'})
  Tree.class['test'] // Returns [elem2, elem3]
  Tree.class.test // Returns [elem2, elem3]
  let node = createNode('', false, 'sampleID')
  Tree.node['sampleID'] // returns node
  Tree.node.sampleID // returns node
```

## Component Templates
#### ComponentTemplate (name:string, defaultAttributes:object)
Component Templates allow you to create reusable html components.
```JS
  import {ComponentTemplate, createElement} from '@scriptleaf/treejs'
  new ComponentTemplate('sample', {tagName: 'p'})
```
##### Use Template
To create a component with the new template, use:
```JS
  createElement({template: 'sample', id: 'sample1'})
  createElements([{template: 'sample', id: 'sample2'}, {template: 'sample', id: 'sample3'}])
  // or as an element method
  <element>.createChild({template: 'sample', id: 'sample1'})
  <element>.createChildren([{template: 'sample', id: 'sample2'}, {template: 'sample', id: 'sample3'}])
```
##### children
To add children to the template, you can do the following:
```JS
  new ComponentTemplate('sample', {tagName: 'p'}).children = [
    {tagName: 'h1', innerText: 'Hello World!'},
    {innerText: 'Div element content'}
  ]
```

##### dynamic children values
You can allow dynamic values in the templates by attaching variables to the $ object on element creation. This value when changed will also change the children's values as well.
```JS
  new ComponentTemplate('sample', {tagName: 'p'}).children = [
    {tagName: 'h1', innerText: '$header'},
    {innerText: '$content'}
  ]
  let div = createElement({template: 'sample', $:{header: 'Hello World!', content: 'This is a div with text!'}})
  // Methods to change child h1 components innerText
  div.$.header = 'Goodbye world!'
  div.$['header'] = 'Hello again world!'
```
