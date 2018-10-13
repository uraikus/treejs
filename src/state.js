import T from 'tree.js'

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

export default T
