parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"ZLZB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ComponentTemplate=exports.assignAttributes=void 0;var t=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw a}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),e=require("./tree");function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n={},o=function t(e,o){r(this,t),n[e]=this,this.attributes=o};function a(t,r){s(t,n[r].attributes),n[r].children.forEach(function(r){(0,e.createElement)(r,t)})}function i(e,r){for(var n in e.$={},r)e.$[n]={value:r[n],nodes:new Map,get:function(){return!0},set:function(e){this.value=e;var r=!0,n=!1,o=void 0;try{for(var a,i=this.nodes.entries()[Symbol.iterator]();!(r=(a=i.next()).done);r=!0){var u=a.value,s=t(u,2);s[0][s[1]]=this.value}}catch(t){n=!0,o=t}finally{try{!r&&i.return&&i.return()}finally{if(n)throw o}}}}}function u(t,e,r){for(var n=r.replace("$",""),o=t.parentElement;!(o.$&&o.$[n]||o===document.body);)o=t.parentElement;o.$[n]&&(t[e]=o.$[n].value,o.$[n].nodes.has(t)?o.$[n].nodes.get(t).push(e):o.$[n].nodes.set(t,[e]))}function s(t,e){for(var r in e.$&&i(t,e.$),e.template&&n[e.template]&&a(t,e.template),delete e.$,e)"tagName"!==r&&("$"===e[r][0]&&!1===e[r][0].includes(" ")?u(t,r,e[r]):t[r]=e[r])}exports.assignAttributes=s,exports.ComponentTemplate=o;
},{"./tree":"veD7"}],"dm40":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t={};function e(e){if(void 0!==t[e])return!1!==Array.isArray(t[e].nodes)&&(t[e].nodes.push(this),this.textContent=t[e].value,!0);n(e),t[e].nodes.push(this)}function n(e,n){return t[e]={nodes:[],value:n||"",get:function(){return this.value},set:function(t){this.value=t,this.nodes.forEach(function(e){3===e.nodeType?e.textContent=t:"input"===e.tagName?e.value=t:void 0!==e.innerHTML?e.innerHTML=t:e.innerText=t})}},!0}function i(e,i){void 0===t[e]?n(e,i):t[e].set(i)}function o(e){return t[e].value}exports.setState=i,exports.getState=o,exports.bindState=e;
},{}],"veD7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ComponentTemplate=exports.getState=exports.setState=exports.Tree=exports.createNode=exports.createElements=exports.createElement=void 0;var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=require("./templates"),r=require("./state"),o={id:{},class:{},node:{}};function a(){for(var i="div",c={},p=this!==window&&this||document.body,d=0;d<arguments.length;d++)arguments[d]instanceof Element?p=arguments[d]:"string"==typeof arguments[d]?i=arguments[d]:"object"===e(arguments[d])&&(c=arguments[d]);c.tagName&&(i=c.tagName);var l=document.createElement(i);return c.id&&(o.id[c.id]=l),c.className&&(Array.isArray(o.class[c.className])?o.class[c.className].push(l):o.class[c.className]=[l]),p.appendChild(l),l.createChild=a,l.createChildren=s,l.createTextNode=n,l.bindState=r.bindState,(c.state||c.stateHTML)&&l.bindState(c.state||c.stateHTML),(0,t.assignAttributes)(l,c),"function"==typeof l.afterCreate&&l.afterCreate(),l}function s(e,t){if(t=t||this||document.body,!1===Array.isArray(e))return!1;for(var r=[],o=0;o<e.length;o++)r.push(a(e[o],t));return r}function n(e,t,a){a||"string"!=typeof t?t instanceof Element==!1&&(t=this||document.body):a=t;var s=document.createTextNode(e||"");return t.appendChild(s),a&&(o.node[a]=s),s.bindState=r.bindState,s}exports.createElement=a,exports.createElements=s,exports.createNode=n,exports.Tree=o,exports.setState=r.setState,exports.getState=r.getState,exports.ComponentTemplate=t.ComponentTemplate;
},{"./templates":"ZLZB","./state":"dm40"}]},{},["veD7"], null)
//# sourceMappingURL=/tree.map