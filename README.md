# TreeJS
[scriptleaf.com](https://scriptleaf.com/)
TreeJS aims to add state, dynamic element creation, and more in a vanilla Javascript familiar syntax.

# Creating elements
Elements are now create with **createElement()**:
```Javascript
  createElement(<tagname>:string, <attributes>:object, <parentElement>:element)
```
| tagName | attributes | parentElement |
|--
| div, dropdown, table, etc | {id: 'whatever', className: 'something', etc} | Any element pointer. |
| **Default:** div | **Default:** {} | **Default:** document.body |

Elements created with TreeJS also obtain new methods themselves, for instance to add child elements you can do
the following:
```Javascript
<element>.createChild({tagName: 'h1', innerText: 'Hello World!'})
```
**or**
```Javascript
<element>.createChildren([
  {tagName: 'h1', innerText: 'Hello World!'},
  {tagName: 'input', value: '', placeholder: 'Click to enter a value!'}
])
```
