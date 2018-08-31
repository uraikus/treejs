# TreeJS
[scriptleaf.com](https://scriptleaf.com/)

TreeJS aims to add state, dynamic element creation, and more in a vanilla Javascript familiar syntax.

## Creating elements
Elements are now create with **createElement(tagname, attributes, parentElement)**: // *returns newly created element*
```Javascript
  // <h1 id="1">Hello World!</h1> // Appends to body due to no parent Element being defined
  let h1 = createElement('h1', {innerText: 'Hello World!', id: 'sample1'})
  // <h1 id="1">Hello World!<h2><b>Hello World Again!</b></h2></h1>
  createElement({tagName: 'h2', innerHTML: '<b>Hello World Again!</b>'}, h1)
  // Default tag is a div, auto appended to body if parent undefined/false/null/0/''
  let div = createElement()
```
Multiple elements can be created at the same time by using **createElements(attributes :object, parentElement :element)**: // *returns array of newly created elements*
```Javascript
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
Elements created with TreeJS also obtain new methods themselves, for instance to add child elements you can do
the following:
```Javascript
<element>.createChild({tagName: 'h1', innerText: 'Hello World!'}) // <h1>Hello World!</h1>
<element>.createChild('input', {placeholder: 'click to enter value...'}) // <input placeholder="click to enter value...">
<element>.createChild({innerHTML: '<i>Hello World!</i>'}) // <div><i>Hello World!</i></div>
```
**or**
```Javascript
<element>.createChildren([
  {tagName: 'h1', innerText: 'Hello World!'},
  {tagName: 'input', value: '', placeholder: 'Click to enter a value!'}
])
```

## State Nodes
State nodes are textNodes with extended methods that can be bound to a state. To create a state node, use **createNode(text, parentElement, id)**:
```Javascript
  let div = createElement()
  createNode('Some random text!', div, 'exampleNode')
```
to get the above text node you can use the **tree** object:
```Javascript
  tree.nodes.exampleNode.textContent = "Something new!"
  let exampleNodeId = 'exampleNode'
  tree.nodes[exampleNodeId].textContent = 'Something new again!'
```
You can also bind a state node to a state key: // *State will be explained further later...*
```Javascript
  let node = createNode() // Node will by default be appended to the body if no parentElement
  node.bindState('stateKey')
```
Now anytime the state 'stateKey' is updated, this node will also change. Regular elements can also be bound to a state:
```Javascript
  createElement({state: 'stateKey'}) // Only innerText will apply the state
  createElement({stateHTML: 'stateKey'}) // Will apply the state value as html
  createElement().bindState('stateKey') // Only innerText will apply the state
```

## State
To create or modify a state, you can use **setState(stateKey, stateValue)**:
```Javascript
  setState('stateKey', 'Hello World!')
  let node = createNode().bindState('stateKey') // Will equal "Hello World!"
  setState('stateKey', 'Hello World 2!') // Node textContent will dynamically change to "Hello World 2!"
```
To get the state, simply use **getState(stateKey)**:
```Javascript
  setState('stateKey', 'Hello World!')
  getState('stateKey') // returns "Hello World!"
```

## Tree
The tree object contains all elements created by id, className, or state nodes.
```Javascript
  let elem1 = createElement({id: 'testElement1'})
  tree.id['testElement1'] // Returns elem1
  tree.id.testElement1 // Returns elem1
  let elem2 = createElement({className: 'test'})
  let elem3 = createElement({className: 'test'})
  tree.class['test'] // Returns [elem2, elem3]
  tree.class.test // Returns [elem2, elem3]
  let node = createNode('', false, 'sampleID')
  tree.node['sampleID'] // returns node
  tree.node.sampleID // returns node
```
